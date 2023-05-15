import { ChangeEvent } from "react";
import { FileType, IBlobReturnType } from "./types/types";

export function convertBytesToKB(bytes: number) {
  const kb = bytes / 1024;
  return kb;
}

interface IParseType {
  blob: any;
  event: ChangeEvent<HTMLInputElement>;
  data: any;
}
export function handleParseData(props: IParseType): IBlobReturnType {
  const newData = {
    ...JSON.parse(JSON.stringify(props.blob)),
    [props.event.target.name]: props.data,
  };

  return newData;
}

interface FileValidationType {
  fileType: FileType;
  event: ChangeEvent<HTMLInputElement>;
}
export const handleFileTypeValidations = ({
  fileType,
  event,
}: FileValidationType) => {
  const evt = event?.target?.files ? event?.target.files[0]?.type : "";
  if (!fileType.includes(evt)) {
    throw new Error("Error: invalid file type");
  }
};
