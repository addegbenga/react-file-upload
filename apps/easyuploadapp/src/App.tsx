import { useUploadFile } from "@dexpackage/easyupload";

export default function App() {
  const { handleChange, fileData, handleOnDrop } = useUploadFile({
    handleError(props) {
      console.log(props);
    },
    // multiple: true,
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
