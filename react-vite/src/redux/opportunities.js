//*====> Action Types <====
export const FETCH_OPPORTUNITIES_REQUEST = 'opportunities/fetchOpportunitiesRequest';
export const FETCH_OPPORTUNITIES_SUCCESS = 'opportunities/fetchOpportunitiesSuccess';
export const FETCH_OPPORTUNITIES_FAILURE = 'opportunities/fetchOpportunitiesFailure';
export const FETCH_SINGLE_OPPORTUNITY_REQUEST = 'opportunities/fetchSingleOpportunityRequest';
export const FETCH_SINGLE_OPPORTUNITY_SUCCESS = 'opportunities/fetchSingleOpportunitySuccess';
export const FETCH_SINGLE_OPPORTUNITY_FAILURE = 'opportunities/fetchSingleOpportunityFailure';
export const CREATE_OPPORTUNITY_REQUEST = 'opportunities/createOpportunityRequest';
export const CREATE_OPPORTUNITY_SUCCESS = 'opportunities/createOpportunitySuccess';
export const CREATE_OPPORTUNITY_FAILURE = 'opportunities/createOpportunityFailure';
export const UPDATE_OPPORTUNITY_REQUEST = 'opportunities/updateOpportunityRequest';
export const UPDATE_OPPORTUNITY_SUCCESS = 'opportunities/updateOpportunitySuccess';
export const UPDATE_OPPORTUNITY_FAILURE = 'opportunities/updateOpportunityFailure';
export const DELETE_OPPORTUNITY_REQUEST = 'opportunities/deleteOpportunityRequest';
export const DELETE_OPPORTUNITY_SUCCESS = 'opportunities/deleteOpportunitySuccess';
export const DELETE_OPPORTUNITY_FAILURE = 'opportunities/deleteOpportunityFailure';


//*====> Action Creators <====
const fetchOpportunitiesRequest = () => ({
    type: FETCH_OPPORTUNITIES_REQUEST,
  });

const fetchOpportunitiesSuccess = (opportunities) => ({
type: FETCH_OPPORTUNITIES_SUCCESS,
payload: opportunities,
});

const fetchOpportunitiesFailure = (error) => ({
type: FETCH_OPPORTUNITIES_FAILURE,
payload: error,
});

const fetchSingleOpportunityRequest = () => ({
type: FETCH_SINGLE_OPPORTUNITY_REQUEST,
});

const fetchSingleOpportunitySuccess = (opportunity) => ({
type: FETCH_SINGLE_OPPORTUNITY_SUCCESS,
payload: opportunity,
});

const fetchSingleOpportunityFailure = (error) => ({
type: FETCH_SINGLE_OPPORTUNITY_FAILURE,
payload: error,
});

const createOpportunityRequest = () => ({
type: CREATE_OPPORTUNITY_REQUEST,
});

const createOpportunitySuccess = (opportunity) => ({
type: CREATE_OPPORTUNITY_SUCCESS,
payload: opportunity,
});

const createOpportunityFailure = (error) => ({
type: CREATE_OPPORTUNITY_FAILURE,
payload: error,
});

const updateOpportunityRequest = () => ({
  type: UPDATE_OPPORTUNITY_REQUEST,
});

const updateOpportunitySuccess = (opportunity) => ({
  type: UPDATE_OPPORTUNITY_SUCCESS,
  payload: opportunity,
});

const updateOpportunityFailure = (error) => ({
  type: UPDATE_OPPORTUNITY_FAILURE,
  payload: error,
});

const deleteOpportunityRequest = () => ({
  type: DELETE_OPPORTUNITY_REQUEST,
});

const deleteOpportunitySuccess = (oppId) => ({
  type: DELETE_OPPORTUNITY_SUCCESS,
  payload: oppId,
});

const deleteOpportunityFailure = (error) => ({
  type: DELETE_OPPORTUNITY_FAILURE,
  payload: error,
});


//*====> Thunks <====

// Fetch all opportunities

