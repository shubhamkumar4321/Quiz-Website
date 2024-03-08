// import React from 'react';
// import './Login.css'; // Import CSS file for styling

// const Login = () => {
//   const handleLogin = () => {
//     // Implement login functionality here
//   };

//   return (
//     <div>
//       <nav className="navbar">
//         <div className="logo">
//           <img src="/logo.png" alt="Company Logo" />
//           <span>vQuiz</span>
//         </div>
//         <div className="nav-buttons">
//           <button className="login-button">Login</button>
//           <button className="signup-button">Sign Up</button>
//         </div>
//       </nav>
//       <div className="login-container">
//         <h2>Login</h2>
//         <form>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input type="text" id="username" name="username" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" name="password" />
//           </div>
//           <button type="submit" onClick={handleLogin}>Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // Import useHistory hook

// import './Login.css'; // Import CSS file for styling

// const Login = () => {
// const history = useHistory(); // Initialize useHistory hook

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8000/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
      
//       const data = await response.json();
//       console.log(data); // For testing, log the response from the server
//       history.push('/welcome');

//       // Handle successful login or display error message to user

//     } catch (error) {
//       console.error('Error:', error);
//       // Handle error scenario
//     }
//   };

//   return (
//     <div>
//       <nav className="navbar">
//         <div className="logo">
//           <img src="/logo.png" alt="Company Logo" />
//           <span>vQuiz</span>
//         </div>
//         <div className="nav-buttons">
//           <button className="login-button">Login</button>
//           <button className="signup-button">Sign Up</button>
//         </div>
//       </nav>
//       <div className="login-container">
//         <h2>Login</h2>
//         <form>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit" onClick={handleLogin}>Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import './Login.css'; // Import CSS file for styling



const Login = () => {
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

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Company Logo" />
          <span>vQuiz</span>
        </div>
        <div className="nav-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
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

export default Login;
