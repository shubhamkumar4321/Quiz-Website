import React from 'react';
import './Welcome.css'; // Import CSS file for styling

const Welcome = () => {
  const userName = 'John Doe'; // Replace with actual username

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
            {/* Render dashboard data dynamically here */}
            <tr>
              <td>Sample Quiz</td>
              <td>2024-02-28</td>
              <td>8</td>
              <td>10</td>
              <td>80</td>
              <td>80%</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Welcome;
