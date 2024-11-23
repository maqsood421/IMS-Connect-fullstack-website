import React from 'react';
import './../index.css';

function Signup() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Sign Up</h2>
        <p className="login-description">Create a new account!</p>

        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="form-control" placeholder="Enter username" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm password" />
          </div>
          
          <button type="submit" className="btn signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
