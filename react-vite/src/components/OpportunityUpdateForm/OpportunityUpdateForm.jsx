import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSingleOpportunity, updateOpportunity } from '../../redux/opportunities';

const OpportunityUpdateForm = () => {
  const { id } = useParams(); // Get the opportunity id from the URL parameter
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opportunityDetails = useSelector(state => state.opportunities.singleOpportunity);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target_audience: '',
    budget: 0,
    guidelines: '',
  });

  useEffect(() => {
    if (!opportunityDetails || opportunityDetails.id !== parseInt(id)) {
      dispatch(fetchSingleOpportunity(id));
    } else {
      // If opportunity details are available, pre-fill the form
      setFormData({
        name: opportunityDetails.name,
        description: opportunityDetails.description,
        target_audience: opportunityDetails.target_audience || '',
        budget: opportunityDetails.budget || 0,
        guidelines: opportunityDetails.guidelines || '',
      });
    }
  }, [dispatch, id, opportunityDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOpportunity(id, formData));
    navigate(`/opps/${id}`);
  };

  if (!opportunityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <form className='opp-form' onSubmit={handleSubmit} >
       <div>
         <label htmlFor="name">Name</label>
         <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="target_audience">Target Audience</label>
        <input
          id="target_audience"
          name="target_audience"
          type="text"
          value={formData.target_audience}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="budget">Budget</label>
        <input
          id="budget"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="guidelines">Guidelines</label>
        <textarea
          id="guidelines"
          name="guidelines"
          value={formData.guidelines}
          onChange={handleChange}
        />
      </div>
      <button className='opp-button' type="submit">Update Opportunity</button>
    </form>
  );
};

export default OpportunityUpdateForm;
