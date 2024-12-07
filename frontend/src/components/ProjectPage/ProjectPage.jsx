import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/ProjectPage.css";
import plusPurple from "../../assets/icons/plus-purple-icon.png";
import { PracticeCard } from "./PracticeCard";
import { useProjectData, useModelData } from "../../hooks/useProjectData";
import AudioPlayer from "./AudioPlayer";
import SelectRoleModel from "./SelectRoleModel";
import AnalysisCard from "./AnalysisCard";

function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projectData, practices, roleModel, setPractices, loading, error } =
    useProjectData(projectId);
  const [selectedPracticeId, setSelectedPracticeId] = useState(null);
  const {
    modelData,
    loading: modelLoading,
    error: modelError,
  } = useModelData(projectData.modelId);

  useEffect(() => {
    if (practices.length > 0) {
      setSelectedPracticeId(practices[0].practiceId);
    }
  }, [practices]);

  const handleAddPractice = () => {
    navigate(
      `/createdraft?projectId=${projectId}&roleModelName=${encodeURIComponent(
        roleModel.modelName
      )}&projectName=${encodeURIComponent(projectData.projectName)}`
    );
  };

  const handleDeletePractice = (practiceId) => {
    setPractices(
      practices.filter((practice) => practice.practiceId !== practiceId)
    );
  };

  const handlePracticeSelect = (practiceId) => {
    setSelectedPracticeId(practiceId);
    console.log(`연습 아이디 : ${practiceId}`);
  };

  useEffect(() => {
    setSelectedPracticeId(null);
    console.log(`프로젝트 아이디 : ${projectId}`);
  }, [projectId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pp-flex">
      <div className="pp-header">
        <div className="project-info">
          <div className="pp-title">{projectData.projectName}</div>
          {/* <div className="pp-time-container">
            목표 발표 시간 : {projectData.targetTimeMin}분 ~{" "}
            {projectData.targetTimeMax}분
          </div> */}
        </div>
        <button className="add-draft-btn" onClick={handleAddPractice}>
          <div className="add-draft-btn-content">
            <img src={plusPurple} alt="plus" className="plus-purple-icon" />
            <span>연습 추가하기</span>
          </div>
        </button>
      </div>
      {roleModel.audioUrl ? (
        <div className="pp-menu-container">
          <div className="pp-menu-title">롤모델</div>
          <AudioPlayer
            audioUrl={roleModel.audioUrl}
            modelName={roleModel.modelName || "N/A"}
          />
        </div>
      ) : (
        <SelectRoleModel />
      )}
      <div className="pp-menu-container">
        <div className="pp-menu-title">연습 목록</div>
        {practices.length === 0 ? (
          <div className="empty-menu-message">연습을 추가하세요</div>
        ) : (
          <div className="pp-practice-list">
            {practices.map((practice) => (
              <PracticeCard
                key={practice.practiceId}
                data={practice}
                onDelete={handleDeletePractice}
                onClick={() => handlePracticeSelect(practice.practiceId)}
                isSelected={practice.practiceId === selectedPracticeId}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pp-menu-container">
        <div className="pp-menu-title">분석결과</div>
        {projectData.modelId ? (
          <AnalysisCard
            key={`${projectId}-${selectedPracticeId}`}
            practiceId={selectedPracticeId}
            modelId={projectData.modelId}
            practiceName={
              practices.find((p) => p.practiceId === selectedPracticeId)
                ?.practiceName
            }
          />
        ) : (
          <div className="empty-menu-message">롤모델을 먼저 설정해주세요</div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
