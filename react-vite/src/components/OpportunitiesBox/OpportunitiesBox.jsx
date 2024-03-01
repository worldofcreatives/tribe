import { useNavigate } from 'react-router-dom';

const OpportunityBox = ({ opportunity }) => {
  const navigate = useNavigate();

  const goToOpportunityPage = () => {
    navigate(`/opps/${opportunity.id}`);
  };

  return (
    <div className="opportunity-details">
      <h3>{opportunity.name}</h3>
      <p><strong>Budget:</strong> ${opportunity.budget}</p>
      <p><strong>Created Date:</strong> {new Date(opportunity.created_date).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {opportunity.description}</p>
      <button onClick={goToOpportunityPage}>View Details</button>
    </div>
  );
};

export default OpportunityBox;
