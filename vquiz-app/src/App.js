import React from 'react';
import Login from './Loginn';
import Welcome from './Welcome';
import * as ReactDOM from "react-dom";
import SignUp from './SignUp';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          {/* Add routes for other options */}
          <Route path="/SignUp" element={<SignUp />} />

          <Route path="/take-quiz" element={<div>Take Quiz Page</div>} />
          <Route path="/create-group" element={<div>Create Group Page</div>} />
          <Route path="/join-group" element={<div>Join Group Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;