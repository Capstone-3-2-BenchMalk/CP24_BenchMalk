import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/ProjectPage.css";
import plusPurple from "../../assets/icons/plus-purple-icon.png";
import recordIcon from "../../assets/icons/record-icon.png";
import trashIcon from "../../assets/icons/trash-icon.png";
import { formatCreatedTime, formatDuration } from "../../utils/fomatters";

function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState({
    projectName: "",
    targetTimeMin: 0,
    targetTimeMax: 0,
  });
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddPractice = () => {
    navigate("/createdraft");
  };
  const handleDeletePractice = (practiceId) => {
    // 연습 삭제 후 상태 업데이트
    setPractices(
      practices.filter((practice) => practice.practiceId !== practiceId)
    );
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // 먼저 프로젝트 정보를 가져옴
        const projectResponse = await fetch(`/api/v1/projects/${projectId}`);
        if (!projectResponse.ok) {
          throw new Error(`HTTP error! status: ${projectResponse.status}`);
        }
        const projectData = await projectResponse.json();

        setProjectData({
          projectName: projectData.name,
          targetTimeMin: projectData.min_time,
          targetTimeMax: projectData.max_time,
        });

        // 그 다음 해당 프로젝트의 연습 목록을 가져옴
        const practicesResponse = await fetch(
          `/api/v1/practices?projectid=${projectId}`
        );
        if (!practicesResponse.ok) {
          throw new Error(`HTTP error! status: ${practicesResponse.status}`);
        }
        const practicesData = await practicesResponse.json();

        const mappedPractices = practicesData.map((item) => ({
          practiceId: item.id,
          practiceName: item.name,
          status: item.status || "N/A",
          createdTime: formatCreatedTime(item.created_date),
          duration: formatDuration(item.duration) || "N/A",
        }));

        setPractices(mappedPractices);
      } catch (err) {
        setError("Failed to fetch project data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  function PracticeCard({ data, onDelete }) {
    const handleDelete = async (e) => {
      e.stopPropagation(); // 카드 클릭 이벤트와 분리
      try {
        const response = await fetch(`/api/v1/practices/${data.practiceId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        onDelete(data.practiceId);
      } catch (error) {
        console.error("Error deleting practice:", error);
        alert("연습 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    };
    return (
      <div className="pp-practice-card">
        <div className="practice-card-icon">
          <img src={recordIcon} alt="record" style={{ width: "12px" }} />
        </div>
        <div className="practice-name">{data.practiceName}</div>
        <div className="practice-date">{data.createdTime}</div>
        <div className="practice-time">{data.duration}</div>
        <div className="status">
          <span style={{ color: data.status === "ANALYZED" ? "green" : "red" }}>
            {data.status}
          </span>
        </div>
        <div className="practice-card-icon" onClick={handleDelete}>
          <img
            src={trashIcon}
            alt="trash"
            style={{ width: "14px", cursor: "pointer" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pp-flex">
      <div className="pp-header">
        <div className="project-info">
          <div className="pp-title">{projectData.projectName}</div>
          <div className="pp-time-container">
            목표 발표 시간 : {projectData.targetTimeMin}분 ~{" "}
            {projectData.targetTimeMax}분
          </div>
        </div>
        <button className="add-draft-btn" onClick={handleAddPractice}>
          <div className="add-draft-btn-content">
            <img src={plusPurple} alt="plus" className="plus-purple-icon" />
            <span>연습 추가하기</span>
          </div>
        </button>
      </div>
      <div className="pp-practice-container">
        <div className="pp-practice-title">연습 목록</div>
        <div className="pp-practice-list">
          {practices.map((practice) => (
            <PracticeCard
              key={practice.practiceId}
              data={practice}
              onDelete={handleDeletePractice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
