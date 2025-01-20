import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Chat from './components/chat/';
import VerifyEmail from './components/VerifyEmail';
import { useSelector } from 'react-redux';

const App = () => {

  const token = useSelector((state) => state.auth.user.token);

  return (
    <Router>
      <Routes>
        <Route path='/' element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<Register />} />
        <Route path="/verify-Email" element={<VerifyEmail />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/sample" element={<Register />} />
        <Route path="/chat" element={token ? <Chat /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  )
};

export default App;
