import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/profile';
import './ProfilePage.css'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const { creator, company } = userProfile;

  return (
    <div className="profile-page">
      <h1>Profile Information</h1>
      <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
      {userProfile.type === 'Creator' && creator && (
        <div>
          <h2>Creator Profile</h2>
          <p><strong>Stage Name:</strong> {creator.stage_name}</p>
          <p><strong>Bio:</strong> {creator.bio}</p>
          <img src={creator.profile_pic} alt="Profile" />
          {/* Display other creator-specific information here */}
        </div>
      )}
      {userProfile.type === 'Company' && company && (
        <div>
          <h2>Company Profile</h2>
          <p><strong>Name:</strong> {company.name}</p>
          <p><strong>Bio:</strong> {company.bio}</p>
          <img src={company.logo} alt="Logo" />
          {/* Display other company-specific information here */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
