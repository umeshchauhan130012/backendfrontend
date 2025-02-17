import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import Div from './div';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
  <>
      <Header />
      <Sidebar />
      <Div className="custom-body-wrapper">
        <Div className="custom-space-section">
          {children}
        </Div>
      </Div>
      <Footer />
    </>
  )
};

export default ProtectedRoute;
