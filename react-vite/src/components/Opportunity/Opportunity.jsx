import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteOpportunity } from '../../redux/opportunities';
import './Opportunity.css';

const Opportunity = ({ opportunity }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this opportunity?');
    if (confirmDelete) {
      dispatch(deleteOpportunity(opportunity.id));
      navigate(`/opps`);
    }
  };

  const handleViewSubs = () => {
    navigate(`/opps/${opportunity.id}/subs`);
  }

  const handleUpdate = () => {
    navigate(`/opps/${opportunity.id}/update`);
  }

  return (
    <div>
      {opportunity ? (
        <div>
          <h2>{opportunity.name}</h2>
         {/* Ensure buttons show only if the session user's id matches the opportunity's user_id */}
         {sessionUser && sessionUser.id === opportunity.user_id && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleViewSubs}>View Submissions</button>
            </>
          )}
          <p><strong>Budget:</strong> ${opportunity.budget}</p>
          <p><strong>Created Date:</strong> {new Date(opportunity.created_date).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {opportunity.description}</p>
          <p><strong>Genres:</strong> {opportunity.genres.length > 0 ? opportunity.genres.map(genre => genre.name).join(', ') : 'Any'}</p>
          <p><strong>Types:</strong> {opportunity.types.length > 0 ? opportunity.types.map(type => type.name).join(', ') : 'Any'}</p>
          <p><strong>Guidelines:</strong> {opportunity.guidelines}</p>
          <p><strong>Target Audience:</strong> {opportunity.target_audience}</p>
          <p><strong>Updated Date:</strong> {new Date(opportunity.updated_date).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Opportunity not found.</p>
      )}
    </div>
  );
};

export default Opportunity;
