import { useState } from 'react';
import './../index.css';

function Login() {
    // State to hold email, password, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const handleLogin = () => {
        fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // use dynamic state values
        })
            .then((resp) => resp.json())
            .then((res) => {
                console.log(res);
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user));
                    location.reload();
                } else {
                    // Handle error case (e.g., invalid credentials)
                    setErrorMessage("Invalid Credentials!"); // Set the error message
                }
            })
            .catch((error) => {
                // Handle network errors or other issues
                console.error("Error during login", error);
                setErrorMessage("An error occurred, please try again later."); // Handle network errors
            });
    };

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <h2 className="login-title">Sign in</h2>
                    <p className="login-description">Please enter your login and password!</p>

                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // update email state on change
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // update password state on change
                            />
                        </div>

                        <div className="checkbox-container">
                            <a href="#" className="checkbox-label">Forgot password?</a>
                        </div>

                        {errorMessage && (
                            <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn login-btn"
                            onClick={handleLogin}>Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
