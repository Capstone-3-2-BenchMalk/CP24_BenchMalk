import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/benchmalk.png";

function Home() {
  return (
    <div className="Home">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        style={{ width: "600px", height: "auto" }}
      />
      <Link to="/login">
        <button className="login-button">Login</button>
      </Link>
      <Link to="/signup">
        <button className="signup-button">Sign Up</button>
      </Link>
    </div>
  );
}

export default Home;
