import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProjectPage.css";
import plusPurple from "../../assets/icons/plus-purple-icon.png";

function ProjectPage() {
  const navigate = useNavigate();

  const handleAddPractice = () => {
    navigate("/createdraft"); // CreateDraft 페이지의 경로
  };

  return (
    <div className="pp-flex">
      <div className="pp-header">
        <div className="pp-left">
          <div className="pp-title">프로젝트 이름</div>
          <div className="pp-time-container">
            <div>목표 발표 시간</div>
            <div>- 분 ~ -분</div>
          </div>
        </div>
        <button className="create-draft-btn" onClick={handleAddPractice}>
          <div className="btn-content">
            <img src={plusPurple} alt="plus" className="plus-purple-icon" />
            <span>연습 추가하기</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProjectPage;
