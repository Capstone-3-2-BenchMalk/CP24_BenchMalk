import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/benchmalk.png";

function Signup() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate(); // useNavigate 훅 생성

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userId,
          username: username,
          password: password,
        }), // 서버에 보낼 데이터
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response body: ${errorBody}`
        );
      }
      const data = await response.json();

      if (response.ok) {
        console.log("Signup Successful", data);
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Network or server error. Please try again later.");
      console.error("Error:", error);
      //navigate("/login");
    } finally {
      setLoading(false);
    }

    console.log(
      "ID:",
      userId,
      "Username:",
      username,
      "Password:",
      password,
      "Confirm Password:",
      confirmPassword
    );
  };

  return (
    <div className="login-container">
      <div className="signup-box">
        <div className="form-group">
          <h2 className="login-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="login-input"
              placeholder="Enter ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <input
              type="text"
              className="login-input"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {error && <p className="error">{error}</p>} {/* 에러 메시지 표시 */}
        </div>
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Signup;
