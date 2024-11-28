import React, { useState, useEffect } from "react";
import TableForm from "./TableForm";
import recordIcon from "../../assets/icons/record-icon.png";
import "../../styles/Dashboard.css";
import folderIcon from "../../assets/icons/folder-icon.png";
import trashIcon from "../../assets/icons/trash-icon.png";
import { formatCreatedTime, formatDuration } from "../../utils/fomatters";

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
    { header: "롤모델", accessor: "roleModel", style: { width: "15%" } },
    {
      header: "진행상태",
      accessor: "status",
      render: (value) => (
        <span style={{ color: value === "ANALYZED" ? "green" : "red" }}>
          {value}
        </span>
      ),
      style: { width: "20%" },
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

function ProjectTable({ data }) {
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
      style: { width: "35%" },
    },
    {
      header: "롤모델",
      accessor: "roleModel",
      style: { width: "30%" },
    },
    {
      header: "발표시간",
      accessor: "speechTime",
      style: { width: "25%" },
    },
    {
      header: "",
      accessor: "icon2",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "15px" }} />
      ),
      style: { width: "5%" },
    },
  ];

  return <TableForm columns={columns} data={data} />;
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
          throw new Error(`HTTP error! status: ${response.status}`);
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
            createdDate: item.created_date,
          }))
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

        setPractices(mappedData); // 상태 업데이트
      } catch (err) {
        setError("Failed to fetch practices. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/v1/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // API 데이터 매핑
        const mappedData = data
          .map((item) => ({
            id: item.id,
            icon1: folderIcon,
            projectName: item.name,
            roleModel: item.model?.name || "미지정",
            speechTime: `${item.min_time} ~ ${item.max_time} 분`,
            icon2: trashIcon,
            createdDate: item.created_date,
          }))
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

        console.log(mappedData);
        setProjects(mappedData); // 상태 업데이트
      } catch (err) {
        setError("Failed to fetch practices. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPractices();
    fetchProjects();
  }, []);

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
          <ProjectTable data={projects} />
        )}
      </section>
    </div>
  );
}

export default Dashboard;
