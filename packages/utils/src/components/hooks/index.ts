import { ChangeEvent, useState } from "react";
import { IUpload } from "../types/types";
import { convertBytesToKB, handleParseData } from "../utils";

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

    if (!event.target.name) {
      throw new Error("Error: add a name prop to the input ");
    }

    if (uploadedFileSizeInKb > maxfileSize) {
      props.handleError({
        fileSizeError: {
          message: "File too largess",
          uploadedFileSizeInKb: uploadedFileSizeInKb,
          expectedFileSizeInKb: maxfileSize,
        },
      });
      throw new Error("Error: File too large ");
    }
    props.handleChange && props.handleChange(filelist);
    reader.readAsDataURL(filelist[0]);

    reader.onload = () => {
      if (multiple) {
        const propertyValue = blob?.[event.target.name];
        if (propertyValue) {
          const data = [...blob[event.target.name], reader.result];
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
            data: [reader.result],
          });
          setBlob(newData);
        }
      } else {
        const newData = handleParseData({
          blob: blob,
          event: event,
          data: [reader.result],
        });
        setBlob(newData);
      }
    };
    return event;
  };
  //assert a record type here
  const fileData = blob as Record<string, string[]>;

  return { handleChange, fileData };
};

export default { useUploadFile };
