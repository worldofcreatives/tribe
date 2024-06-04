import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleOpportunity } from '../../redux/opportunities';
import Opportunity from '../Opportunity/Opportunity';
import SubmissionForm from '../SubmissionForm/SubmissionForm';

const OpportunityPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleOpportunity, loading, error } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(fetchSingleOpportunity(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!singleOpportunity) return <div>Opportunity not found</div>; // Add this line

  return (
    <div>
      <Opportunity opportunity={singleOpportunity} />
      <SubmissionForm opportunityId={id} />
    </div>
  );
};

export default OpportunityPage;
