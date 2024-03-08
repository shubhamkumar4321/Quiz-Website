import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import './MyGroups.css'; // Import CSS file for styling

const MyGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch groups data from the backend
    const fetchGroups = async () => {
      try {
        // Make a request to fetch groups data from the backend
        const response = await axios.get(`http://localhost:8000/groups?search=${searchTerm}`);
        setGroups(response.data); // Assuming the response contains groups data
      } catch (error) {
        console.error('Failed to fetch groups data:', error);
      }
    };

    fetchGroups();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateGroup = () => {
    navigate('/create-group'); // Redirect to create group page
  };

  const handleJoinGroup = () => {
    navigate('/join-group'); // Redirect to join group page
  };

  const handleWelcome = () => {
    navigate('/welcome'); // Redirect to welcome page
  };

  const handleProfile = () => {
    navigate('/profile'); // Redirect to profile page
  };

  const handleGroup = (groupId) => {
    navigate(`/group/${groupId}`); // Navigate to the specific group page
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><button onClick={handleWelcome}>Home</button></li>
          <li><button>My Groups</button></li>
          <li><button onClick={handleCreateGroup}>Create Group</button></li>
          <li><button onClick={handleJoinGroup}>Join Group</button></li>
          <li className="profile"><button onClick={handleProfile}>Profile</button></li>
        </ul>
      </nav>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Group List */}
      <div className="group-list">
        <h2>My Groups</h2>
        <ul>
          {groups.map(group => (
            <li key={group.id}>
              <button onClick={() => handleGroup(group.id)}>{group.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyGroups;
