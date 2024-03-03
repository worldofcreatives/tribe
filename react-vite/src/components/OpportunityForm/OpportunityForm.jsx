// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createOpportunity } from '../../redux/opportunities';
// import { useNavigate } from 'react-router-dom';

// const OpportunityForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [opportunityData, setOpportunityData] = useState({
//     name: '',
//     description: '',
//     target_audience: '',
//     budget: 0,
//     guidelines: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOpportunityData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const actionResult = await dispatch(createOpportunity(opportunityData));
//       const newOpportunity = actionResult.payload;

//       // Assuming the server response includes the newly created opportunity's ID
//       navigate(`/opps/${newOpportunity.id}`);
//     } catch (error) {
//       console.error('Failed to create opportunity:', error);
//       setError(error.message || 'Something went wrong!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           value={opportunityData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={opportunityData.description}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="target_audience">Target Audience</label>
//         <input
//           id="target_audience"
//           name="target_audience"
//           type="text"
//           value={opportunityData.target_audience}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="budget">Budget</label>
//         <input
//           id="budget"
//           name="budget"
//           type="number"
//           value={opportunityData.budget}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="guidelines">Guidelines</label>
//         <textarea
//           id="guidelines"
//           name="guidelines"
//           value={opportunityData.guidelines}
//           onChange={handleChange}
//         />
//       </div>
//       {error && <p>Error: {error}</p>}
//       <button type="submit" disabled={loading}>
//         {loading ? 'Creating...' : 'Create Opportunity'}
//       </button>
//     </form>
//   );
// };

// export default OpportunityForm;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOpportunity } from '../../redux/opportunities';
import { useNavigate } from 'react-router-dom';

const OpportunityForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target_audience: '',
    budget: 0,
    guidelines: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const opportunityData = new FormData();
    for (const key in formData) {
      opportunityData.append(key, formData[key]);
    }

    try {
      const actionResult = await dispatch(createOpportunity(opportunityData));
      console.log("🚀 ~ handleSubmit ~ actionResult:", actionResult)

      const newOpportunity = actionResult;
      console.log("🚀 ~ handleSubmit ~ newOpportunity:", newOpportunity)
      navigate(`/opps/${newOpportunity.id}`);
      setLoading(false);
    } catch (error) {
      console.error('Failed to create opportunity:', error);
      setError(error.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Opportunity'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default OpportunityForm;
