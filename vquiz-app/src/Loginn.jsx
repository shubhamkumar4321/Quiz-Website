import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import './Login.css'; // Import CSS file for styling



const Loginn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log(data); // For testing, log the response from the server
      // If login successful, redirect to the Welcome page
    //   history.push('/welcome');
    navigate('/welcome');

    } catch (error) {
      console.error('Error:', error);
      // Handle error scenario
    }
  };
  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the sign-up page
  }

  return (
    <div>
      <nav className="navbar">
        <div ><b>vQuiz</b>
        </div>
        <div className="nav-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </nav>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Loginn;