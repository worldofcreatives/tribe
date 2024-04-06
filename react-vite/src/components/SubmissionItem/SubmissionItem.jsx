import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmissionItem.css';
import { useDispatch } from 'react-redux';
import { deleteSubmission, updateSubmissionStatus } from '../../redux/submissions';

const SubmissionItem = ({ submission, onPlay, isPlaying }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [highlightedStatus, setHighlightedStatus] = useState(submission.status);
  const submissionClassName = `submission-item-container ${isPlaying ? 'playing' : ''}`;


  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation(); // Prevent event from propagating to the parent div
    const statusToSet = highlightedStatus === newStatus ? 'Pending' : newStatus;
    setHighlightedStatus(statusToSet);
    dispatch(updateSubmissionStatus(submission.opportunity_id, submission.id, statusToSet));
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent event from propagating to the parent div
    const confirmDelete = window.confirm("Are you sure you want to delete this submission?");
    if (confirmDelete) {
      dispatch(deleteSubmission(submission.opportunity_id, submission.id));
      navigate(`/opps/${submission.opportunity_id}/subs`);
    }
  };

    // Dynamically generate an ID for the download link
    const downloadLinkId = `download-link-${submission.id}`;

  const goToSubmissionDetails = () => {
    navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
  };

  const generateFileName = (url) => {
    const extension = url.split('.').pop();
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${submission.name}_${submission.bpm} BPM_(${submission.username}, ${submission.collaborators}, Major7eague).${extension}`;
    return fileName;
  };

  useEffect(() => {
    const getDownload = async () => {
      const fileKey = submission.file_url.split('/').pop();
      try {
        const response = await fetch(`/api/aws/download/packtune/${fileKey}`);
        if (!response.ok) {
          throw new Error(`Server responded with a status: ${response.status} ${response.statusText}`);
        }
        const blob = await response.blob();
        if (blob.size === 0) {
          throw new Error('Downloaded file is empty.');
        }
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById(downloadLinkId);
        if (downloadLink) { // Check if the element exists
          downloadLink.href = url;
          downloadLink.download = generateFileName(submission.file_url); // Use generated file name
        }
      } catch (error) {
        console.error(`Error during file download: ${error.message}`);
      }
    };
    if (submission.file_url) getDownload(); // Only run if file_url exists
  }, [submission.file_url, downloadLinkId, submission.name, submission.bpm, submission.username, submission.collaborators]); // Adjust dependencies as needed

  return (
    <div className={submissionClassName} onClick={() => goToSubmissionDetails()}>
      <div className='sub-left'>
        <button onClick={(e) => {e.stopPropagation(); onPlay();}}>
          {isPlaying ? <i className="fa fa-stop" aria-hidden="true"></i> : <i className="fas fa-play"></i>}
        </button>
        <div className='submission-item'>
          <p><strong>{submission.name}</strong></p>
          <p>by {submission.username}</p>
        </div>
      </div>
      <div className="submission-status-buttons">
        <button onClick={(e) => handleStatusChange(e, 'Accepted')} title="Accepted" className={highlightedStatus === 'Accepted' ? 'status-btn accepted highlighted' : 'status-btn accepted'}>
          <i className="fas fa-heart"></i>
        </button>
        <button onClick={(e) => handleStatusChange(e, 'Rejected')} title="Rejected" className={highlightedStatus === 'Rejected' ? 'status-btn rejected highlighted' : 'status-btn rejected'}>
          <i className="fas fa-archive"></i>
        </button>
        <a id={`download-link-${submission.id}`} href="#" onClick={(e) => e.stopPropagation()} title="Download">
          <i className="fas fa-download download-icon"></i>
        </a>
      </div>
    </div>
  );
};

export default SubmissionItem;

