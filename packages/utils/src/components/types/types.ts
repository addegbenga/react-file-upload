export interface IUpload {
  /**
   * specify the max size for a file in kb (200kb by default)
   */
  maxfileSize?: number;
  /**
   * specify the number of file you want to accept This is dependent on if multiple is set to true.
   */
  maxFile?: number;
  fileType?: FileType[];
  /**
   * specify if you want a single file or array of files is always false by default
   */
  multiple?: boolean;
  handleError: (props: Record<string, unknown>) => void;
  /**
   * This returns a fileList incase you want to manage the file on your own
   * @param
   * @returns FileList
   */
  handleChange?: (props: FileList) => void;
}

export type FileType =
  | "image/jpg"
  | "image/png"
  | "image/jpeg"
  | "video/mp4"
  | "video/webm"
  | "video/ogg"
  | "video/avi"
  | "video/mov"
  | "audio/mp3"
  | "audio/ogg"
  | "audio/wav"
  | "audio/aac"
  | "audio/flac"
  | "application/pdf"
  | "application/msword";

/**
 * Type for the blob object state.
 */
export interface IBlobReturnTypeObj {
  blob: string;
  name: string;
  fileSize: string;
}
/**
 * Type for the blob array state.
 */

export interface IBlobReturnType {
  [key: string]: IBlobReturnTypeObj[];
}
