import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const adminStatus = localStorage.getItem('admin');

  if (!token || adminStatus !== '1') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
