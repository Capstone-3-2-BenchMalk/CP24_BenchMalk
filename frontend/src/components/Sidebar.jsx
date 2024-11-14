import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/benchmalk.png";
import "../styles/Sidebar.css";
import homeIcon from "../assets/home-icon.png";
import projectIcon from "../assets/project-icon.png";
import addIcon from "../assets/add-icon.png";
import closeIcon from "../assets/close-icon.png";
import recordIcon from "../assets/record-icon.png";
import modelIcon from "../assets/rolemodel-icon.png";
import trashIcon from "../assets/trash-icon.png";
import uploadIcon from "../assets/upload-icon.png";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="sidebar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        style={{ width: "200px", height: "auto" }}
      />
      <div className="menu">
        <div className="menu-item">
          <img
            src={recordIcon}
            alt="Record Icon"
            style={{ width: "18px" }}
            className="menu-icon"
          />
          녹음하기
        </div>
        <div className="menu-item">
          <img
            src={uploadIcon}
            alt="Upload Icon"
            style={{ width: "19px" }}
            className="menu-icon"
          />
          파일 업로드하기
        </div>
        <div className="menu-item">
          <img
            src={modelIcon}
            alt="Model Icon"
            style={{ width: "19px" }}
            className="menu-icon"
          />
          롤모델 둘러보기
        </div>
        <br />
        <hr class="divider" />
        <Link to="/dashboard" className={`menu-item ${isActive("/dashboard")}`}>
          <img
            src={homeIcon}
            alt="Home Icon"
            style={{ width: "24px" }}
            className="menu-icon"
          />
          홈
        </Link>
        <div className="menu-item">
          <img
            src={projectIcon}
            alt="Project Icon"
            style={{ width: "22px", marginLeft: "1px" }}
            className="menu-icon"
          />
          전체 프로젝트
          <div className="icon-box">
            <img src={addIcon} alt="Add Icon" className="sub-icon" />
            <img src={closeIcon} alt="Close Icon" className="sub-icon" />
          </div>
        </div>
        <div className="menu-item">
          <img
            src={trashIcon}
            alt="Trash Icon"
            style={{ width: "21px", marginLeft: "2px" }}
            className="menu-icon"
          />
          휴지통
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
