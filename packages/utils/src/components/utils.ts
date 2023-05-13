import { ChangeEvent } from "react";

export function convertBytesToKB(bytes: number) {
  const kb = bytes / 1024;
  return kb;
}

interface IParseType {
  blob: any;
  event: ChangeEvent<HTMLInputElement>;
  data: (string | ArrayBuffer | null)[];
}
export function handleParseData(props: IParseType) {
  const newData = {
    ...JSON.parse(JSON.stringify(props.blob)),
    [props.event.target.name]: props.data,
  };

  return newData;
}
