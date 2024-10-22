// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children ,loading}) => {
  if (!loading && !isAuthenticated ) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
