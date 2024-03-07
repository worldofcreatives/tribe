import React, { useEffect } from 'react';
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

  useEffect(() => {
    const getDownload = async () => {
      const bucketName = 'packtune';
      const fileName = submission.file_url; // Make sure this is the S3 key for the file
      const response = await fetch(`/api/aws/download/${bucketName}/${fileName}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.getElementById('download-link');
      downloadLink.href = url;
      downloadLink.download = fileName; // Optional: Set download attribute to define filename
    };

    getDownload();
  }, []);

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
      {/* <a
        href={submission.file_url}
        download={generateFileName(submission.file_url)}
        className="download-button"
      >
        Download Song
      </a> */}
      <a id='download-link' href="#">Download</a>
    </div>
  </div>
);
};

export default SubmissionItem;




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
