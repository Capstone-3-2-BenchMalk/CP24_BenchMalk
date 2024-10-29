import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/benchmalk.png';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 추가 (API 호출 등)
    console.log("ID:", id, "Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-group">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <img src={logo} alt="Logo" className="logo"/>
      </div>
      
    </div>
  );
}

export default Login;
