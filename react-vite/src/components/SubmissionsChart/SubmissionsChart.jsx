import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllSubmissions } from '../../redux/submissions'; // Ensure you have this action implemented

const SubmissionsChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSubmissions()).then(() => {
      console.log(submissions); // Log submissions to inspect their structure
    });
  }, [dispatch]);


  const submissions = useSelector((state) => state.submissions.submissions); // Adjust according to your state structure

  return (
    <table>
      <thead>
        <tr>
          <th>Submission Name</th>
          <th>Opportunity Name</th>
          <th>Date Added</th>
          <th>Genre(s)</th>
          <th>Type(s)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {submissions.map((submission) => (
        <tr key={submission.id}>
          <td>{submission.name}</td>
          <td>{submission.opportunity || 'N/A'}</td>
          <td>{new Date(submission.created_date).toLocaleDateString()}</td>
          <td>{(submission.genres?.map(genre => genre.name) || []).join(', ') || 'N/A'}</td>
          <td>{(submission.types?.map(type => type.name) || []).join(', ') || 'N/A'}</td>
          <td>
              <Link to={`/opps/${submission.opp_id}/subs`}>View Submissions</Link>
              {' | '}
              <Link to={`/opps/${submission.opp_id}`}>View Opportunity</Link>
            </td>
        </tr>
      ))}

      </tbody>
    </table>
  );
};

export default SubmissionsChart;
