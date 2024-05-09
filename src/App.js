import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log("file", file);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("new", file);
      const response = await axios.post(
        "http://localhost:3002/read",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (file.type === "application/pdf") {
        const text = await response?.data?.text;
        setData(text);
      } else {
        const sheet = await response?.data?.Sheet1;
        setData(sheet);
      }

      console.log(response);
    } catch (err) {
      console.error(err, "Error uploading file");
    }
  };
  console.log(data);
  return (
    <div className="App">
      <div>
        <h1>Upload a File</h1>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" onClick={handleUpload}>
          Submit
        </button>
        <br />
        <ul>
          {Array.isArray(data) ? (
            data?.map((item, index) => {
              return <li key={index}>{Object.values(item)}</li>;
            })
          ) : (
            <div>{data}</div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
