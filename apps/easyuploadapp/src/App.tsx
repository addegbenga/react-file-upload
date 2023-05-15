import { useUploadFile } from "@dexpackage/easyupload";

export default function App() {
  const { handleChange, fileData } = useUploadFile({
    handleError(props) {
      console.log(props);
    },
    fileType: ["image/png", "image/jpeg"],
    multiple: true,
    maxfileSize: 1500,
  });

  return (
    <div>
      <div>
        <label>Upload File 100</label>
        <input
          accept=""
          type="file"
          name="file"
          // onChange={(e) => console.log(e.target.files[0])}
        />
      </div>

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

      <div>
        <label>Upload File 2</label>
        <input type="file" name="file2" onChange={handleChange} />
        <div style={{ display: "flex", gap: 10 }}>
          {fileData?.file2?.map((item, idx) => (
            <img src={item.blob} key={idx} width={200} height={200} />
          ))}
        </div>
      </div>
    </div>
  );
}
