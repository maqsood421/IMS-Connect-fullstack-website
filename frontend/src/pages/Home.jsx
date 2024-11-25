import React from 'react';
import '../index.css';  

function Home() {
  const websiteDescription = `
    IMS-Connect is an Innovation Management System designed to capture, assess, and nurture innovative ideas from employees globally, 
    overcoming challenges like connectivity and idea evaluation.
  `;

  return (
    <div className="home-container">
      <h1 className="home-header">Welcome! to IMS-Connect 💚</h1>
      <p className="home-paragraph">{websiteDescription}</p>
    </div>
  );
}

export default Home;
