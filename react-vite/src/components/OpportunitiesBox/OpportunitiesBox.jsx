import { useNavigate, useParams } from 'react-router-dom';
import './OpportunitiesBox.css';


const OpportunityBox = ({ opportunity }) => {

  const navigate = useNavigate();
  const { id } = useParams();
  const isSelected = opportunity.id === Number(id);


  const goToOpportunityPage = () => {
    navigate(`/opps/${opportunity.id}`);
  };


  return (
    <div className={`opportunity-details ${isSelected ? 'selected' : ''}`}>
      <h3 className='opp-name'>{opportunity.name}</h3>
      <p><strong>Budget:</strong> ${opportunity.budget}</p>
      <p><strong>Created Date:</strong> {new Date(opportunity.created_date).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {opportunity.description}</p>
      <button onClick={goToOpportunityPage} className='main-button'>View Details</button>
    </div>
  );
};

export default OpportunityBox;
