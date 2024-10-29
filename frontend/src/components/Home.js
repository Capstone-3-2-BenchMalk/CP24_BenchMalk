import { Link } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/benchmalk.png';


function Home() {
    return (
      <div className="App">
        <img src={logo} alt="Logo" className="logo" style={{width: '600px', height:'auto' }}/>
        <Link to="/Login">
            <button className="login-button">Login</button>
        </Link>
        <button className="signup-button">Sign Up</button>
      </div>
    );
  }

export default Home;