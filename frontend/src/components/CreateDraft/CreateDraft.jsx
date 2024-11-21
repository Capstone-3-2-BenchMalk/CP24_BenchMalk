import React, { useState } from "react";
import "../../styles/CreateDraft.css";
import DraftDropBox from "./DraftDropBox";

function CreateDraft() {
  function CreateDraftButton() {
    return <button className="cd-button">분석하기</button>;
  }
  return (
    <div className="cd-flex">
      <div className="cd-container">
        <div>
          <input
            className="cd-title-input"
            type="text"
            placeholder="새로운 연습 05"
          />
        </div>

        <div className="cd-contents">
          <div className="cd-contents-items">
            <span className="cd-project-title">프로젝트</span>
            <span className="cd-project-title-contents">프로젝트명</span>
          </div>
          <div className="cd-contents-items">
            <span className="cd-project-title">롤모델</span>
            <span>유현준</span>
          </div>
          <div className="cd-contents-items">
            <span className="cd-project-title">연습 방식</span>
            <DraftDropBox />
          </div>
        </div>

        <div className="cd-button-container">
          <CreateDraftButton />
        </div>
      </div>
    </div>
  );
}

export default CreateDraft;
