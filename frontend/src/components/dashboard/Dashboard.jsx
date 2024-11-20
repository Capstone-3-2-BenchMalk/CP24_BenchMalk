import React from "react";
import TableForm from "./TableForm";
import recordIcon from "../../assets/icon/record-icon.png";
import "../../styles/Dashboard.css";
import folderIcon from "../../assets/icon/folder-icon.png";
import trashIcon from "../../assets/icon/trash-icon.png";
import { style } from "@mui/system";

function PracticeTable() {
  const columns = [
    {
      header: "",
      accessor: "icon",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "13px" }} />
      ),
      style: { paddingRight: "0px" },
    },
    {
      header: "연습명",
      accessor: "practiceName",
      style: { width: "25%" },
    },
    { header: "프로젝트명", accessor: "projectName", style: { width: "20%" } },
    { header: "롤모델", accessor: "roleModel", style: { width: "20%" } },
    {
      header: "진행상태",
      accessor: "status",
      render: (status) => <span style={{ color: "green" }}>{status}</span>,
    },
    { header: "연습 시각", accessor: "startTime" },
    { header: "길이", accessor: "duration" },
  ];

  const data = [
    {
      icon: recordIcon,
      practiceName: "새로운 연습 03",
      projectName: "캡스톤 발표",
      roleModel: "김민지 아나운서",
      status: "분석완료",
      startTime: "2024.11.05 4:38",
      duration: "5:13",
    },
    {
      icon: recordIcon,
      practiceName: "새로운 연습 02",
      projectName: "캡스톤 발표",
      roleModel: "김민지 아나운서",
      status: "분석완료",
      startTime: "2024.11.05 4:38",
      duration: "5:13",
    },
  ];

  return <TableForm columns={columns} data={data} />;
}

function ProjectTable() {
  const columns = [
    {
      header: "",
      accessor: "icon1",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "15px" }} />
      ),
      style: { paddingRight: "0px", style: { width: "10%" } },
    },
    {
      header: "프로젝트명",
      accessor: "projectName",
      // style: { width: "40%" },
    },
    { header: "롤모델", accessor: "roleModel", style: { width: "20%" } },
    { header: "발표시간", accessor: "speechTime", style: { width: "10%" } },
    {
      header: "",
      accessor: "icon2",
      render: (value) => (
        <img src={value} alt="icon" style={{ width: "15px" }} />
      ),
      // style: { width: "auto" },
    },
  ];

  const data = [
    {
      icon1: folderIcon,
      projectName: "캡스톤 발표",
      roleModel: "김민지 아나운서",
      speechTime: "15~20분",
      icon2: trashIcon,
    },
  ];

  return <TableForm columns={columns} data={data} />;
}

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* 연습 관련 테이블 */}
      <section className="practice-section">
        <h2 className="section-title">최근 연습</h2>
        <PracticeTable />
      </section>

      {/* 프로젝트 관련 테이블 */}
      <section className="project-section">
        <h2 className="section-title">프로젝트 목록</h2>
        <ProjectTable />
      </section>
    </div>
  );
}

export default Dashboard;
