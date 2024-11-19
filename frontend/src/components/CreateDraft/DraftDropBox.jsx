import React, { useState } from "react";
import "../../styles/CreateDraft.css";
import uploadIcon from "../../assets/upload-icon.svg";
import recordIcon from "../../assets/record-icon.svg";

function DraftDropBox() {
  function RecordButton() {
    return (
      <button
        className="cd-draftDropBox-record-button"
        style={{ width: "118px" }}
      >
        {/* 이미지 아이콘 */}
        <img src={recordIcon} alt="Record Icon" />
        {/* 텍스트 */}
        <span>녹음</span>
      </button>
    );
  }

  function UploadButton() {
    return (
      <button
        className="cd-draftDropBox-record-button"
        style={{ width: "136px" }}
      >
        {/* 이미지 아이콘 */}
        <img src={uploadIcon} alt="Upload Icon" style={{}} />
        {/* 텍스트 */}
        <span>파일 첨부</span>
      </button>
    );
  }
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
        <RecordButton />
        <UploadButton />
      </div>
    </div>
  );
}

export default DraftDropBox;
