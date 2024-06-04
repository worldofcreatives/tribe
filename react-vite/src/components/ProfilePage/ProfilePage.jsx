import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/profile';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import SubscriptionComponent from '../SubscriptionComponent/SubscriptionComponent';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const defaultProfilePic = 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/665e8d5f51c4aab200bca30f_profilepic.jpeg'; // Link to default profile image

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const { creator, company } = userProfile;

  return (
    <div className="profile-page">
      {userProfile.type === 'Creator' && creator && (
        <>
          <div className="header-section">
          <img
              src={creator.profile_pic || defaultProfilePic}
              alt="Profile"
              className="profile-pic"
            />
              <div className="header-info">
              <h2>{creator.stage_name}</h2>
              <p><strong>Status:</strong> {user.status}</p>
              <p>{creator.bio}</p>
              <div className="buttons-list">
                <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
                <button onClick={() => navigate('/profile/update')}>Update Genre or Type</button>
              </div>
            </div>
          </div>


          {(user.status === 'Pre-Apply') ? (
        <>
          <div className='card'>
            <h1>You need to apply to 7PACKS to apply to opportunities:</h1>
            <button onClick={() => navigate('/apply')}>Apply to 7Packs for Free</button>
          </div>
        </>
      ) : (
        <>
        </>
      )}

          {(user.status === 'Premium Monthly' || user.status === 'Premium Annual' || user.status === 'Accepted') ? (
        <SubscriptionComponent />
      ) : (
        <>
        </>
      )}
          <div className="profile-info">
            <div className="card">
              <h2>Contact Information</h2>
              <div className="info-grid">
                <p><strong>First Name:</strong> {creator.first_name}</p>
                <p><strong>Last Name:</strong> {creator.last_name}</p>
                <p><strong>Phone:</strong> {creator.phone}</p>
                <p><strong>Address:</strong> {`${creator.address_1} ${creator.address_2 || ''}, ${creator.city}, ${creator.state} ${creator.postal_code}`}</p>
                <p><strong>Portfolio URL:</strong> <a href={creator.portfolio_url} target="_blank" rel="noopener noreferrer">{creator.portfolio_url}</a></p>
                <p><strong>Previous Projects:</strong> {creator.previous_projects}</p>
                <p><strong>Instagram:</strong> <a href={`https://instagram.com/${creator.instagram}`} target="_blank" rel="noopener noreferrer">{creator.instagram}</a></p>
                <p><strong>Twitter:</strong> <a href={`https://twitter.com/${creator.twitter}`} target="_blank" rel="noopener noreferrer">{creator.twitter}</a></p>
                <p><strong>Facebook:</strong> <a href={creator.facebook} target="_blank" rel="noopener noreferrer">{creator.facebook}</a></p>
                <p><strong>YouTube:</strong> <a href={creator.youtube} target="_blank" rel="noopener noreferrer">{creator.youtube}</a></p>
                <p><strong>Other Social Media:</strong> {creator.other_social_media}</p>
                <p><strong>Reference Name:</strong> {creator.reference_name}</p>
                <p><strong>Reference Email:</strong> {creator.reference_email}</p>
                <p><strong>Reference Phone:</strong> {creator.reference_phone}</p>
                <p><strong>Reference Relationship:</strong> {creator.reference_relationship}</p>
              </div>

              <div className="genres-types">
                <div>
                  <strong>Genres:</strong>
                  {creator.genres && creator.genres.length > 0 ? (
                    <ul>
                      {creator.genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No genres listed.</p>
                  )}
                </div>

                <div>
                  <strong>Types:</strong>
                  {creator.types && creator.types.length > 0 ? (
                    <ul>
                      {creator.types.map((type) => (
                        <li key={type.id}>{type.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No types listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {userProfile.type === 'Company' && company && (
        <>
          <div className="header-section">
            {company.logo && <img src={company.logo} alt="Logo" className="profile-pic" />}
            <div className="header-info">
              <h2>{company.name}</h2>
              <p>{company.bio}</p>
              <div className="buttons-list">
                <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
                <button onClick={() => navigate('/profile/update')}>Update Genre or Type</button>
              </div>
            </div>
          </div>
          <div className="profile-info">
            <div className="card">
              <h2>Company Information</h2>
              <div>
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Bio:</strong> {company.bio}</p>
                {/* Display other company-specific information here */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile } from '../../redux/profile';
// import './ProfilePage.css';
// import { useNavigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const dispatch = useDispatch();
//   const userProfile = useSelector((state) => state.profile.userProfile);
//   const user = useSelector((state) => state.session.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchUserProfile());
//   }, [dispatch]);

//   if (!userProfile) {
//     return <div>Loading...</div>;
//   }

//   const { creator, company } = userProfile;

//   return (
//     <div className="profile-page">
//       <h1>Profile Information</h1>
//       <div className='buttons-list'>
//       <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
//       <button onClick={() => navigate('/profile/update')}>Update Genre or Type</button>
//       </div>
//       {userProfile.type === 'Creator' && creator && (
//         <div className='profile-info'>
//           <h2>Creator Profile</h2>
//           {creator.profile_pic && <img src={creator.profile_pic} alt="Profile" className='profile-pic'/>}
//           <p><strong>Status:</strong> {user.status}</p>
//           <p><strong>Stage Name:</strong> {creator.stage_name}</p>
//           <p><strong>Bio:</strong> {creator.bio}</p>
//           <p><strong>First Name:</strong> {creator.first_name}</p>
//           <p><strong>Last Name:</strong> {creator.last_name}</p>
//           <p><strong>Phone:</strong> {creator.phone}</p>
//           <p><strong>Address:</strong> {`${creator.address_1} ${creator.address_2 || ''}, ${creator.city}, ${creator.state} ${creator.postal_code}`}</p>
//           <p><strong>Portfolio URL:</strong> <a href={creator.portfolio_url}>{creator.portfolio_url}</a></p>
//           <p><strong>Previous Projects:</strong> {creator.previous_projects}</p>
//           <p><strong>Instagram:</strong> <a href={`https://instagram.com/${creator.instagram}`}>{creator.instagram}</a></p>
//           <p><strong>Twitter:</strong> <a href={`https://twitter.com/${creator.twitter}`}>{creator.twitter}</a></p>
//           <p><strong>Facebook:</strong> <a href={creator.facebook}>{creator.facebook}</a></p>
//           <p><strong>YouTube:</strong> <a href={creator.youtube}>{creator.youtube}</a></p>
//           <p><strong>Other Social Media:</strong> {creator.other_social_media}</p>
//           <p><strong>Reference Name:</strong> {creator.reference_name}</p>
//           <p><strong>Reference Email:</strong> {creator.reference_email}</p>
//           <p><strong>Reference Phone:</strong> {creator.reference_phone}</p>
//           <p><strong>Reference Relationship:</strong> {creator.reference_relationship}</p>
//           {/* Display Genres */}
//           <div>
//             <strong>Genres:</strong>
//             {creator.genres && creator.genres.length > 0 ? (
//               <ul>
//                 {creator.genres.map((genre) => (
//                   <li key={genre.id}>{genre.name}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No genres listed.</p>
//             )}
//           </div>
//           {/* Display Types */}
//           <div>
//             <strong>Types:</strong>
//             {creator.types && creator.types.length > 0 ? (
//               <ul>
//                 {creator.types.map((type) => (
//                   <li key={type.id}>{type.name}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No types listed.</p>
//             )}
//           </div>
//         </div>
//       )}
//       {userProfile.type === 'Company' && company && (
//         <div className='profile-info'>
//           <h2>Company Profile</h2>
//           {company.logo && <img src={company.logo} alt="Logo" className='profile-pic'/>}
//           <p><strong>Name:</strong> {company.name}</p>
//           <p><strong>Bio:</strong> {company.bio}</p>
//           {/* Display other company-specific information here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
