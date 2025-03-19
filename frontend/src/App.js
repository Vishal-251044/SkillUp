import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Feedback from './screens/Feedback';
import Admin from './screens/Admin';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import './App.css';

const ProtectedProfileRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedProfileRoute>
              <Profile />
            </ProtectedProfileRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
