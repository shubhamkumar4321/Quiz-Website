import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Welcome.css'; // Import CSS file for styling

const Welcome = () => {
  const [userName, setUserName] = useState('');
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    // Fetch user's name from the backend or from the authentication token
    const fetchUserName = async () => {
      try {
        // Make a request to fetch user's name from the backend
        const response = await axios.get('http://localhost:8000/user');
        setUserName(response.data.userName); // Assuming the response has the user's name
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    // Fetch dashboard data from the backend
    const fetchDashboardData = async () => {
      try {
        // Make a request to fetch dashboard data from the backend
        const response = await axios.get('http://localhost:8000/dashboard');
        setDashboardData(response.data.dashboardData); // Assuming the response has the dashboard data
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchUserName();
    fetchDashboardData();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><a href="#">Take Quiz</a></li>
          <li><a href="#">Create Group</a></li>
          <li><a href="#">Join Group</a></li>
          <li className="profile"><a href="#">Profile</a></li>
        </ul>
      </nav>
      <div className="welcome-message">
        <p>Hello {userName}, Welcome to the vQuiz App</p>
      </div>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <table>
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Date Taken</th>
              <th>Correct Answers</th>
              <th>Total Questions</th>
              <th>Marks Obtained</th>
              <th>Marks Percentage</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((quiz, index) => (
              <tr key={index}>
                <td>{quiz.quizName}</td>
                <td>{quiz.dateTaken}</td>
                <td>{quiz.correctAnswers}</td>
                <td>{quiz.totalQuestions}</td>
                <td>{quiz.marksObtained}</td>
                <td>{quiz.marksPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Welcome;