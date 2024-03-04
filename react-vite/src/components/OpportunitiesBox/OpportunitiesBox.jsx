import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteOpportunity } from '../../redux/opportunities';

const OpportunityBox = ({ opportunity }) => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log("🚀 ~ OpportunityBox ~ sessionUser:", sessionUser)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this opportunity?');
    if (confirmDelete) {
      dispatch(deleteOpportunity(opportunity.id));
      navigate(`/opps`);
    }
  };


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
      {sessionUser && sessionUser.type === 'Company' && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default OpportunityBox;


