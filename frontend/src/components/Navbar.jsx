import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../index.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();  // Get the current location object
  const path = location.pathname; // Get the current path
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Function to toggle menu

  return (
    <nav className="navbar">
      <div className="logo">IMS-Connect</div>

      {/* Hamburger menu icon for mobile view */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"} {/* Toggle between Hamburger and Close icon */}
      </div>

      {/* Navigation links */}
      <div className={`navLinks ${isMenuOpen ? 'active' : ''}`}>
        {isLoggedIn ?
          <>
            <Link to="/home" className="navLink">Home</Link>
            <Link to="/ideas" className="navLink">Submit an Idea</Link>
            <Link to="/collaborate" className="navLink">Collaborate on Ideas</Link>
            <Link to="/rewards" className="navLink">Reward Program</Link>
          </> :
          <>
            {path.includes("/signup") &&
              <Link to="/login" className="navLink" style={{ background: "green", color: "white" }}>Login</Link>
            }{
              path.includes("/login") &&
              <Link to="/signup" className="navLink" style={{ background: "green", color: "white" }}>Signup</Link>
            }
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
