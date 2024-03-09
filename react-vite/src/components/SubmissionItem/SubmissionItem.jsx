import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmissionItem.css';
import { useDispatch } from 'react-redux';
import { deleteSubmission, updateSubmissionStatus } from '../../redux/submissions';


const SubmissionItem = ({ submission, onPlay }) => {
  console.log("🚀 ~ SubmissionItem ~ submission:", submission)
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
      navigate(`/opps/${submission.opportunity_id}/subs`);
    }
  };

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
      const bucketName = 'packtune';
      const fileKey = submission.file_url.split('/').pop();
      try {
        const response = await fetch(`/api/aws/download/${bucketName}/${fileKey}`);
        if (!response.ok) {
          throw new Error(`Server responded with a status: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        if (blob.size === 0) {
          throw new Error('Downloaded file is empty.');
        }

        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;
        // Use generateFileName to dynamically set the file name
        const dynamicFileName = generateFileName(submission.file_url);
        downloadLink.download = dynamicFileName;
      } catch (error) {
        console.error(`Error during file download: ${error.message}`);
      }
    };

    getDownload();
  }, [submission.file_url]);


return (
  <div className="submission-item-container">
    <div className='sub-left'>
      <button onClick={() => onPlay(submission.file_url)}>
        {submission.isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="submission-item" onClick={goToSubmissionDetails}>
        <p><strong>{submission.name}</strong></p>
        <p>by {submission.username}</p>
        <p><strong>Status:</strong> {submission.status}</p>
      </div>
    </div>

    <div className="submission-status-buttons">
        {['Pending', 'Reviewing', 'Accepted', 'Rejected'].filter(status => status !== submission.status).map((status) => (
          <button key={status} onClick={() => handleStatusChange(status)} title={status}>
            <i className={`fas ${status === 'Pending' ? 'fa-spinner' : status === 'Reviewing' ? 'fa-question' : status === 'Accepted' ? 'fa-check' : 'fa-times'}`} />
          </button>
        ))}
        <button onClick={handleDelete} title="Delete" className='delete' >
          <i className="fas fa-trash-alt"></i>
        </button>
      <a id='download-link' href="#">Download</a>
    </div>
  </div>
);
};

export default SubmissionItem;
