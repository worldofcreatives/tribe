import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSingleOpportunity, updateOpportunity, updateOpportunityGenresAndTypes } from '../../redux/opportunities';

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
    genres: [],
    types: [],
  });

  useEffect(() => {
    if (!opportunityDetails || opportunityDetails.id !== parseInt(id)) {
      dispatch(fetchSingleOpportunity(id));
    } else {
      setFormData({
        name: opportunityDetails.name,
        description: opportunityDetails.description,
        target_audience: opportunityDetails.target_audience || '',
        budget: opportunityDetails.budget || 0,
        guidelines: opportunityDetails.guidelines || '',
        genres: opportunityDetails.genres.map(genre => genre.id.toString()), // Assuming genres is an array of genre objects
        types: opportunityDetails.types.map(type => type.id.toString()), // Assuming types is an array of type objects
      });
    }
  }, [dispatch, id, opportunityDetails]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value),
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Exclude genres and types from the main opportunity update payload
    const { genres, types, ...rest } = formData;
    dispatch(updateOpportunity(id, rest));

    // Update genres and types separately
    await dispatch(updateOpportunityGenresAndTypes(id, {
      genres: genres.map(Number),
      types: types.map(Number),
    }));

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

      <button className='opp-button' type="submit">Update Opportunity</button>
    </form>
  );
};

export default OpportunityUpdateForm;
