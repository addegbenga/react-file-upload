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
  handleError,
}: FileValidationType) => {
  try {
    handleError({
      error: {
        message: "Invalid file Type",
        fileTypes: fileType,
      },
    });
    throw new Error("Invalid file Type");
  } catch (error) {
    console.error(error);
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
    props.handleError({
      error: {
        message: "Exceeded File Limit",
        limit: props.maxFile,
      },
    });

    throw Error("Exceeded File Limit");
  } catch (error) {
    console.log(error);
  }
};

interface IGenericErrorType {
  message: string;
  handleError: (props: any) => void;
}

export const handleGenericError = (props: IGenericErrorType) => {
  try {
    props.handleError({
      error: {
        message: props.message,
      },
    });
    throw Error(props.message);
  } catch (error) {
    console.log(error);
  }
};
