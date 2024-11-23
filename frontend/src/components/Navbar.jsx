import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">IMS-Connect</div>
      <div className="navLinks">
        <Link to="/home" className="navLink">Home</Link>
        <Link to="/ideas" className="navLink">Submit an Idea</Link>
        <Link to="/collaborate" className="navLink">Collaborate on Ideas</Link>
        <Link to="/rewards" className="navLink">Reward Program</Link>
      </div>
    </nav>
  );
};

export default Navbar;
