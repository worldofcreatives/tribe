import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOpportunity, updateOpportunityGenresAndTypes } from '../../redux/opportunities';
import { useNavigate } from 'react-router-dom';
import './OpportunityForm.css';

const GENRE_CHOICES = [
  { id: 1, name: "Afro" },
  { id: 2, name: "Country" },
  { id: 3, name: "Dancehall" },
  { id: 4, name: "Disco" },
  { id: 5, name: "Funk" },
  { id: 6, name: "Hip Hop" },
  { id: 7, name: "Latin" },
  { id: 8, name: "Neo Soul" },
  { id: 9, name: "Pop" },
  { id: 10, name: "R&B" },
  { id: 11, name: "Reggae" },
  { id: 12, name: "Rock" },
  { id: 13, name: "Other" },
];

const TYPE_CHOICES = [
  { id: 1, name: "Songwriter" },
  { id: 2, name: "Musician" },
  { id: 3, name: "Producer" },
  { id: 4, name: "Artist" },
];

const OpportunityForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target_audience: '',
    budget: '',
    guidelines: '',
    genres: [],
    types: [],
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("Stopping form submission due to errors.");
      return;
    }

    setLoading(true);
    const opportunityData = new FormData();
    // Append only specific fields relevant to opportunity creation
    opportunityData.append('name', formData.name);
    opportunityData.append('description', formData.description);
    opportunityData.append('target_audience', formData.target_audience);
    opportunityData.append('budget', formData.budget);
    opportunityData.append('guidelines', formData.guidelines);

    try {
      const actionResult = await dispatch(createOpportunity(opportunityData));

      // Check if actionResult contains necessary data (e.g., opportunity ID)
      if (actionResult && actionResult.id) {
        // Now update genres and types for this opportunity
        await dispatch(updateOpportunityGenresAndTypes(actionResult.id, {
          genres: formData.genres,
          types: formData.types,
        }));

        navigate(`/opps/${actionResult.id}`);
      } else {
        // Handle case where opportunity creation doesn't return expected data
        throw new Error("Opportunity created, but no ID returned.");
      }
    } catch (error) {
      console.error('Failed to create opportunity:', error);
      setErrors({ submit: error.message || 'Something went wrong!' });
    } finally {
      setLoading(false);
    }
  };



  return (
    <form className="opp-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Create a New Opportunity</h2>
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

      <div>
        <label>Genres</label>
        {GENRE_CHOICES.map((genre) => (
          <div key={genre.id}>
            <input
              type="checkbox"
              id={`genre-${genre.id}`}
              name="genres"
              value={genre.id}
              checked={formData.genres.includes(genre.id.toString())}
              onChange={handleChange}
            />
            <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
          </div>
        ))}
      </div>

      <div>
        <label>Types</label>
        {TYPE_CHOICES.map((type) => (
          <div key={type.id}>
            <input
              type="checkbox"
              id={`type-${type.id}`}
              name="types"
              value={type.id}
              checked={formData.types.includes(type.id.toString())}
              onChange={handleChange}
            />
            <label htmlFor={`type-${type.id}`}>{type.name}</label>
          </div>
        ))}
      </div>


      {errors.name && <p className="error">{errors.name}</p>}
      {errors.description && <p className="error">{errors.description}</p>}
      {errors.budget && <p className="error">{errors.budget}</p>}

      <button className='opp-button' type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Opportunity'}
      </button>
    </form>
  );
};

export default OpportunityForm;
