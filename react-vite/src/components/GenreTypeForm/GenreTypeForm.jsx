import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGenresAndTypes, fetchUserProfile } from '../../redux/profile'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

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
  // Add other genres with their corresponding IDs
];

const TYPE_CHOICES = [
  { id: 1, name: "Songwriter" },
  { id: 2, name: "Musician" },
  { id: 3, name: "Producer" },
  { id: 4, name: "Artist" },
  // Add other types with their corresponding IDs
];

const GenreTypeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); // Track if initialization is done


  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchUserProfile()).then(() => {
        if (userProfile && userProfile.creator) {
          const genreIds = userProfile.creator.genres.map(genre => genre.id);
          const typeIds = userProfile.creator.types.map(type => type.id);
          setSelectedGenres(genreIds);
          setSelectedTypes(typeIds);
        }
        setIsInitialized(true); // Prevent further executions
      });
    }
  }, [dispatch, isInitialized, userProfile]);

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    const genreId = parseInt(value, 10);
    setSelectedGenres(prev =>
      checked ? [...prev, genreId] : prev.filter(id => id !== genreId)
    );
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    const typeId = parseInt(value, 10);
    setSelectedTypes(prev =>
      checked ? [...prev, typeId] : prev.filter(id => id !== typeId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateGenresAndTypes({
      genres: selectedGenres,
      types: selectedTypes
    }));
    // Add navigation or feedback logic as needed
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choose Your Genres:</legend>
        {GENRE_CHOICES.map(genre => (
          <div key={genre.id}>
            <input
              type="checkbox"
              id={`genre-${genre.id}`}
              name="genres"
              value={genre.id} // Use genre ID as value
              checked={selectedGenres.includes(genre.id)}
              onChange={handleGenreChange}
            />
            <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
          </div>
        ))}

      </fieldset>

      <fieldset>
        <legend>Choose Your Types:</legend>
        {TYPE_CHOICES.map(type => (
          <div key={type.id}>
            <input
              type="checkbox"
              id={`type-${type.id}`}
              name="types"
              value={type.id} // Use type ID as value
              checked={selectedTypes.includes(type.id)}
              onChange={handleTypeChange}
            />
            <label htmlFor={`type-${type.id}`}>{type.name}</label>
          </div>
        ))}
      </fieldset>

      <button type="submit">Update Preferences</button>
    </form>
  );
};

export default GenreTypeForm;
