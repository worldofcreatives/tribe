import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const WithCompanyGuard = (WrappedComponent) => {
  return (props) => {
    const user = useSelector((state) => state.session.user);

    if (user && user.type === 'Company') {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  };
};

export default WithCompanyGuard;
