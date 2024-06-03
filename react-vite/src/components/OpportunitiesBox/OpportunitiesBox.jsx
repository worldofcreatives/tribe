import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OpportunitiesBox.css';

const OpportunityBox = ({ opportunity }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isSelected = opportunity.id === Number(id);
  const boxRef = useRef(null); // Add this line

  useEffect(() => {
    if (isSelected && boxRef.current) {
      boxRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isSelected]);

  const goToOpportunityPage = () => {
    navigate(`/opps/${opportunity.id}`);
  };

  return (
    <div className={`opportunity-details ${isSelected ? 'selected' : ''}`} ref={boxRef}>
      <h3 className='opp-name'>{opportunity.name}</h3>
      <div className='bubble-box'>
        <p className='bubble'><strong>Deadline: {new Date(opportunity.created_date).toLocaleDateString()}</strong></p>
      </div>
      <p className='description'>{opportunity.description}</p>
      <button onClick={goToOpportunityPage} className='main-button'>View Details</button>
    </div>
  );
};

export default OpportunityBox;
