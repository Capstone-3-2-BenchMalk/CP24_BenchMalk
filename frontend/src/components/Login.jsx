import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/benchmalk.png";

function Login() {
  const [userId, setUseruserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 에러 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 생성

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 상태 시작
    setError(null); // 에러 초기화
    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: userId, password: password }), // userId와 password를 JSON 형태로 전송
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 로직 (예: 토큰 저장, 리다이렉션 등)
        console.log("Login Successful", data);
        navigate("/dashboard");
      } else {
        // 로그인 실패 시 에러 처리
        setError(data.message || "Login failed");
        // navigate("/dashboard");
      }
    } catch (error) {
      setError("Network error");
      console.error("Error:", error);
      // navigate("/dashboard");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
    console.log("Id:", userId, "Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-group">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="login-input"
              placeholder="Enter Id"
              value={userId}
              onChange={(e) => setUseruserId(e.target.value)}
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
            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          {error && <p className="error">{error}</p>} {/* 에러 메시지 표시 */}
        </div>
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Login;
