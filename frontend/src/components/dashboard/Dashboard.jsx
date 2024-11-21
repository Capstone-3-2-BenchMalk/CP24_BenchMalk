import React, { useState, useEffect } from "react";
import TableForm from "./TableForm";
import recordIcon from "../../assets/icon/record-icon.png";
import "../../styles/Dashboard.css";
import folderIcon from "../../assets/icon/folder-icon.png";
import trashIcon from "../../assets/icon/trash-icon.png";

function PracticeTable({ data }) {
  const columns = [
    {
      header: "",
      accessor: "icon",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "13px" }} />
      ),
      style: { paddingRight: "0px" },
    },
    { header: "연습명", accessor: "practiceName", style: { width: "20%" } },
    { header: "프로젝트명", accessor: "projectName", style: { width: "20%" } },
    { header: "롤모델", accessor: "roleModel", style: { width: "20%" } },
    {
      header: "진행상태",
      accessor: "status",
      render: (value) => (
        <span style={{ color: value === "ANALYZED" ? "green" : "red" }}>
          {value}
        </span>
      ),
    },
    { header: "연습 시각", accessor: "startTime" },
    { header: "길이", accessor: "duration" },
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
      style: { width: "4%", paddingRight: "0px" },
    },
    {
      header: "프로젝트명",
      accessor: "projectName",
      style: { width: "20%" },
    },
    {
      header: "",
      // accessor: "projectName",
      // style: { width: "25%" },
    },
    {
      header: "롤모델",
      accessor: "roleModel",
      style: { width: "20%" },
    },
    {
      header: "발표시간",
      accessor: "speechTime",
      style: { width: "20%" },
    },
    {
      header: "",
      accessor: "icon2",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "15px" }} />
      ),
      style: { width: "10%" },
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
        const mappedData = data.map((item) => ({
          icon: recordIcon,
          practiceName: item.name,
          projectName: item.project.name,
          roleModel: item.project.roleModelid || "N/A",
          status: item.status || "N/A",
          startTime: formatTime(item.created_date),
          duration: item.duration,
        }));

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
        const mappedData = data.map((item) => ({
          icon1: folderIcon,
          projectName: item.name,
          roleModel: item.roleModelid || "N/A",
          speechTime: `${item.min_time} ~ ${item.max_time} 분`,
          icon2: trashIcon,
        }));

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

function formatTime(isoDate) {
  const date = new Date(isoDate);

  const hours = String(date.getHours()).padStart(2, "0"); // 24시간 형식
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")} ${hours}:${minutes}`;
  // const year = date.getUTCFullYear();
  // const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  // const day = String(date.getUTCDate()).padStart(2, "0");
  // const hours = String(date.getUTCHours()).padStart(2, "0");
  // const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // return `${year}.${month}.${day} ${hours}:${minutes}`;
}
