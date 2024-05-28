import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="cancel-page">
      <h1>Payment Canceled</h1>
      <p>It looks like you canceled the payment. If this was a mistake, you can try again.</p>
      <button onClick={() => navigate('/subscribe')}>Try Again</button>
    </div>
  );
};

export default CancelPage;
