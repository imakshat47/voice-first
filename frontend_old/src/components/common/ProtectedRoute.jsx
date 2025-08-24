import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // <-- CORRECTED PATH

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect them to the /login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child route (e.g., DashboardPage)
  return <Outlet />;
};

export default ProtectedRoute;