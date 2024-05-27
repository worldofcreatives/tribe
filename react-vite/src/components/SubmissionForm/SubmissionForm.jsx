
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSubmission } from '../../redux/submissions';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./SubmissionForm.css";

const SubmissionForm = ({ opportunityId }) => {
  const dispatch = useDispatch();
  const [submissionDetails, setSubmissionDetails] = useState({
    name: '',
    notes: '',
    bpm: '',
    collaborators: '',
    file: null,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state) => state.session.user);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const fetchSubmissionCount = async () => {
      const response = await fetch(`/api/opportunities/${opportunityId}/submissions/count`);
      const data = await response.json();
      setSubmissionCount(data.submission_count);
    };

    if (user.status === 'Accepted') {
      fetchSubmissionCount();
    }
  }, [user.status, opportunityId]);

  useEffect(() => {
    setSuccessMessage('');
    setErrorMessage('');
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmissionDetails({
      ...submissionDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSubmissionDetails({
      ...submissionDetails,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('name', submissionDetails.name);
    formData.append('notes', submissionDetails.notes);
    formData.append('bpm', submissionDetails.bpm);
    formData.append('collaborators', submissionDetails.collaborators);
    if (submissionDetails.file) {
        formData.append('file', submissionDetails.file);
    }

    try {
        if (user.status === 'Accepted' && submissionCount >= 3) {
            setErrorMessage('Submission limit reached for the current month.');
            setLoading(false);
            return;
        }

        await dispatch(createNewSubmission(formData, opportunityId));
        setSuccessMessage('Submission created successfully!');
        setSubmissionDetails({
            name: '',
            notes: '',
            bpm: '',
            collaborators: '',
            file: null,
        });
    } catch (error) {
        setErrorMessage(error.message || 'Failed to submit the form.');
    } finally {
        setLoading(false);
    }
  };

  const renderSubmitButton = () => {
    if (user.type === 'Company' || user.status === 'Accepted' || user.status === 'Premium') {
      return <button className='submit-button' type="submit">Submit</button>;
    } else if (user.status === 'Pre-Apply' || user.status === 'Denied') {
      return (
        <button className='submit-button' type="button" onClick={() => navigate('/apply')}>
          Want to submit your music? Click here to apply to 7packs
        </button>
      );
    } else if (user.status === 'Applied') {
      return (
        <button className='submit-button' type="button" disabled onClick={() => navigate('/apply')}>
          Want to submit your music? Your 7packs application is pending
        </button>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={submissionDetails.name}
          onChange={handleChange}
          type='text'
          required
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={submissionDetails.notes}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bpm">BPM:</label>
        <input
          type="number"
          id="bpm"
          name="bpm"
          value={submissionDetails.bpm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="collaborators">Collaborators:</label>
        <input
          type="text"
          id="collaborators"
          name="collaborators"
          value={submissionDetails.collaborators}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="file">Audio:</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".mp3, .wav"
          onChange={handleFileChange}
          required
        />
      </div>
      {renderSubmitButton()}
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  );
};

export default SubmissionForm;







// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createNewSubmission } from '../../redux/submissions';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import "./SubmissionForm.css";

// const SubmissionForm = ({ opportunityId }) => {
//   const dispatch = useDispatch();
//   const [submissionDetails, setSubmissionDetails] = useState({
//     name: '',
//     notes: '',
//     bpm: '',
//     collaborators: '',
//     file: null,
//   });
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const user = useSelector((state) => state.session.user);
//   const [submissionCount, setSubmissionCount] = useState(0);

//   useEffect(() => {
//     const fetchSubmissionCount = async () => {
//       const response = await fetch(`/api/opportunities/${opportunityId}/submissions/count`);
//       const data = await response.json();
//       setSubmissionCount(data.submission_count);
//     };

//     if (user.status === 'Accepted') {
//       fetchSubmissionCount();

//     }

//   }, [user.status, opportunityId]);

//   useEffect(() => {
//     setSuccessMessage('');
//     setErrorMessage('');
//   }, [location]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSubmissionDetails({
//       ...submissionDetails,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setSubmissionDetails({
//       ...submissionDetails,
//       file: e.target.files[0],
//     });
//   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     const formData = new FormData();
//     formData.append('name', submissionDetails.name);
//     formData.append('notes', submissionDetails.notes);
//     formData.append('bpm', submissionDetails.bpm);
//     formData.append('collaborators', submissionDetails.collaborators);
//     if (submissionDetails.file) {
//         formData.append('file', submissionDetails.file);
//     }

//     try {
//         const actionResult = await dispatch(createNewSubmission(formData, opportunityId));
//         setSuccessMessage('Submission created successfully!');
//         // Reset submissionDetails state to clear the form
//         setSubmissionDetails({
//             name: '',
//             notes: '',
//             bpm: '',
//             collaborators: '',
//             file: null,
//         });
//     } catch (error) {
//         setErrorMessage(error.message || 'Failed to submit the form.');
//     } finally {
//         setLoading(false);
//     }
// };

//   const renderSubmitButton = () => {
//     if (user.type === 'Company' || user.status === 'Accepted' || user.status === 'Premium') {
//       return <button className='submit-button' type="submit">Submit</button>;
//     } else if (user.status === 'Pre-Apply' || user.status === 'Denied') {
//       return (
//         <button className='submit-button' type="button" onClick={() => navigate('/apply')}>
//           Want to submit your music? Click here to apply to 7packs
//         </button>
//       );
//     } else if (user.status === 'Applied') {
//       return (
//         <button className='submit-button' type="button" disabled onClick={() => navigate('/apply')}>
//           Want to submit your music? Your 7packs application is pending
//         </button>
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           id="name"
//           name="name"
//           value={submissionDetails.name}
//           onChange={handleChange}
//           type='text'
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="notes">Notes:</label>
//         <textarea
//           id="notes"
//           name="notes"
//           value={submissionDetails.notes}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="bpm">BPM:</label>
//         <input
//           type="number"
//           id="bpm"
//           name="bpm"
//           value={submissionDetails.bpm}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="collaborators">Collaborators:</label>
//         <input
//           type="text"
//           id="collaborators"
//           name="collaborators"
//           value={submissionDetails.collaborators}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="file">Audio:</label>
//         <input
//           type="file"
//           id="file"
//           name="file"
//           accept=".mp3, .wav"
//           onChange={handleFileChange}
//           required
//         />
//       </div>
//       {renderSubmitButton()}
//     {successMessage && <div>{successMessage}</div>}
//     {errorMessage && <div className="error">{errorMessage}</div>}
//     </form>
//   );
// };

// export default SubmissionForm;


