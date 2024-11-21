import React, { useState, useRef } from "react";
import uploadIcon from "../../assets/icon/upload-icon.svg";

function FileUploadButton({ onFileSelect }) {
  const selectFile = useRef("");

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        accept=".mp3,.aac,.ac3,.ogg,.flac,.wav,.m4a,.avi,.mp4,.mov,.wmv,.flv,.mkv"
        ref={selectFile}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file.size > 524288000) {
            // 500MB
            alert("욕심꾸러기~~ 500MB까지만~~");
          } else {
            onFileSelect(file);
          }
        }}
      />
      <button
        className="cd-draftDropBox-button"
        style={{ width: "136px", gap: "4px" }}
        onClick={() => selectFile.current.click()}
      >
        <img src={uploadIcon} alt="Record Icon" />
        <span>파일 첨부</span>
      </button>
    </div>
  );
}

export default FileUploadButton;
