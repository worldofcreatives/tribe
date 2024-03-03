import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmissionItem.css';

const SubmissionItem = ({ submission, onPlay }) => {
  const navigate = useNavigate();

  const goToSubmissionDetails = () => {
    navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
  };

  return (

    <div>
    <div className="submission-item" onClick={goToSubmissionDetails}>
      <h3>{submission.name}</h3>
      <p><strong>Status:</strong> {submission.status}</p>
      <p><strong>Submitted by:</strong> {submission.creator_id}</p>
    </div>
      <button onClick={() => onPlay(submission.file_url)}>
        {submission.isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default SubmissionItem;
