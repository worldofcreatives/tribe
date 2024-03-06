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
    budget: '',
    guidelines: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Opportunity Name is required';
    else if (formData.name.length > 255) errors.name = 'Opportunity Name must be less than 255 characters';

    if (!formData.description) errors.description = 'Description is required';
    else if (formData.description.length < 10) errors.description = 'Description must be at least 10 characters long';

    if (formData.budget && isNaN(formData.budget)) errors.budget = 'Budget must be a number';
    else if (formData.budget < 0) errors.budget = 'Budget must be greater than or equal to 0';

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    console.log("Validation Errors:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Stopping form submission due to errors.");
      return;
    }

    setLoading(true);

    const opportunityData = new FormData();
    for (const key in formData) {
      opportunityData.append(key, formData[key]);
    }

    try {
      const actionResult = await dispatch(createOpportunity(opportunityData));

      // Assuming the backend returns the created opportunity with an ID
      const newOpportunity = actionResult;
      navigate(`/opps/${newOpportunity.id}`);
    } catch (error) {
      console.error('Failed to create opportunity:', error);
      setErrors({ submit: error.message || 'Something went wrong!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Name input */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
             <div>
         <label htmlFor="description">Description</label>
         <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
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

      {errors.name && <p className="error">{errors.name}</p>}
      {errors.description && <p className="error">{errors.description}</p>}
      {errors.budget && <p className="error">{errors.budget}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Opportunity'}
      </button>
    </form>
  );
};

export default OpportunityForm;




// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createOpportunity } from '../../redux/opportunities';
// import { useNavigate } from 'react-router-dom';

// const OpportunityForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
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
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const opportunityData = new FormData();
//     for (const key in formData) {
//       opportunityData.append(key, formData[key]);
//     }

//     try {
//       const actionResult = await dispatch(createOpportunity(opportunityData));

//       const newOpportunity = actionResult;
//       navigate(`/opps/${newOpportunity.id}`);
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to create opportunity:', error);
//       setError(error.message || 'Something went wrong!');
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//        <div>
//          <label htmlFor="name">Name</label>
//          <input
//           id="name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
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
//           value={formData.target_audience}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="budget">Budget</label>
//         <input
//           id="budget"
//           name="budget"
//           type="number"
//           value={formData.budget}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="guidelines">Guidelines</label>
//         <textarea
//           id="guidelines"
//           name="guidelines"
//           value={formData.guidelines}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" disabled={loading}>
//         {loading ? 'Creating...' : 'Create Opportunity'}
//       </button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// };

// export default OpportunityForm;
