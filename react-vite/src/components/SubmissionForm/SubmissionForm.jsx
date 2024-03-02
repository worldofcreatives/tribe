import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewSubmission } from '../../redux/submissions'; // Adjust the path according to your project structure

const SubmissionForm = ({ opportunityId }) => {
  const dispatch = useDispatch();
  const [submissionDetails, setSubmissionDetails] = useState({
    name: '',
    notes: '',
    bpm: '',
    collaborators: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submissionDetails = new submissionDetails();
//     submissionDetails.append('name', submissionDetails.name);
//     submissionDetails.append('notes', submissionDetails.notes);
//     submissionDetails.append('bpm', submissionDetails.bpm);
//     submissionDetails.append('collaborators', submissionDetails.collaborators);
//     if (submissionDetails.file) {
//       submissionDetails.append('file', submissionDetails.file);
//     }


//     dispatch(createNewSubmission(submissionDetails, opportunityId));
//     // Reset the form or navigate the user as needed
//   };

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
        const actionResult = await dispatch(createNewSubmission(formData, opportunityId));
        setSuccessMessage('Submission created successfully!');
        // Reset submissionDetails state to clear the form
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



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={submissionDetails.name}
          onChange={handleChange}
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
        />
      </div>
      <button type="submit" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>
    {successMessage && <div>{successMessage}</div>}
    {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default SubmissionForm;
