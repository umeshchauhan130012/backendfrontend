import React from 'react';
import Header from './header';
import Footer from './footer';

const ProtectedRoute = ({ children }) => {
  return (
  <>
      <Header />
      {children}
      <Footer />
    </>
  )
};

export default ProtectedRoute;
