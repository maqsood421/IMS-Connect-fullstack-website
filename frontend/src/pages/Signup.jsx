import React, { useState } from 'react';
import './../index.css';

function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Corrected variable name
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle username changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Corrected to use e.target.value
  };

  // Handle email changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Corrected to use e.target.value
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Corrected to use e.target.value
  };

  // Handle confirmPassword changes
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // Corrected to use e.target.value
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (data.success) {
        // Handle success - Save the token in localStorage
        const { token, user } = data;  // Assuming the server sends the token
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.reload(user);  // Example redirect
        } else {
          setError('Token not received');
        }
      } else {
        setError(data.message || 'Error registering user');
      }
    } catch (error) {
      setError('Error occurred while registering');
      console.error('Error during registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Sign Up</h2>
        <p className="login-description">Create a new account!</p>

        {error && <p className="error-message">{error}</p>}  {/* Display error messages */}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}  // Use correct state variable
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="btn signup-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
