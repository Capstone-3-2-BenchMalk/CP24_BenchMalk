import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  matchPath,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CreateDraft from "./components/CreateDraft/CreateDraft";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideSidebarPaths = ["/", "/login", "/signup"];
  const showSidebar = !hideSidebarPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <div className="App">
      {showSidebar && <Sidebar />}
      <div className={`content ${showSidebar ? "with-sidebar" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/createdraft" element={<CreateDraft />} />{" "}
        </Routes>
      </div>
    </div>
  );
}

export default App;
