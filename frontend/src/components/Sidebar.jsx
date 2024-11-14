import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/benchmalk.png";
import "../styles/Sidebar.css";
import homeIcon from "../assets/icon-home.png";

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
        <div className="menu-item">녹음하기</div>
        <div className="menu-item">파일 업로드하기</div>
        <div className="menu-item">롤모델 둘러보기</div>
        <br />
        <hr class="divider" />
        <Link to="/dashboard" className={`menu-item ${isActive("/dashboard")}`}>
          <img src={homeIcon} alt="Home Icon" className="menu-icon" />홈
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
