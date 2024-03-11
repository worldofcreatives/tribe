// src/store/profile.js
const SET_USER_PROFILE = 'profile/setUserProfile';
const UPDATE_USER_PROFILE = 'profile/updateUserProfile';

// Action Creators
const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

const updateUserProfile = (profile) => ({
  type: UPDATE_USER_PROFILE,
  profile,
});

// Thunks

// Fetches the user profile from the backend
export const fetchUserProfile = () => async (dispatch) => {
  const response = await fetch('/api/profiles/');
  if (response.ok) {
    const data = await response.json();
    dispatch(setUserProfile(data));
    return data;
  }
};

// Updates the user profile on the backend
export const updateProfile = (formData) => async (dispatch) => {
  const response = await fetch('/api/profiles/', {
    method: 'PUT',
    body: formData, // Directly use formData here without JSON.stringify
  });

  if (response.ok) {
    const profile = await response.json();
    dispatch(updateUserProfile(profile));
    return profile;
  }
};



// Reducer
const initialState = { userProfile: null };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return { ...state, userProfile: action.profile };
    case UPDATE_USER_PROFILE:
      return { ...state, userProfile: { ...state.userProfile, ...action.profile } };
    default:
      return state;
  }
};

export default profileReducer;
