import React, { useState } from "react";
import "../../styles/CreateDraft.css";
import FileUploadButton from "./FileUploadButton.jsx";
import RecordButton from "./RecordButton.jsx";
import FilePreview from "./FilePreview.jsx";

function DraftDropBox({ isRecordable, file, setFile }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 제한 검사
    if (file.size > 524288000) {
      alert("욕심꾸러기~~ 500MB까지만~~");
      return;
    }

    setFile(file);
  };

  return (
    <div className="cd-draftDropBox">
      <div className="cd-draftDropBox-title">
        녹음 또는 파일을 업로드하여 분석해보세요.
      </div>
      <div className="cd-draftDropBox-subtitle">
        (파일 길이 : 5분~50분, 지원 형식: mp3, aac, ac3, ogg, flac, wav, m4a,
        avi, mp4, mov, wmv, flv, mkv)
      </div>
      <div className="cd-draftDropBox-button-container">
        {!file ? (
          <>
            {isRecordable ? <RecordButton setFile={setFile} /> : <></>}
            <FileUploadButton onFileSelect={setFile} />
          </>
        ) : (
          <FilePreview file={file} onCancel={() => setFile(null)} />
        )}
      </div>
    </div>
  );
}

export default DraftDropBox;
