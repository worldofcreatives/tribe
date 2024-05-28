import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../redux/profile';

const ManageSubscriptionReturn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshUserData = async () => {
      await dispatch(fetchUserProfile());
      navigate('/subscribe'); // Navigate to profile or any other page after refreshing
    };
    refreshUserData();
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default ManageSubscriptionReturn;
