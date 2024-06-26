import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../redux/users'; // Adjust the import path according to your project structure
import { thunkUpdateUserStatus } from '../../redux/users';
import WithCompanyGuard from '../WithCompanyGuard/WithCompanyGuard';
import './UserInfo.css';


const UserInfo = () => {
  const { userId } = useParams(); // Get the user ID from URL
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId)); // Fetch user info when component mounts or userId changes
    }
  }, [dispatch, userId]);

  // Select the current user from the Redux store
  const user = useSelector(state => state.users.currentUser);

  useEffect(() => {
    if (user) {
      setCurrentStatus(user.status);
    }
  }, [user]);

  const handleStatusUpdate = (status) => {
    dispatch(thunkUpdateUserStatus(userId, status));
    setCurrentStatus(status); // Update local state immediately
  };

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {currentStatus}</p>

      <button
        onClick={() => handleStatusUpdate('Accepted')}
        className={currentStatus === 'Accepted' ? 'highlighted' : ''}
      >
        Accept
      </button>
      <button
        onClick={() => handleStatusUpdate('Denied')}
        className={currentStatus === 'Denied' ? 'highlighted' : ''}
      >
        Deny
      </button>
      <button
        onClick={() => handleStatusUpdate('Pre-Apply')}
        className={currentStatus === 'Pre-Apply' ? 'highlighted' : ''}
      >
        Pre-Apply
      </button>
      <button
        onClick={() => handleStatusUpdate('Applied')}
        className={currentStatus === 'Applied' ? 'highlighted' : ''}
      >
        Applied
      </button>
      <button
        onClick={() => handleStatusUpdate('Premium Monthly')}
        className={currentStatus === 'Premium Monthly' ? 'highlighted' : ''}
      >
        Premium Monthly
      </button>
      <button
        onClick={() => handleStatusUpdate('Premium Annual')}
        className={currentStatus === 'Premium Annual' ? 'highlighted' : ''}
      >
        Premium Annual
      </button>

      <p><strong>Type:</strong> {user.type}</p>
      {user.creator && (
        <>
          <h3>Creator Information</h3>
          <p><strong>First Name:</strong> {user.creator.first_name}</p>
          <p><strong>Last Name:</strong> {user.creator.last_name}</p>
          <p><strong>Stage Name:</strong> {user.creator.stage_name}</p>
          <p><strong>Bio:</strong> {user.creator.bio}</p>
          <p><strong>Phone:</strong> {user.creator.phone}</p>
          <p><strong>Address:</strong> {user.creator.address}</p>
          <p><strong>Portfolio URL:</strong> {user.creator.portfolio_url}</p>
          <p><strong>Previous Projects:</strong> {user.creator.previous_projects}</p>
          <p><strong>Instagram:</strong> {user.creator.instagram}</p>
          <p><strong>Twitter:</strong> {user.creator.twitter}</p>
          <p><strong>Facebook:</strong> {user.creator.facebook}</p>
          <p><strong>YouTube:</strong> {user.creator.youtube}</p>
          <p><strong>Other Social Media:</strong> {user.creator.other_social_media}</p>
          <p><strong>Reference Name:</strong> {user.creator.reference_name}</p>
          <p><strong>Reference Email:</strong> {user.creator.reference_email}</p>
          <p><strong>Reference Phone:</strong> {user.creator.reference_phone}</p>
          <p><strong>Reference Relationship:</strong> {user.creator.reference_relationship}</p>
          <p><strong>Genres:</strong> {user.creator.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Types:</strong> {user.creator.types.map(type => type.name).join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default WithCompanyGuard(UserInfo); // Wrap the component with the HOC


// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserById } from '../../redux/users'; // Adjust the import path according to your project structure
// import { thunkUpdateUserStatus } from '../../redux/users';
// import WithCompanyGuard from '../WithCompanyGuard/WithCompanyGuard';
// import './UserInfo.css';


// const UserInfo = () => {
//   const { userId } = useParams(); // Get the user ID from URL
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchUserById(userId)); // Fetch user info when component mounts or userId changes
//     }
//   }, [dispatch, userId]);


//   // Select the current user from the Redux store
//   const user = useSelector(state => state.users.currentUser);

//   const handleStatusUpdate = (status) => {
//     dispatch(thunkUpdateUserStatus(userId, status));
//   };

//   if (!user) {
//     return <div>Loading user information...</div>;
//   }

//   return (
//     <div>
//       <h2>User Information</h2>
//       <p><strong>Username:</strong> {user.username}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Status:</strong> {user.status}</p>

//       <button onClick={() => handleStatusUpdate('Accepted')}>Accept</button>
//       <button onClick={() => handleStatusUpdate('Denied')}>Deny</button>
//       <button onClick={() => handleStatusUpdate('Pre-Apply')}>Pre-Apply</button>
//       <button onClick={() => handleStatusUpdate('Applied')}>Applied</button>
//       <button onClick={() => handleStatusUpdate('Premium Monthly')}>Premium Monthly</button>
//       <button onClick={() => handleStatusUpdate('Premium Annual')}>Premium Annual</button>



//       <p><strong>Type:</strong> {user.type}</p>
//       {user.creator && (
//         <>
//           <h3>Creator Information</h3>
//           <p><strong>First Name:</strong> {user.creator.first_name}</p>
//           <p><strong>Last Name:</strong> {user.creator.last_name}</p>
//           <p><strong>Stage Name:</strong> {user.creator.stage_name}</p>
//             <p><strong>Bio:</strong> {user.creator.bio}</p>
//             <p><strong>Phone:</strong> {user.creator.phone}</p>
//             <p><strong>Address:</strong> {user.creator.address}</p>
//             <p><strong>Portfolio URL:</strong> {user.creator.portfolio_url}</p>
//             <p><strong>Previous Projects:</strong> {user.creator.previous_projects}</p>
//             <p><strong>Instagram:</strong> {user.creator.instagram}</p>
//             <p><strong>Twitter:</strong> {user.creator.twitter}</p>
//             <p><strong>Facebook:</strong> {user.creator.facebook}</p>
//             <p><strong>YouTube:</strong> {user.creator.youtube}</p>
//             <p><strong>Other Social Media:</strong> {user.creator.other_social_media}</p>
//             <p><strong>Reference Name:</strong> {user.creator.reference_name}</p>
//             <p><strong>Reference Email:</strong> {user.creator.reference_email}</p>
//             <p><strong>Reference Phone:</strong> {user.creator.reference_phone}</p>
//             <p><strong>Reference Relationship:</strong> {user.creator.reference_relationship}</p>
//             <p><strong>Genres:</strong> {user.creator.genres.map(genre => genre.name).join(', ')}</p>
//             <p><strong>Types:</strong> {user.creator.types.map(type => type.name).join(', ')}</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default WithCompanyGuard(UserInfo); // Wrap the component with the HOC
