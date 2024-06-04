import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationComplete.css';

const ApplicationComplete = () => {
  const navigate = useNavigate();

  const handleBrowseOpportunities = () => {
    navigate('/opps');
  };

  return (
    <div className="application-complete">
      <h1>Congratulations!</h1>
      <p>Your application is being processed. We are thrilled to have you on board!</p>
      <p>In the meantime, feel free to browse the amazing opportunities we have for you.</p>
      <button onClick={handleBrowseOpportunities}>Browse Opportunities</button>
    </div>
  );
};

export default ApplicationComplete;
