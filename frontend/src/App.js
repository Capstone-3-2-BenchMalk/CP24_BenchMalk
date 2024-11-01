import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />{" "}
        {/* Login 컴포넌트로 연결 */}
        <Route path="/signup" element={<Signup />} />{" "}
        {/* Login 컴포넌트로 연결 */}
      </Routes>
    </Router>
  );
}

export default App;
