// ProtectedRoute.jsx
// Restricts access to children if not logged in as admin
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Check for a valid token in localStorage (basic check)
  const token = localStorage.getItem('token');
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
