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
  event: ChangeEvent<HTMLInputElement>;
  handleError: (props: any) => void;
}
export const handleFileTypeValidations = ({
  fileType,
  event,
  handleError,
}: FileValidationType) => {
  const evt = event?.target?.files ? event?.target.files[0]?.type : "";
  if (!fileType.includes(evt)) {
    handleError({
      error: {
        message: "Invalid file Type",
        fileTypes: fileType,
      },
    });
    throw new Error("Error: invalid file type");
  }
};

interface MaxFileValidationType {
  maxFile: number;
  fileState: any;
  name: string;
  handleError: (props: any) => void;
}

export const handleMaxFileLimitError = (props: MaxFileValidationType) => {
  if (props.maxFile && props.fileState[props.name].length > props.maxFile) {
    props.handleError({
      error: {
        message: "Exceeded File Limit",
        limit: props.maxFile,
      },
    });
    throw new Error("Error: Exceeded File Limit");
  }
};
