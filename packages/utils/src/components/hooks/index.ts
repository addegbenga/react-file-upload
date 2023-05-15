import { ChangeEvent, useState } from "react";
import { IUpload, IBlobReturnType } from "../types/types";
import {
  convertBytesToKB,
  handleFileTypeValidations,
  handleParseData,
} from "../utils";

export const useUploadFile = ({
  multiple = false,
  maxfileSize = 200,
  ...props
}: IUpload) => {
  const [blob, setBlob] = useState<Record<string, any>>({});
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const filelist = event.target.files as FileList;
    const uploadedFileSizeInKb = Number(convertBytesToKB(filelist[0].size));
    // const isImage = filelist[0].type.split("/")[0] === "image" ? true : false;

    //Check of the form input has a name attribute
    if (!event.target.name) {
      throw new Error("Error: add a name prop to the input ");
    }

    //override all errors and let users handle it themselves.
    if (props.handleChange) {
      props.handleChange(filelist);
    }

    //Check if the user specify a file type and run file type validation
    if (props.fileType && props.fileType?.length !== 0) {
      handleFileTypeValidations({
        fileType: props.fileType as any,
        event: event,
      });
    }

    //Check for file size validation
    if (uploadedFileSizeInKb > maxfileSize) {
      props.handleError({
        fileSizeError: {
          message: "File too large",
          uploadedFileSizeInKb: uploadedFileSizeInKb,
          expectedFileSizeInKb: maxfileSize,
        },
      });

      throw new Error("Error: File too large ");
    }

    reader.readAsDataURL(filelist[0]);

    reader.onload = () => {
      if (multiple) {
        const propertyValue = blob?.[event.target.name];
        if (propertyValue) {
          const data = [
            ...blob[event.target.name],
            {
              blob: reader.result,
              name: filelist[0].name,
              fileSize: Number(convertBytesToKB(filelist[0].size)),
            },
          ];
          const newData = handleParseData({
            blob: blob,
            event: event,
            data: data,
          });
          setBlob(newData);
        } else {
          const newData = handleParseData({
            blob: blob,
            event: event,
            data: [
              {
                blob: reader.result,
                name: filelist[0].name,
                fileSize: Number(convertBytesToKB(filelist[0].size)),
              },
            ],
          });

          setBlob(newData);
        }
      } else {
        const newData = handleParseData({
          blob: blob,
          event: event,
          data: [
            {
              blob: reader.result,
              name: filelist[0].name,
              fileSize: Number(convertBytesToKB(filelist[0].size)),
            },
          ],
        });
        setBlob(newData);
      }
    };
    return event;
  };
  //assert a record type here

  const fileData = blob as IBlobReturnType;

  return { handleChange, fileData };
};

export default { useUploadFile };
