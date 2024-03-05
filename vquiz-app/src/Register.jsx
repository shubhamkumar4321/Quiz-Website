import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import your CSS file for styling

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        bio: '',
        avatar: null,
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('name', formData.name);
        data.append('bio', formData.bio);
        data.append('avatar', formData.avatar);
        data.append('password', formData.password);

        try {
            const response = await axios.post('http://localhost:8000/register/', data);
            // Handle successful registration here
            console.log('Registration successful');
            console.log(response.data); // Log the response from the server if needed
        } catch (error) {
            // Handle registration errors here
            console.error('Registration failed:', error);
            if (error.response) {
                console.log(error.response.data); // Log the error response from the server
                // Display error messages in the frontend
                // You can update the state to show errors to the user
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Bio:</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Avatar:</label>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}

export default Register;
