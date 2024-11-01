import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../assets/benchmalk.png";

function Signup() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 추가 (API 호출 등)
    console.log(
      "ID:",
      id,
      "Name:",
      name,
      "Password:",
      password,
      "Confirm Password:",
      confirmPassword
    );
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-group">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Signup;
