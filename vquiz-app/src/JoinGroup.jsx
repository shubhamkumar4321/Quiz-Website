import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JoinGroup.css';
import { useNavigate } from 'react-router-dom';
const JoinGroup = () => {
  // State for search query and search results
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Call API or perform search operation here
    // Update searchResults state accordingly
  };

  // Function to handle join group action
  const handleJoinGroups = (group) => {
    // Implement join group functionality here
    console.log(`Joined group: ${group}`);
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
      {/* Search box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a group..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display search results */}
      <div className="group-list">
        <h2>Search Results</h2>
        {searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          searchResults.map((group) => (
            <div key={group.id} className="group">
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <button onClick={() => handleJoinGroups(group)}>Join</button>
            </div>
          ))
        )}
      </div>

      {/* Display some example groups */}
      <div className="group-list">
        <h2>Example Groups</h2>
        <div className="group">
          <h3>Group 1</h3>
          <p>Description of Group 1</p>
          <button onClick={() => handleJoinGroup('Group 1')}>Join</button>
        </div>
        <div className="group">
          <h3>Group 2</h3>
          <p>Description of Group 2</p>
          <button onClick={() => handleJoinGroup('Group 2')}>Join</button>
        </div>
        {/* Add more example groups as needed */}
      </div>
    </div>
  );
};

export default JoinGroup;
