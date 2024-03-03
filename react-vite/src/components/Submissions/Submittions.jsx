import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSubmissionsForOpportunity } from '../../redux/submissions'; // Adjust the import path as needed
import SubmissionItem from '../SubmissionItem';

const Submissions = () => {
  const { oppId } = useParams(); // This is the opportunity ID
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const { submissions, loading, error } = useSelector((state) => state.submissions);
  const isCompany = user && user.type === 'Company';

//   const currentUser = useSelector((state) => state.session.user);


  useEffect(() => {
    if (isCompany || user) {
      dispatch(fetchSubmissionsForOpportunity(oppId));
    }
  }, [dispatch, oppId, isCompany, user]);

  if (loading) {
    return <div>Loading submissions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter submissions if user is not a company
  const visibleSubmissions = isCompany
    ? submissions
    : submissions.filter((submission) => submission.creator_id === user.id);

  return (
    <div>
      <h2>Submissions for Opportunity {oppId}</h2>
      {visibleSubmissions.length > 0 ? (
        <ul>
          {visibleSubmissions.map((submission) => (
            <SubmissionItem key={submission.id} submission={submission} />
          ))}
        </ul>
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default Submissions;
