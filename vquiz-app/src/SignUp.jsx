import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('User created successfully!');
        // Clear the form after successful submission
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        // Redirect to the login page after successful sign-up
        navigate('/welcome');
      } else {
        setMessage(data.message); // Display any error message from the server
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to create user. Please try again later.');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Company Logo" />
          <span>vQuiz</span>
        </div>
        <div className="nav-buttons">
        <button className="login-button"><Link to="/login">Login</Link></button>
          {/* Redirect to login page when clicking the Sign Up button */}
          <button className="signup-button" onClick={() => navigate('/login')}>Sign Up</button>
        </div>
      </nav>
      <div className="signup-container">
        <h2>Sign Up</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
