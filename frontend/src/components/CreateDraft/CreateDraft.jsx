import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/CreateDraft.css";
import DraftDropBox from "./DraftDropBox";

function CreateDraft() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isloading, setLoading] = useState(false);
  const placeholder = (() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `연습 ${month}/${day}-${hours}:${minutes}`;
  })();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const roleModelName = searchParams.get("roleModelName");
  const projectName = searchParams.get("projectName");
  const navigate = useNavigate();

  const postPractice = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "json",
      JSON.stringify({
        projectid: projectId,
        name: title.trim() || placeholder,
        memo: "메모 일단 비워둠",
      })
    );
    console.log(projectId);
    console.log(title);
    formData.append("file", file);

    try {
      const response = await fetch("/api/v1/practices", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(" Successful", data);
        navigate(`/project/${projectId}`);
      } else {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response body: ${errorBody}`
        );
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
        disabled={isloading || !file}
      >
        {isloading ? "업로드 중..." : "분석하기"}
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
            <span className="cd-project-title-contents">{projectName}</span>
          </div>
          <div className="cd-contents-items">
            <span className="cd-project-title">롤모델</span>
            <span>{roleModelName}</span>
          </div>
          <div className="cd-contents-items">
            <span className="cd-project-title">연습 방식</span>
            <DraftDropBox isRecordable={true} file={file} setFile={setFile} />
          </div>
        </div>

        <div className="cd-button-container">
          <CreateDraftButton loading={isloading} file={file} />
        </div>
      </div>
    </div>
  );
}

export default CreateDraft;
