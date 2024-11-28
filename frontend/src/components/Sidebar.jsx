import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/benchmalk.png";
import "../styles/Sidebar.css";
import homeIcon from "../assets/icons/home-icon.png";
import projectIcon from "../assets/icons/project-icon.png";
import addIcon from "../assets/icons/add-icon.png";
import closeIcon from "../assets/icons/close-icon.png";
import recordIcon from "../assets/icons/record-icon.png";
import modelIcon from "../assets/icons/rolemodel-icon.png";
import trashIcon from "../assets/icons/trash-icon.png";
import uploadIcon from "../assets/icons/upload-icon.png";
import folderIcon from "../assets/icons/folder-icon.png";
import profileIcon from "../assets/icons/profile-icon.png";
import settingIcon from "../assets/icons/setting-icon.png";
import moreIcon from "../assets/icons/more-icon.png";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => (location.pathname === path ? "active" : "");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/v1/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleAddClick = () => {
    setIsAdding(true); // 입력창 표시
  };

  const handleAddInputChange = (e) => {
    setNewProjectName(e.target.value);
  };

  const handleAddKeyDown = async (e) => {
    console.log("Key Down:", e.key);
    if (e.key === "Escape") {
      e.preventDefault();
      setIsAdding(false);
      setNewProjectName("");
    } else if (e.key === "Enter" && newProjectName.trim() !== "") {
      e.preventDefault();
      if (!isPosting) {
        try {
          setIsPosting(true);
          const response = await fetch("/api/v1/projects", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newProjectName,
              min_time: 0,
              max_time: 0,
            }),
          });
          const data = await response.json();

          if (response.ok) {
            console.log("Post Project Successful", data);
            setIsPosting(false);
            setProjects((prevProjects) => [...prevProjects, data]);
            navigate(`/project/${data.id}`);
            setIsAdding(false);
            setNewProjectName("");
          } else {
            throw new Error(
              `Failed to add project: ${response.status} ${response.statusText}`
            );
          }
        } catch (err) {
          console.error("Error adding project:", err);
        }
      } else {
        console.log("중복 호출 이겠지?");
      }
    }
  };

  const handleAddBlur = async () => {
    setIsAdding(false);
    setNewProjectName("");
  };

  return (
    <div className="sidebar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        style={{ width: "180px", height: "auto" }}
      />
      <div className="menu-section menu-top">
        <Link
          to="/createdraft"
          className={`menu-item ${isActive("/createdraft")}`}
        >
          <img
            src={recordIcon}
            alt="Record Icon"
            style={{ width: "13px" }}
            className="menu-icon"
          />
          녹음하기
        </Link>
        <div className="menu-item">
          <img
            src={uploadIcon}
            alt="Upload Icon"
            style={{ width: "14px" }}
            className="menu-icon"
          />
          파일 업로드하기
        </div>
        <div className="menu-item">
          <img
            src={modelIcon}
            alt="Model Icon"
            style={{ width: "12px" }}
            className="menu-icon"
          />
          롤모델 둘러보기
        </div>
      </div>
      <hr className="divider" />
      <div className="menu-section menu-cen">
        <Link to="/dashboard" className={`menu-item ${isActive("/dashboard")}`}>
          <img
            src={homeIcon}
            alt="Home Icon"
            style={{ width: "18px" }}
            className="menu-icon"
          />
          홈
        </Link>
        <div className="menu-item">
          <img
            src={projectIcon}
            alt="Project Icon"
            style={{ width: "16px", marginLeft: "1px" }}
            className="menu-icon"
          />
          전체 프로젝트
          <div className="icon-box">
            <img
              src={addIcon}
              alt="Add Icon"
              className="sub-icon"
              onClick={handleAddClick}
              role="button"
            />
            <img src={closeIcon} alt="Close Icon" className="sub-icon" />
          </div>
        </div>
        {isAdding && (
          <div className="project-item">
            <img
              src={folderIcon}
              alt="Folder Icon"
              style={{ width: "15px" }}
              className="menu-icon"
            />
            <input
              type="text"
              value={newProjectName}
              onChange={handleAddInputChange}
              onKeyDown={handleAddKeyDown}
              onBlur={handleAddBlur}
              placeholder="프로젝트 이름"
              autoFocus
              className="project-input"
            />
          </div>
        )}
        <div className="project-list">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                id={project.id}
                className={`project-item ${isActive(`/project/${project.id}`)}`}
                onClick={() => handleProjectClick(project.id)}
              >
                <img
                  src={folderIcon}
                  alt="Folder Icon"
                  style={{ width: "15px" }}
                  className="menu-icon"
                />
                <span>{project.name}</span>
                <img
                  src={moreIcon}
                  className="sub-icon"
                  style={{ marginLeft: "auto" }}
                />
              </div>
            ))
          )}
        </div>
        <div className="menu-item">
          <img
            src={trashIcon}
            alt="Trash Icon"
            style={{ width: "15px", marginLeft: "2px" }}
            className="menu-icon"
          />
          휴지통
        </div>
      </div>
      <div className="menu-section menu-bottom">
        <div className="menu-item">
          <img
            src={profileIcon}
            alt="Profile Icon"
            style={{ width: "17px", marginLeft: "2px" }}
            className="menu-icon"
          />
          내 정보
        </div>
        <div className="menu-item">
          <img
            src={settingIcon}
            alt="Setting Icon"
            style={{ width: "18px", marginLeft: "2px" }}
            className="menu-icon"
          />
          서비스 설정
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
