# React file upload

A simple to use React hook that enables HTML5-compliant drag-and-drop file uploads with preview functionality. This library streamlines the file upload process for your users, allowing them to see a preview of their files before uploading. You can configure the hook to accept specific file types, set size limits, and specify the number of files allowed to be uploaded at once. With this library, you can provide a better user experience and simplify the file upload process for your users."

## Installation

Install it from npm and include it in your React build process (using Webpack, Browserify, etc).

```bash
yarn add dex-react-file-upload
```

or

```bash
npm i dex-react-file-upload
```

## Usage

```tsx
import { useUploadFile } from "dex-react-file-upload";

export default function App() {
  const { handleChange, fileData, handleOnDrop, setFiles } = useUploadFile({
    handleError(props: any) {
      console.log(props);
      alert(props.error.message);
    },
    multiple: true,
    fileType: ["image/jpg", "image/jpeg"],
    maxFile: 4,
    maxfileSize: 1500, //in kb,
  });

  return (
    <div>
      <div style={{ marginBottom: "5rem", textAlign: "center" }}>
        <h1>React File Upload Basic demo </h1>
        <p>You can make a pull request for improvement.</p>
      </div>
      <div>
        <div>
          <label>Upload File 1</label>
          <input type="file" name="file" onChange={handleChange} />
          <div style={{ display: "flex", gap: 10 }}>
            {fileData?.file?.map((item, idx) => (
              <div style={{ display: "grid", gap: 10 }} key={idx}>
                <img src={item?.blob} width={200} height={200} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "10rem",
            border: "1px solid black",
            padding: "30px",
          }}
          data-type="file4"
          onDrop={handleOnDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <label>Drag and Drop Example</label>
          {fileData?.file4 ? (
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              {fileData?.file4?.map((item, idx) => (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                  key={idx}
                >
                  <img src={item?.blob} width={200} height={200} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{ padding: "10rem", textAlign: "center" }}
              data-type="file4"
            >
              <input name="file4" type="file" onChange={handleChange} />
              Select Image or drag and drop image here!
            </p>
          )}
          {fileData?.file4 && (
            <p
              style={{ padding: "4rem", textAlign: "center" }}
              data-type="file4"
            >
              <input name="file4" type="file" onChange={handleChange} />
              Select Image or drag and drop image here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```

## Accepted Props

| Types        | Description                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxfileSize  | is an optional property that allows you to set the maximum size of a file in kilobytes. The default value is 200kb                                                          |
| maxFile      | is an optional property that allows you to set the maximum number of files to accept NB: This `maxFile` depends on `multiple` for it to work `multiple` must be set to true |
| fileType     | is an optional property that accepts an array of strings representing file types to be accepted for upload.                                                                 |
| multiple     | is an optional boolean property that specifies whether a single or multiple files can be uploaded. The default value is false.                                              |
| handleError  | is a required method that accepts a props object and handles any errors that may occur during the file upload process.                                                      |
| handleChange | is an optional method that returns a FileList and allows you to manage the files on your own.                                                                               |

## API

| Types        | Description                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| handleChange | a function used to handle file inputs onChange                                                                            |
| handleOnDrop | This function is used to handle onDrop can be used on the drop zone elements.                                             |
| setFiles     | This is a state setter used to manage state internally, you can use this function to set and modify the `fileData` state. |
| fileData     | This is a state property that contains all the state objects.                                                             |

## Bug Fixes

1. Allow uploading the same file twice across browsers for multiple upload.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
