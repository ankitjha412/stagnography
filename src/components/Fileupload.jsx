// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../styles/styles.css"; // Ensure the styles are imported

const FileUpload = ({ onUpload }) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name); // Update the displayed file name

    const reader = new FileReader();
    reader.onload = () => {
      if (onUpload) onUpload(reader.result); // Pass Base64 to parent
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="file-input">
      <label htmlFor="file-upload" className="file-input-label">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      <span className="file-name">{fileName}</span>
    </div>
  );
};

export default FileUpload;
