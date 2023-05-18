import { ChangeEvent } from "react";
import { FileType, IBlobReturnType } from "./types/types";

export function convertBytesToKB(bytes: number) {
  const kb = bytes / 1024;
  return kb;
}

interface IParseType {
  blob: any;
  name: string;
  data: any;
}
export function handleParseData(props: IParseType): IBlobReturnType {
  const newData = {
    ...JSON.parse(JSON.stringify(props.blob)),
    [props.name]: props.data,
  };

  return newData;
}

interface FileValidationType {
  fileType: FileType;
  event: ChangeEvent<HTMLInputElement> | any;
  handleError: (props: any) => void;
}
export const handleFileTypeValidations = ({
  fileType,
  event,
  handleError,
}: FileValidationType) => {
  try {
    const evt = event?.target?.files[0].type;

    if (fileType && fileType?.length !== 0 && !fileType.includes(evt)) {
      handleError({
        error: {
          message: "Invalid file Type",
          fileTypes: fileType,
        },
      });
      throw Error("Invalid file Type");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface MaxFileValidationType {
  maxFile: number;
  fileState: any;
  name: string;
  handleError: (props: any) => void;
}

export const handleMaxFileLimitError = (props: MaxFileValidationType) => {
  try {
    if (props.maxFile && props.fileState[props.name].length > props.maxFile) {
      props.handleError({
        error: {
          message: "Exceeded File Limit",
          limit: props.maxFile,
        },
      });
      throw Error("Exceeded File Limit");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
