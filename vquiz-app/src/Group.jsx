import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Group.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
const Group = () => {
  const [groupInfo, setGroupInfo] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch group information from the backend
    const fetchGroupInfo = async () => {
      try {
        // Make a request to fetch group information from the backend
        const response = await axios.get('http://localhost:8000/group');
        setGroupInfo(response.data.groupInfo); // Assuming the response contains group information
        setQuizzes(response.data.quizzes); // Assuming the response contains quizzes data
      } catch (error) {
        console.error('Failed to fetch group information:', error);
      }
    };

    fetchGroupInfo();
  }, []);

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

      {/* Group Information Section */}
      <div className="group-info-container">
        <h2>{groupInfo.name}</h2>
        <p>{groupInfo.description}</p>
        <p>Members: {groupInfo.members}</p>
      </div>

      {/* Ongoing Quizzes Section */}
      <div className="quizzes-container">
        <h3>Ongoing Quizzes</h3>
        <ul className="quizzes-list">
          {quizzes.map(quiz => (
            <li key={quiz.id}>
              <h4>{quiz.name}</h4>
              <p>{quiz.details}</p>
              <button>Enter Quiz</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Group;
