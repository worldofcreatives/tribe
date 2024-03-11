// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile, updateProfile } from '../../redux/profile';
// import "./ProfileForm.css";
// import { useNavigate } from 'react-router-dom';

// const ProfileForm = () => {
//   const dispatch = useDispatch();
//   const userProfile = useSelector((state) => state.profile.userProfile);
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState({
//     bio: '',
//     profile_pic: null,
//     logo: null,
//     // Add other fields as necessary
//   });

//   console.log("🚀 ~ ProfileForm ~ userProfile:", userProfile)

//   useEffect(() => {
//     dispatch(fetchUserProfile()).then((userProfile) => {
//       if (userProfile) {
//         setProfileData({
//           bio: userProfile.creator.bio || '',
//           // Initialize other fields based on the fetched user profile
//         });
//       }
//     });
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setProfileData({
//       ...profileData,
//       [e.target.name]: e.target.files[0],
//     });
//   };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(profileData).forEach((key) => {
//       if (profileData[key] !== null) formData.append(key, profileData[key]);
//     });

//     const result = await dispatch(updateProfile(formData));
//     // Optionally, handle success or error feedback
//     // Redirect to the profile page after successful submission
//     navigate('/profile');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="profile-form">
//       <div>
//         <label htmlFor="bio">Bio:</label>
//         <textarea
//           id="bio"
//           name="bio"
//           value={profileData.bio}
//           onChange={handleChange}
//         />
//       </div>
//       {/* Conditionally render input for profile_pic or logo based on user type */}
//       {userProfile.type === 'Creator' && (
//         <div>
//           <label htmlFor="profile_pic">Profile Picture:</label>
//           <input
//             type="file"
//             id="profile_pic"
//             name="profile_pic"
//             onChange={handleFileChange}
//             accept="image/*"
//           />
//         </div>
//       )}
//       {userProfile.type === 'Company' && (
//         <div>
//           <label htmlFor="logo">Company Logo:</label>
//           <input
//             type="file"
//             id="logo"
//             name="logo"
//             onChange={handleFileChange}
//             accept="image/*"
//           />
//         </div>
//       )}
//       <button type="submit">Update Profile</button>
//     </form>
//   );
// };

// export default ProfileForm;




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateProfile } from '../../redux/profile';
import "./ProfileForm.css";
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile); // Ensure this matches your state structure
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    bio: '',
    profile_pic: null,
    logo: null,
    // Initialize other fields as necessary
  });

  useEffect(() => {
    if (!userProfile) {
      dispatch(fetchUserProfile());
    } else {
      setProfileData({
        bio: userProfile?.creator?.bio || '',
        // Set other fields based on the fetched user profile
      });
    }
  }, [dispatch, userProfile]);

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
      formData.append(key, profileData[key]);
    });

    await dispatch(updateProfile(formData));
    navigate('/profile');
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} />
      </div>
      {/* Conditionally render inputs based on user type */}
      {userProfile.type === 'Creator' && (
        <div>
          <label htmlFor="profile_pic">Profile Picture:</label>
          <input type="file" id="profile_pic" name="profile_pic" onChange={handleFileChange} accept="image/*" />
        </div>
      )}
      {userProfile.type === 'Company' && (
        <div>
          <label htmlFor="logo">Company Logo:</label>
          <input type="file" id="logo" name="logo" onChange={handleFileChange} accept="image/*" />
        </div>
      )}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
