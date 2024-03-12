import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateProfile } from '../../redux/profile';
import "./ProfileForm.css";
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    bio: '',
    profile_pic: null,
    logo: null,
    first_name: '',
    last_name: '',
    stage_name: '',
    phone: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postal_code: '',
    portfolio_url: '',
    previous_projects: '',
    instagram: '',
    twitter: '',
    facebook: '',
    youtube: '',
    other_social_media: '',
    reference_name: '',
    reference_email: '',
    reference_phone: '',
    reference_relationship: '',
    genres: [],
    types: [],
  });

  const [allGenres, setAllGenres] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {


    if (!userProfile) {
      dispatch(fetchUserProfile());
    } else {
      setProfileData({
        bio: userProfile?.creator?.bio || '',
        first_name: userProfile?.creator?.first_name || '',
        last_name: userProfile?.creator?.last_name || '',
        stage_name: userProfile?.creator?.stage_name || '',
        phone: userProfile?.creator?.phone || '',
        address_1: userProfile?.creator?.address_1 || '',
        address_2: userProfile?.creator?.address_2 || '',
        city: userProfile?.creator?.city || '',
        state: userProfile?.creator?.state || '',
        postal_code: userProfile?.creator?.postal_code || '',
        portfolio_url: userProfile?.creator?.portfolio_url || '',
        previous_projects: userProfile?.creator?.previous_projects || '',
        instagram: userProfile?.creator?.instagram || '',
        twitter: userProfile?.creator?.twitter || '',
        facebook: userProfile?.creator?.facebook || '',
        youtube: userProfile?.creator?.youtube || '',
        other_social_media: userProfile?.creator?.other_social_media || '',
        reference_name: userProfile?.creator?.reference_name || '',
        reference_email: userProfile?.creator?.reference_email || '',
        reference_phone: userProfile?.creator?.reference_phone || '',
        reference_relationship: userProfile?.creator?.reference_relationship || '',
        types: userProfile.creator.types.map(t => t.id),
        genres: userProfile.creator.genres.map(g => g.id),
          // Set other fields based on the fetched user profile
      });

          // Fetch all available genres and types
      Promise.all([
        fetch('/api/filter/genres').then(response => response.json()),
        fetch('/api/filter/types').then(response => response.json())
      ]).then(([genresData, typesData]) => {
        setAllGenres(genresData);
        setAllTypes(typesData);
      });
    }

  // Fetch genres
  fetch('/api/filter/genres')
    .then(response => response.json())
    .then(data => setAllGenres(data));

  // Fetch types
  fetch('/api/filter/types')
    .then(response => response.json())
    .then(data => setAllTypes(data));


  }, [dispatch, userProfile]);

  const handleGenreChange = (e) => {
    const value = parseInt(e.target.value);
    setProfileData(prev => ({
        ...prev,
        genres: e.target.checked
            ? [...(prev.genres || []), value] // Use empty array as fallback
            : (prev.genres || []).filter(id => id !== value) // Use empty array as fallback
    }));
};

const handleTypeChange = (e) => {
    const value = parseInt(e.target.value);
    setProfileData(prev => ({
        ...prev,
        types: e.target.checked
            ? [...(prev.types || []), value] // Use empty array as fallback
            : (prev.types || []).filter(id => id !== value) // Use empty array as fallback
    }));
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(profileData).forEach(key => {
        if (!Array.isArray(profileData[key])) {
            formData.append(key, profileData[key]);
        }
    });

    // Safely iterate over genres and types with fallback to empty array
    profileData.genres?.forEach(genre => formData.append('genres', genre)) || [];
    profileData.types?.forEach(type => formData.append('types', type)) || [];

    try {
        await dispatch(updateProfile(formData));
        navigate('/profile');
    } catch (error) {
        console.error("Error submitting profile form: ", error);
    }
};

if (!userProfile) {
  return <div>Loading...</div>;
}

console.log("🚀 allGenres: ", allGenres);
console.log("🚀 profileData: ", profileData);


  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {/* Conditionally render inputs based on user type */}
      {userProfile.type === 'Creator' && (
        <>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={profileData.first_name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={profileData.last_name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="stage_name">Stage Name:</label>
            <input type="text" id="stage_name" name="stage_name" value={profileData.stage_name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="profile_pic">Profile Picture:</label>
            <input type="file" id="profile_pic" name="profile_pic" onChange={handleFileChange} accept="image/*" />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address_1">Address 1:</label>
            <input type="text" id="address_1" name="address_1" value={profileData.address_1} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address_2">Address 2 (optional):</label>
            <input type="text" id="address_2" name="address_2" value={profileData.address_2} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" value={profileData.city} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input type="text" id="state" name="state" value={profileData.state} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="postal_code">Postal Code:</label>
            <input type="text" id="postal_code" name="postal_code" value={profileData.postal_code} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="portfolio_url">Portfolio URL:</label>
            <input type="text" id="portfolio_url" name="portfolio_url" value={profileData.portfolio_url} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="previous_projects">Previous Projects:</label>
            <textarea id="previous_projects" name="previous_projects" value={profileData.previous_projects} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="instagram">Instagram:</label>
            <input type="text" id="instagram" name="instagram" value={profileData.instagram} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="twitter">Twitter:</label>
            <input type="text" id="twitter" name="twitter" value={profileData.twitter} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="facebook">Facebook:</label>
            <input type="text" id="facebook" name="facebook" value={profileData.facebook} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="youtube">YouTube:</label>
            <input type="text" id="youtube" name="youtube" value={profileData.youtube} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="other_social_media">Other Social Media:</label>
            <textarea id="other_social_media" name="other_social_media" value={profileData.other_social_media} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="reference_name">Reference Name:</label>
            <input type="text" id="reference_name" name="reference_name" value={profileData.reference_name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="reference_email">Reference Email:</label>
            <input type="email" id="reference_email" name="reference_email" value={profileData.reference_email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="reference_phone">Reference Phone:</label>
            <input type="text" id="reference_phone" name="reference_phone" value={profileData.reference_phone} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="reference_relationship">Reference Relationship:</label>
            <input type="text" id="reference_relationship" name="reference_relationship" value={profileData.reference_relationship} onChange={handleChange} />
          </div>
        </>
      )}
      {userProfile.type === 'Company' && (
        <div>
          <label htmlFor="logo">Company Logo:</label>
          <input type="file" id="logo" name="logo" onChange={handleFileChange} accept="image/*" />
        </div>
      )}

<div>
  <label>Genres:</label>
  <div>
    {allGenres.map((genre) => (
      <div key={genre.id}>
        <input
          type="checkbox"
          id={`genre-${genre.id}`}
          name="genres"
          value={genre.id}
          checked={profileData.genres?.includes(genre.id) || false}
          onChange={handleGenreChange}
        />
        <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
      </div>
    ))}
  </div>
</div>

<div>
  <label>Types:</label>
  <div>
    {allTypes.map((type) => (
      <div key={type.id}>
        <input
          type="checkbox"
          id={`type-${type.id}`}
          name="types"
          value={type.id}
          checked={profileData.types?.includes(type.id) || false}
          onChange={handleTypeChange}
        />
        <label htmlFor={`type-${type.id}`}>{type.name}</label>
      </div>
    ))}
  </div>
</div>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
