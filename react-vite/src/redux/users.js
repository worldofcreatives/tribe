// src/store/users.js
const SET_ALL_USERS = 'users/setAllUsers';
const UPDATE_USER_STATUS = 'users/updateUserStatus';

// Action Creators
const setAllUsers = (users) => ({
  type: SET_ALL_USERS,
  users,
});

const updateUserStatusAction = (userId, status) => ({
  type: UPDATE_USER_STATUS,
  payload: { userId, status },
});

// Thunks

// Fetches all users from the backend
export const fetchAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/all', {
    credentials: 'include',
  });
  if (response.ok) {
    const users = await response.json();
    dispatch(setAllUsers(users));
    return users;
  }
};

// Updates the status of a user
export const updateUserStatus = (userId, status) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/status`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (response.ok) {
    dispatch(updateUserStatusAction(userId, status));
    return { userId, status };
  }
};

// Reducer
const initialState = { users: [] };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return { ...state, users: action.users };
    case UPDATE_USER_STATUS:
      // Find the user and update their status
      const updatedUsers = state.users.map(user =>
        user.id === action.payload.userId ? { ...user, status: action.payload.status } : user
      );
      return { ...state, users: updatedUsers };
    default:
      return state;
  }
};

export default usersReducer;
