import React from 'react';
import Div from './division';

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <Div className="idl24by7-body-main">
          {children}
      </Div>
    </>
  )
};

export default ProtectedRoute;
