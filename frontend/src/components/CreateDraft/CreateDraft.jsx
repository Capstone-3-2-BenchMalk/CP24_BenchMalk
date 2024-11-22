import React, { useState } from "react";
import "../../styles/CreateDraft.css";
import DraftDropBox from "./DraftDropBox";

function CreateDraft() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const placeholder = "연습 기본 #num";

  const postPractice = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim()) {
      setTitle(placeholder);
    }
    const formData = new FormData();
    formData.append(
      "json",
      JSON.stringify({
        projectid: "3",
        name: "제발제발",
        memo: "메모 없음1234",
      })
    );
    formData.append("file", file);

    try {
      const response = await fetch("/api/v1/practices", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(" Successful", data);
        //TODO: 연습 상세 화면으로 넘어가기
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  function CreateDraftButton() {
    return (
      <button
        className="cd-button"
        onClick={postPractice}
        disabled={loading || !file}
      >
        분석하기
      </button>
    );
  }
  return (
    <div className="cd-flex">
      <div className="cd-container">
        <div>
          <input
            className="cd-title-input"
            type="text"
            placeholder={placeholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            <DraftDropBox file={file} setFile={setFile} />
          </div>
        </div>

        <div className="cd-button-container">
          <CreateDraftButton loading={loading} file={file} />
        </div>
      </div>
    </div>
  );
}

export default CreateDraft;
