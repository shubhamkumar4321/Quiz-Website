import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css';
 
const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const navigate = useNavigate();
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };
 
  const handleGroupDescriptionChange = (e) => {
    setGroupDescription(e.target.value);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending data to backend
    console.log("Name:", groupName);
    console.log("Description:", groupDescription);
    // Reset form fields after submission
    setGroupName('');
    setGroupDescription('');
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
    <div className="create-group-container">
      <h1>Create Group</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="groupName">Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={handleGroupNameChange}
           required
          />
        </div>
        <div className="form-group">
          <label htmlFor="groupDescription">Description:</label>
          <textarea
            id="groupDescription"
            value={groupDescription}
            onChange={handleGroupDescriptionChange}
            required
          ></textarea>
        </div>
        <button className='group-btn' type="submit">Create Group</button>
      </form>
    </div>
    </div>
  );
};

export default CreateGroup;