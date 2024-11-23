import React from 'react'
import '../index.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <Link to="/about">About IMS-Connect</Link>
                    <Link>Help/FAQs</Link>
                    <Link>Contact Support</Link>
                    <Link>Terms & Privacy Policy</Link>
                </div>
                <p className="footer-copy">&copy; 2024 IMS-Connect. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;