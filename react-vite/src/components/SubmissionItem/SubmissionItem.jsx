import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmissionItem.css';
import { useDispatch } from 'react-redux';
import { deleteSubmission, updateSubmissionStatus } from '../../redux/submissions';

const SubmissionItem = ({ submission, onPlay }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusOptions = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

  const handleStatusChange = (newStatus) => {
    dispatch(updateSubmissionStatus(submission.opportunity_id, submission.id, newStatus));
  };

    // Function to handle deletion
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this submission?");
    if (confirmDelete) {
      dispatch(deleteSubmission(submission.opportunity_id, submission.id));
      // Optionally navigate user away or refresh the list of submissions
      navigate(`/opps/${submission.opportunity_id}/subs`);
    }
  };

  const goToSubmissionDetails = () => {
    navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
  };

  const generateFileName = (url) => {
    const extension = url.split('.').pop();
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    const fileName = `${submission.name}_${date}.${extension}`;
    return fileName;
  };

  return (
    <div className="submission-item-container">
      <div className="submission-item" onClick={goToSubmissionDetails}>
        <h3>{submission.name}</h3>
        <h4>by {submission.username}</h4>
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
      <button onClick={handleDelete}>Delete</button>
      <div>
        <a
          href={submission.file_url}
          download={submission.name}
          className="download-button"
        >
          Download Song
        </a>
      </div>
    </div>
  );
};

export default SubmissionItem;
