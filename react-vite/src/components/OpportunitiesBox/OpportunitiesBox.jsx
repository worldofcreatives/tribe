import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OpportunitiesBox.css';

const OpportunityBox = ({ opportunity }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isSelected = opportunity.id === Number(id);
  const boxRef = useRef(null);


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
    <div className={`opportunity-details ${isSelected ? 'selected' : ''}`} ref={boxRef} onClick={goToOpportunityPage}>
      <h3 className="opp-name">{opportunity.name}</h3>
      <div className='bubble-box'>
        <p className='bubble'><strong>Deadline: {new Date(opportunity.created_date).toLocaleDateString()}</strong></p>
      </div>
      <p className="description">{opportunity.description}</p>
    </div>
  );
};
export default OpportunityBox;
