import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
  <>
      <Header />
      <Sidebar />
      <div className="custom-body-wrapper">
        <div className="custom-space-section">
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
};

export default ProtectedRoute;
