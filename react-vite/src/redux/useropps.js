export const FETCH_USER_OPPORTUNITIES_REQUEST = 'FETCH_USER_OPPORTUNITIES_REQUEST';
export const FETCH_USER_OPPORTUNITIES_SUCCESS = 'FETCH_USER_OPPORTUNITIES_SUCCESS';
export const FETCH_USER_OPPORTUNITIES_FAILURE = 'FETCH_USER_OPPORTUNITIES_FAILURE';

const fetchUserOpportunitiesRequest = () => ({
    type: FETCH_USER_OPPORTUNITIES_REQUEST,
  });

  const fetchUserOpportunitiesSuccess = (opportunities) => ({
    type: FETCH_USER_OPPORTUNITIES_SUCCESS,
    payload: opportunities,
  });

  const fetchUserOpportunitiesFailure = (error) => ({
    type: FETCH_USER_OPPORTUNITIES_FAILURE,
    payload: error,
  });

export const fetchUserOpportunities = () => async (dispatch) => {
  dispatch(fetchUserOpportunitiesRequest());
  try {
    const response = await fetch('/api/opportunities/myopps'); // Adjust this URL to your API endpoint
    if (!response.ok) throw new Error('Failed to fetch opportunities');
    const data = await response.json();
    dispatch(fetchUserOpportunitiesSuccess(data));
  } catch (error) {
    dispatch(fetchUserOpportunitiesFailure(error.toString()));
  }
};

const initialState = {
  loading: false,
  opportunities: [],
  error: '',
};

const userOpportunitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_OPPORTUNITIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_OPPORTUNITIES_SUCCESS:
      return { ...state, loading: false, opportunities: action.payload };
    case FETCH_USER_OPPORTUNITIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userOpportunitiesReducer;
