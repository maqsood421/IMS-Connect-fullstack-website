import './../index.css';


function Login() {

    const handleLogin = () => {
        fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            // body: JSON.stringify({ email: "ags@gmail.com", password: "password" }),
        })
        .then((resp) => resp.json())
        .then((res) => {
            if (res.token) {
                localStorage.setItem("token", res.token);
                location.reload();
            } else {
                // Handle error case (e.g., invalid credentials)
                console.error("Login failed", res);
            }
        })
        .catch((error) => {
            // Handle network errors or other issues
            console.error("Error during login", error);
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
            <input type="email" id="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Enter password" />
          </div>

          <div className="checkbox-container">
            <a href="#" className="checkbox-label">Forgot password?</a>
          </div>

          <button type="button" className="btn login-btn" onClick={handleLogin}>Login</button>

        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
