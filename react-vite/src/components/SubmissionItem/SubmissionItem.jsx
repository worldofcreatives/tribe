import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmissionItem.css';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

const SubmissionItem = ({ submission }) => {
  console.log("🚀 ~ SubmissionItem ~ submission:", submission)
  const navigate = useNavigate();

  // Function to navigate to the details page of the submission
  const goToSubmissionDetails = () => {
    navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
  };

  return (
    <div>

    <div className="submission-item" onClick={goToSubmissionDetails}>
      <h3>{submission.name}</h3>
      <p><strong>Status:</strong> {submission.status}</p>
      <p><strong>Submitted by:</strong> {submission.creator_id}</p>
      {/* Add more details as necessary */}
    </div>
      <MusicPlayer audioUrl={submission.file_url} />
    </div>
  );
};

export default SubmissionItem;
