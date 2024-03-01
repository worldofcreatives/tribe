import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunities } from '../../redux/opportunities';

const OpportunitiesList = () => {
  const dispatch = useDispatch();
  const { loading, opportunities, error } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>All Opportunities</h2>
      {opportunities.length > 0 ? (
        <ul>
          {opportunities.map((opportunity) => (
            <li key={opportunity.id}>{opportunity.name}</li>
          ))}
        </ul>
      ) : (
        <p>No opportunities found.</p>
      )}
    </div>
  );
};

export default OpportunitiesList;
