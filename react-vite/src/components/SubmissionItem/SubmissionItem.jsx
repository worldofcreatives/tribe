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
      navigate(`/opps/${submission.opportunity_id}/subs`);
    }
  };

  const goToSubmissionDetails = () => {
    navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
  };

  const generateFileName = (url) => {
    const extension = url.split('.').pop();
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${submission.name}_${date}.${extension}`;
    return fileName;
  };

//   return (
//     <div className="submission-item-container">
//       <div className='sub-left'>
//       <button onClick={() => onPlay(submission.file_url)}>
//         {submission.isPlaying ? 'Pause' : 'Play'}
//       </button>
//       <div className="submission-item" onClick={goToSubmissionDetails}>
//         <p><strong>{submission.name}</strong></p>
//         <p>by {submission.username}</p>
//         <p><strong>Status:</strong> {submission.status}</p>
//       </div>
//       </div>

//       <div className="submission-status-buttons">
//         {statusOptions.map((status) => (
//           <button
//             key={status}
//             onClick={() => handleStatusChange(status)}
//             disabled={submission.status === status}
//             className={submission.status === status ? 'active' : ''}
//           >
//             {status}
//           </button>
//         ))}
//       <button onClick={handleDelete}>Delete</button>
//         <a
//           href={submission.file_url}
//           download={submission.name}
//           className="download-button"
//         >
//           Download Song
//         </a>
//       </div>
//     </div>
//   );
// };
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
      {statusOptions.filter(status => status !== submission.status).map((status) => (
        <button
          key={status}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </button>
      ))}
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
