import React, { useState } from "react";
import "../../styles/CreateDraft.css";
import DraftDropBox from "./DraftDropBox";

function CreateDraft() {
  return (
    <div className="cd-container">
      <div>
        <input
          className="cd-title-input"
          type="text"
          placeholder="프로젝트명"
        />
      </div>
      <div>
        <span className="cd-project-title">프로젝트</span>
        <span>프로젝트명</span>
      </div>
      <div>
        <span className="cd-project-title">롤모델</span>
        <span>유현준</span>
      </div>
      <div>
        <span className="cd-project-title">연습 방식</span>
        <DraftDropBox />
      </div>
    </div>
  );
}

export default CreateDraft;