export const fetchOpportunities = () => async (dispatch) => {
    dispatch(fetchOpportunitiesRequest());
    try {
      const response = await fetch('/api/opportunities');
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchOpportunitiesSuccess(data));
      } else {
        throw new Error('Failed to fetch opportunities');
      }
    } catch (error) {
      dispatch(fetchOpportunitiesFailure(error.toString()));
    }
  };

// Fetch a single opportunity

export const fetchSingleOpportunity = (opportunityId) => async (dispatch) => {
    dispatch(fetchSingleOpportunityRequest());
    try {
      const response = await fetch(`/api/opportunities/${opportunityId}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchSingleOpportunitySuccess(data));
      } else {
        throw new Error('Failed to fetch single opportunity');
      }
    } catch (error) {
      dispatch(fetchSingleOpportunityFailure(error.toString()));
    }
  };

// Create a new opportunity

export const createOpportunity = (opportunityData) => async (dispatch) => {
  dispatch(createOpportunityRequest());
  try {
    const response = await fetch('/api/opportunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opportunityData),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(createOpportunitySuccess(data));
    } else {
      throw new Error('Failed to create a new opportunity');
    }
  } catch (error) {
    dispatch(createOpportunityFailure(error.toString()));
  }
};

// Update an opportunity

export const updateOpportunity = (oppId, updatedOpportunityData) => async (dispatch) => {
  dispatch(updateOpportunityRequest());
  try {
    const response = await fetch(`/api/opportunities/${oppId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Include additional headers if needed, like authorization tokens
      },
      body: JSON.stringify(updatedOpportunityData),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateOpportunitySuccess(data));
    } else {
      throw new Error('Failed to update the opportunity');
    }
  } catch (error) {
    dispatch(updateOpportunityFailure(error.toString()));
  }
};

// Delete an opportunity

export const deleteOpportunity = (oppId) => async (dispatch) => {
    dispatch(deleteOpportunityRequest());
    try {
      const response = await fetch(`/api/opportunities/${oppId}`, {
        method: 'DELETE',
        // Include headers if needed, like authorization tokens
      });
      if (response.ok) {
        dispatch(deleteOpportunitySuccess(oppId));
      } else {
        throw new Error('Failed to delete the opportunity');
      }
    } catch (error) {
      dispatch(deleteOpportunityFailure(error.toString()));
    }
  };



//*====> Reducers <====
const initialState = {
    loading: false,
    opportunities: [],
    singleOpportunity: null,
    error: '',
  };

const opportunitiesReducer = (state = initialState, action) => {
switch (action.type) {
    case FETCH_OPPORTUNITIES_REQUEST:
    return {
        ...state,
        loading: true,
        error: '',
    };
    case FETCH_OPPORTUNITIES_SUCCESS:
    return {
        ...state,
        loading: false,
        opportunities: action.payload,
        error: '',
    };
    case FETCH_OPPORTUNITIES_FAILURE:
    return {
        ...state,
        loading: false,
        error: action.payload,
        opportunities: [],
    };
    case FETCH_OPPORTUNITIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_OPPORTUNITIES_SUCCESS:
        return {
          ...state,
          loading: false,
          opportunities: action.payload,
        };
      case FETCH_OPPORTUNITIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case FETCH_SINGLE_OPPORTUNITY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SINGLE_OPPORTUNITY_SUCCESS:
        return {
          ...state,
          loading: false,
          singleOpportunity: action.payload,
        };
      case FETCH_SINGLE_OPPORTUNITY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          singleOpportunity: null,
        };
    case CREATE_OPPORTUNITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        opportunities: [...state.opportunities, action.payload],
      };
    case CREATE_OPPORTUNITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_OPPORTUNITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        opportunities: state.opportunities.map((opportunity) =>
          opportunity.id === action.payload.id ? action.payload : opportunity
        ),
      };
    case UPDATE_OPPORTUNITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case DELETE_OPPORTUNITY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_OPPORTUNITY_SUCCESS:
        return {
          ...state,
          loading: false,
          opportunities: state.opportunities.filter(opportunity => opportunity.id !== action.payload),
        };
      case DELETE_OPPORTUNITY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

export default opportunitiesReducer;
