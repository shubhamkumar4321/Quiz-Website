import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Profile.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; 
const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();  
  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        // Make a request to fetch user data from the backend
        const response = await axios.get('http://localhost:8000/user/profile');
        setUserData(response.data); // Assuming the response contains user data
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    // Implement edit profile functionality
  };

  const handleDeleteProfile = () => {
    // Implement delete profile functionality
  };
  const handleCreateGroup = () => {
    navigate('/create-group'); // Redirect to create group page
  };
  const handleJoinGroup = () => {
    navigate('/join-group'); // Redirect to create group page
  };
  const handleWelcome = () => {
    navigate('/welcome'); // Redirect to create group page
  };
  const handleProfile = () => {
    navigate('/Profile'); // Redirect to create group page
  };
  const handleMyGroups = () =>{
    navigate('/MyGroups')
  };
  return (
    <div>
      <nav className="navbar">
        <ul>
        <li><button onClick={handleWelcome}>Home</button></li>
        <li><button onClick={handleMyGroups}>My Groups</button></li>
          <li><button onClick={handleCreateGroup}>Create Group</button></li>
          {/* Add other list items as needed */}
          <li><button onClick={handleJoinGroup}>Join Group</button></li>
          <li className="profile"><button onClick={handleProfile}>Profile</button></li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="profile-container">
        <h2>Profile</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="user-info">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Bio:</strong> {userData.bio}</p>
          </div>
        )}
        <div className="buttons">
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
