import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmissionItem.css';
import { useDispatch } from 'react-redux';
import { updateSubmissionStatus } from '../../redux/submissions';

const SubmissionItem = ({ submission, onPlay }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusOptions = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

  const handleStatusChange = (newStatus) => {
    dispatch(updateSubmissionStatus(submission.opportunity_id, submission.id, newStatus));
  };

  const goToSubmissionDetails = () => {
    navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
  };

  const generateFileName = (url) => {
    // Extract the file extension from the URL
    const extension = url.split('.').pop();
    // Create a dynamic file name. You can include other details such as the submission name or date
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    const fileName = `${submission.name}_${date}.${extension}`;
    return fileName;
  };

  return (
    <div className="submission-item-container">
      <div className="submission-item" onClick={goToSubmissionDetails}>
        <h3>{submission.name}</h3>
        <p><strong>Status:</strong> {submission.status}</p>
        <p><strong>Submitted by:</strong> {submission.creator_id}</p>
      </div>
      <button onClick={() => onPlay(submission.file_url)}>
        {submission.isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="submission-status-buttons">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={submission.status === status}
            className={submission.status === status ? 'active' : ''}
          >
            {status}
          </button>
        ))}
      </div>
      <div>
        <a
          href={submission.file_url}
          download={generateFileName(submission.file_url)}
          className="download-button"
        >
          Download Song
        </a>
      </div>
    </div>
  );
};

export default SubmissionItem;
