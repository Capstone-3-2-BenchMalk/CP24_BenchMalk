import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableForm from "./TableForm";
import recordIcon from "../../assets/icons/record-icon.png";
import "../../styles/Dashboard.css";
import folderIcon from "../../assets/icons/folder-icon.png";
import trashIcon from "../../assets/icons/trash-icon.png";
import {
  formatCreatedTime,
  formatDuration,
  formatCreatedDate,
} from "../../utils/fomatters";

const statusConfig = {
  ANALYZED: { text: "분석완료", color: "green" },
  CREATED: { text: "분석 중", color: "blue" },
  FAILED: { text: "분석 실패", color: "red" },
};

function PracticeTable({ data }) {
  const columns = [
    {
      header: "",
      accessor: "icon",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "13px" }} />
      ),
      style: { width: "4%" },
    },
    { header: "연습명", accessor: "practiceName", style: { width: "20%" } },
    { header: "프로젝트명", accessor: "projectName", style: { width: "15%" } },
    { header: "롤모델", accessor: "roleModel", style: { width: "25%" } },
    {
      header: "진행상태",
      accessor: "status",
      render: (value) => (
        <span style={{ color: statusConfig[value]?.color || "red" }}>
          {statusConfig[value]?.text || "분석 실패"}
        </span>
      ),
      style: { width: "10%" },
    },
    { header: "연습 시각", accessor: "createdTime", style: { width: "16%" } },
    {
      header: "길이",
      accessor: "duration",
      style: { width: "10%", marginRight: "10%" },
    },
  ];

  return <TableForm columns={columns} data={data} />;
}

function ProjectTable({ data, onDelete }) {
  const navigate = useNavigate();
  const handleRowClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };
  const columns = [
    {
      header: "",
      accessor: "icon1",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "17px" }} />
      ),
      style: { width: "5%" },
    },
    {
      header: "프로젝트명",
      accessor: "projectName",
      style: { width: "30%" },
    },
    {
      header: "롤모델",
      accessor: "roleModel",
      style: { width: "30%" },
    },
    {
      header: "생성날짜",
      accessor: "createdDate",
      style: { width: "30%" },
    },
    {
      header: "",
      accessor: "icon2",
      render: (value, row) => (
        <img
          src={value}
          alt="delete"
          style={{ width: "15px", cursor: "pointer" }}
          onClick={(e) => handleDelete(e, row.projectId)}
        />
      ),
      style: { width: "5%" },
    },
  ];
  const handleDelete = async (e, projectId) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/v1/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response body: ${errorBody}`
        );
      }
      onDelete(projectId);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("프로젝트 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <TableForm columns={columns} data={data} onRowClick={handleRowClick} />
  );
}

function Dashboard() {
  const [practices, setPractices] = useState([]); // Practice 데이터를 저장할 상태
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // API 호출
  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await fetch("/api/v1/practices");
        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "서버 에러 메시지:",
            errorData.message || "알 수 없는 에러"
          );
          setError(
            errorData.message ||
              `연습 데이터를 불러오는데 실패했습니다. (에러코드: ${response.status})`
          );
          return;
        }

        const data = await response.json();

        // API 데이터 매핑
        const mappedData = data
          .map((item) => ({
            icon: recordIcon,
            practiceName: item.name,
            projectName: item.project.name,
            roleModel: item.project.model?.name || "미지정",
            status: item.status || "N/A",
            createdTime: formatCreatedTime(item.created_date),
            duration: formatDuration(item.duration),
            sortDate: item.created_date,
          }))
          .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

        setPractices(mappedData); // 상태 업데이트
      } catch (err) {
        console.error("연습 데이터 불러오기 실패:", err);
        setError("연습 데이터 fetch 불가");
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/v1/projects");
        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "서버 에러 메시지:",
            errorData.message || "알 수 없는 에러"
          );
          setError(
            errorData.message ||
              `프로젝트 데이터를 불러오는데 실패했습니다. (에러코드: ${response.status})`
          );
          return;
        }
        const data = await response.json();

        // API 데이터 매핑
        const mappedData = data
          .map((item) => ({
            projectId: item.id,
            icon1: folderIcon,
            projectName: item.name,
            roleModel: item.model?.name || "미지정",
            // speechTime: `${item.min_time} ~ ${item.max_time} 분`,
            createdDate: formatCreatedDate(item.created_date),
            icon2: trashIcon,
            sortDate: item.created_date,
          }))
          .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

        console.log(mappedData);
        setProjects(mappedData); // 상태 업데이트
      } catch (err) {
        setError("프로젝트 fetch 불가");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPractices();
    fetchProjects();
  }, []);

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.projectId !== projectId));
  };

  return (
    <div className="dashboard-container">
      <section className="practice-section">
        <h2 className="section-title">최근 연습</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <PracticeTable data={practices} />
        )}
      </section>
      <section className="project-section">
        <h2 className="section-title">프로젝트 목록</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <ProjectTable data={projects} onDelete={handleDeleteProject} />
        )}
      </section>
    </div>
  );
}

export default Dashboard;
