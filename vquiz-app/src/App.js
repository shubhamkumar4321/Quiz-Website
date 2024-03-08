// App.js
import React from 'react';
import Login from './Loginn';
import Welcome from './Welcome';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinGroup from './JoinGroup';
import CreateGroup from './CreateGroup';
import Profile from './Profile';
import MyGroups from './MyGroups';
import Group from './Group';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/take-quiz" element={<div>Take Quiz Page</div>} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/join-group" element={<JoinGroup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/MyGroups" element={<MyGroups />} />
          <Route path="/MyGroups/Group" element={<Group />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
