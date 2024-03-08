import React from 'react';
import './Login.css'; // Import CSS file for styling

const Login = () => {
  const handleLogin = () => {
    // Implement login functionality here
  };

  return (
    <div>
      <nav className="navbar">
        <div><b>vQuiz</b>
        </div>
        <div className="nav-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </nav>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
