# React file upload

A simple-to-use React hook that enables HTML5-compliant drag-and-drop file uploads with preview functionality. This library streamlines the file upload process for your users, allowing them to see a preview of their files before uploading. You can configure the hook to accept specific file types, set size limits, and specify the number of files allowed to be uploaded at once. With this library, you can provide a better user experience and simplify the file upload process for your users."

## Installation

Install it from npm and include it in your React build process (using Webpack, Browserify, etc).

```bash
yarn add @dexpackage/react-upload
```

or

```bash
npm i @dexpackage/react-upload
```

## Usage

```tsx
import import { useUploadFile } from "@dexpackage/react-upload";

export default function App() {
  const { handleChange, fileData } = useUploadFile({
    handleError(props) {
      console.log(props);
    },
    multiple: true,
    //false by defaults
  });

  return (
    <div>
      <div>
        <label>Upload File 1</label>
        <input type="file" name="file" onChange={handleChange} />
        <div style={{ display: "flex", gap: 10 }}>
          {fileData?.file?.map((item, idx) => (
            <img src={item} key={idx} width={200} height={200} />
          ))}
        </div>
      </div>
      <div>
        <label>Upload File 2</label>
        <input type="file" name="file2" onChange={handleChange} />
        <div style={{ display: "flex", gap: 10 }}>
          {fileData?.file2?.map((item, idx) => (
            <img src={item} key={idx} width={200} height={200} />
          ))}
        </div>
      </div>
    </div>
  );
}

```

## Accepted Props

|Types    | Description                                    |
|----------- | ---------------------------------------------- |
| maxfileSize | is an optional property that allows you to set the maximum size of a file in kilobytes. The default value is 200kb |
| maxFile     | is an optional property that allows you to set the maximum number of files to be uploaded NB: This 1 by default and can be more than one if `multiple` is set to true. |
| fileType    | is an optional property that accepts an array of strings representing file types to be accepted for upload.|
| multiple    | is an optional boolean property that specifies whether a single or multiple files can be uploaded. The default value is false.|
| handleError | is a required method that accepts a props object and handles any errors that may occur during the file upload process. |
| handleChange | is an optional method that returns a FileList and allows you to manage the files on your own. |

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License

[MIT](https://choosealicense.com/licenses/mit/)
