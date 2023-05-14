import { useUploadFile } from "@dexpackage/easyupload";

export default function App() {
  const { handleChange, fileData } = useUploadFile({
    handleError(props) {
      console.log(props);
    },
    multiple: true,
    
  });

  return (
    <div>
      <div>
        <label>Upload File 2</label>
        <input type="file" name="file" onChange={handleChange} />
        <div style={{ display: "flex", gap: 10 }}>
          {fileData?.file?.map((item, idx) => (
            <img src={item} key={idx} width={200} height={200} />
          ))}
        </div>
      </div>
      <div>
        <label>Upload File 3</label>
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
