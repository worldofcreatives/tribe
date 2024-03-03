// SubmissionItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmissionItem = ({ submission }) => {
  const navigate = useNavigate();

  // Function to navigate to the details page of the submission
  const goToSubmissionDetails = () => {
    navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
  };

  return (
    <div className="submission-item" onClick={goToSubmissionDetails}>
      <h3>{submission.name}</h3>
      <p><strong>Status:</strong> {submission.status}</p>
      <p><strong>Submitted by:</strong> {submission.creator_id}</p>
      {/* Add more details as necessary */}
    </div>
  );
};

export default SubmissionItem;
