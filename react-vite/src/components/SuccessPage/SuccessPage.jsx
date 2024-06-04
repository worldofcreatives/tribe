import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>Payment Successful!</h1>
      <p>Thank you for your subscription. Your payment was successful, and your account has been upgraded.</p>
      <button onClick={() => navigate('/profile')}>Go to Profile</button>
    </div>
  );
};

export default SuccessPage;
