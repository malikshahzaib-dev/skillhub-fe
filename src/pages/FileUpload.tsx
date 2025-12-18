import { useParams } from "react-router-dom";

export default function FileUpload() {
 
  const handleUpload = async (e:any) => {
    const file = e.target.files[0]; // selected file
    const formData = new FormData();
    formData.append("file", file); // key "file" must match backend

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload response:", data);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("File upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}
