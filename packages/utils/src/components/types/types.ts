export interface IUpload {
  /**
   * specify the max size for a file in kb (200kb by default)
   */
  maxfileSize?: number;
  /**
   * specify the number of file you want to accept.
   */
  maxFile?: number;
  fileType?: string[];
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
