import { ChangeEvent, useState } from "react";
import { IUpload, IBlobReturnType } from "../types/types";
import {
  convertBytesToKB,
  handleFileTypeValidations,
  handleGenericError,
  handleMaxFileLimitError,
  handleParseData,
} from "../utils";

export const useUploadFile = ({
  multiple = false,
  maxfileSize = 200,
  ...props
}: IUpload) => {
  const [files, setFiles] = useState<Record<string, any>>({});
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const filelist = event.target.files as FileList;
    const uploadedFileSizeInKb = Number(convertBytesToKB(filelist[0].size));

    //Check of the form input has a name attribute
    if (!event.target.name) {
      return handleGenericError({
        message: "Add a name attribute to the input ",
        handleError: props.handleError,
      });
    }

    //Check if the user specify a file type and run file type validation
    if (props.fileType && !props.fileType.includes(filelist[0].type as any))
      return handleFileTypeValidations({
        fileType: props.fileType as any,
        event: event,
        handleError: props.handleError,
      });

    //override all errors and let users handle it themselves.
    if (props.handleChange) {
      props.handleChange(filelist);
    }

    //Check for file size validation
    if (uploadedFileSizeInKb > maxfileSize) {
      return handleGenericError({
        message: "File too large",
        handleError: props.handleError,
      });
    }

    reader.readAsDataURL(filelist[0]);

    reader.onload = () => {
      if (multiple) {
        const propertyValue = files?.[event.target.name];

        if (propertyValue) {
          const data = [
            ...files[event.target.name],
            {
              blob: reader.result,
              name: filelist[0].name,
              fileSize: Number(convertBytesToKB(filelist[0].size)),
            },
          ];

          const newData = handleParseData({
            blob: files,
            name: event.target.name,
            data: data,
          });

          if (
            props.maxFile &&
            newData[event.target.name].length > props.maxFile
          ) {
            return handleMaxFileLimitError({
              fileState: newData,
              handleError: props.handleError,
              maxFile: props.maxFile as any,
              name: event.target.name,
            });
          }
          setFiles(newData);
          event.target.value = "";
        } else {
          const newData = handleParseData({
            blob: files,
            name: event.target.name,
            data: [
              {
                blob: reader.result,
                name: filelist[0].name,
                fileSize: Number(convertBytesToKB(filelist[0].size)),
              },
            ],
          });

          if (
            props.maxFile &&
            newData[event.target.name].length > props.maxFile
          ) {
            return handleMaxFileLimitError({
              fileState: newData,
              handleError: props.handleError,
              maxFile: props.maxFile as any,
              name: event.target.name,
            });
          }
          setFiles(newData);
          event.target.value = "";
        }
      } else {
        const newData = handleParseData({
          blob: files,
          name: event.target.name,
          data: [
            {
              blob: reader.result,
              name: filelist[0].name,
              fileSize: Number(convertBytesToKB(filelist[0].size)),
            },
          ],
        });
        if (
          props.maxFile &&
          newData[event.target.name].length > props.maxFile
        ) {
          return handleMaxFileLimitError({
            fileState: newData,
            handleError: props.handleError,
            maxFile: props.maxFile as any,
            name: event.target.name,
          });
        }
        setFiles(newData);
        event.target.value = "";
      }
    };

    return event;
  };

  const handleOnDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dataType = event.currentTarget.getAttribute("data-type");
    const filelist = event.dataTransfer.files;
    const fileArray = Array.from(filelist);

    //Check if the drop zone have a data-type attribute
    if (!dataType) {
      return props.handleError({
        error: {
          message: "Error: add a dataType prop to the dropzone element ",
        },
      });
    }

    //use this to have access to fileList and do anything with it.
    if (props.handleChange) {
      props.handleChange(filelist);
    }

    const promises = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (maxfileSize < Number(convertBytesToKB(file.size))) {
          props.handleError({
            error: {
              message: "File too large",
              uploadedFileSizeInKb: Number(convertBytesToKB(file.size)),
              expectedFileSizeInKb: maxfileSize,
            },
          });
          reject(new Error("File too large"));
          return; // Skip processing for this file and continue to the next iteration
        }
        //Check if the user specify a file type and run file type validation
        if (props.fileType && !props.fileType.includes(file.type as any)) {
          handleFileTypeValidations({
            fileType: props.fileType as any,
            event: event,
            handleError: props.handleError,
          });
          reject(new Error("Invalid file type"));
          return; // Skip processing for this file and continue to the next iteration
        }
        reader.onload = () => {
          resolve({
            blob: reader.result,
            name: file.name,
            fileSize: file.size,
          });
        };
        reader.onerror = () => {
          props.handleError({
            message: "Error occurred while reading the file.",
          });
          reject(new Error("Error occurred while reading the file."));
        };
        reader.readAsDataURL(file);
      });
    });

    try {
      const result = await Promise.allSettled(promises);
      // Handle Resolved and Rejected Promise separately
      const resolvedFiles = result
        .filter((result) => result.status === "fulfilled")
        .map((result: Record<string, any>) => result.value);
      // const rejectedFiles = result
      //   .filter((result) => result.status === "rejected")
      //   .map((result: Record<string, any>) => result.reason);

      if (multiple) {
        const propertyValue = files?.[dataType];
        if (propertyValue) {
          const data = [...files[dataType], ...resolvedFiles];
          const newData = handleParseData({
            blob: files,
            name: dataType,
            data: data,
          });
          if (props.maxFile && newData[dataType].length > props.maxFile) {
            return handleMaxFileLimitError({
              fileState: newData,
              handleError: props.handleError,
              maxFile: props.maxFile as any,
              name: dataType,
            });
          }

          setFiles(newData);
        } else {
          const newData = handleParseData({
            blob: files,
            name: dataType,
            data: resolvedFiles,
          });
          if (props.maxFile && newData[dataType].length > props.maxFile) {
            return handleMaxFileLimitError({
              fileState: newData,
              handleError: props.handleError,
              maxFile: props.maxFile as any,
              name: dataType,
            });
          }
          setFiles(newData);
        }
      } else {
        const newData = handleParseData({
          blob: files,
          name: dataType,
          data: [resolvedFiles[0]],
        });
        if (props.maxFile && newData[dataType].length > props.maxFile) {
          return handleMaxFileLimitError({
            fileState: newData,
            handleError: props.handleError,
            maxFile: props.maxFile as any,
            name: dataType,
          });
        }
        setFiles(newData);
      }
    } catch (error) {
      console.error();
    }
    return event;
  };

  //assert the proper type here
  const fileData = files as IBlobReturnType;

  return { handleChange, fileData, handleOnDrop, setFiles };
};

export default { useUploadFile };
