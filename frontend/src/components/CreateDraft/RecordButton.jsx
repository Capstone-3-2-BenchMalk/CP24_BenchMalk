import React, { useState, useRef } from "react";
import recordIcon from "../../assets/icons/record-icon.svg";

function RecordButton() {
  return (
    <button
      className="cd-draftDropBox-button"
      style={{ width: "118px", gap: "8px" }}
    >
      <img src={recordIcon} alt="Record Icon" />
      <span>녹음</span>
    </button>
  );
}

export default RecordButton;
