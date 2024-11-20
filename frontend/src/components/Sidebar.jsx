import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/benchmalk.png";
import "../styles/Sidebar.css";
import homeIcon from "../assets/icon/home-icon.png";
import projectIcon from "../assets/icon/project-icon.png";
import addIcon from "../assets/icon/add-icon.png";
import closeIcon from "../assets/icon/close-icon.png";
import recordIcon from "../assets/icon/record-icon.png";
import modelIcon from "../assets/icon/rolemodel-icon.png";
import trashIcon from "../assets/icon/trash-icon.png";
import uploadIcon from "../assets/icon/upload-icon.png";
import folderIcon from "../assets/icon/folder-icon.png";
import profileIcon from "../assets/icon/profile-icon.png";
import settingIcon from "../assets/icon/setting-icon.png";
import moreIcon from "../assets/icon/more-icon.png";

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
        style={{ width: "180px", height: "auto" }}
      />
      <div className="menu-section menu-top">
        <div className="menu-item">
          <img
            src={recordIcon}
            alt="Record Icon"
            style={{ width: "13px" }}
            className="menu-icon"
          />
          녹음하기
        </div>
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
            <img src={addIcon} alt="Add Icon" className="sub-icon" />
            <img src={closeIcon} alt="Close Icon" className="sub-icon" />
          </div>
        </div>
        <div className="menu-item">
          <img
            src={folderIcon}
            alt="Folder Icon"
            style={{ width: "15px", marginLeft: "30px" }}
            className="menu-icon"
          />
          캡스톤 발표
          <img
            src={moreIcon}
            className="sub-icon"
            style={{ marginLeft: "auto" }}
          />
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
