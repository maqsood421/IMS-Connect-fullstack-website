import React from 'react'
import '../index.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <a href='#'>About IMS-Connect</a>
                    <a href='#'>Help/FAQs</a>
                    <a href='#'>Contact Support</a>
                    <a href='#'>Terms & Privacy Policy</a>
                </div>
                <p className="footer-copy">&copy; 2024 IMS-Connect. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;