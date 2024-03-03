// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SubmissionItem.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateSubmissionStatus } from '../../redux/submissions';


// const SubmissionItem = ({ submission, onPlay }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const statusOptions = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

//   const handleStatusChange = (newStatus) => {
//     dispatch(updateSubmissionStatus(submission.opportunity_id, submission.id, newStatus));
//   };

//   const updatedSubmission = useSelector(state =>
//     state.submissions.submissions.find(s => s.id === submission.id)
//   );
//   console.log("🚀 ~ SubmissionItem ~ updatedSubmission:", updatedSubmission)

//   const goToSubmissionDetails = () => {
//     navigate(`/opps/${submission.opportunity_id}/subs/${submission.id}`);
//   };

//   return (

//     <div>
//     <div className="submission-item" onClick={goToSubmissionDetails}>
//       <h3>{submission.name}</h3>
//       <p><strong>Status:</strong> {submission.status}</p>
//       <p><strong>Submitted by:</strong> {submission.creator_id}</p>
//     </div>
//       <button onClick={() => onPlay(submission.file_url)}>
//         {submission.isPlaying ? 'Pause' : 'Play'}
//       </button>
//       <div>
//         {statusOptions.map((status) => (
//           submission.status !== status && (
//             <button key={status} onClick={() => handleStatusChange(status)}>
//               Set as {status}
//             </button>
//           )
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubmissionItem;


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
    </div>
  );
};

export default SubmissionItem;
