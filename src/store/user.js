import axios from 'axios';

function createUserState() {
  return {
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    permissions: [],
    dataFetching: false,
  };
}

function transformUserPayload(data) {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    fullName: `${data.first_name} ${data.lastName}`,
    email: data.email,
    permissions: data.permissions,
  };
}

const actions = {
  getUserDetails: 'GET_USER_DETAILS',
  getUserDetailsSuccess: 'GET_USER_DETAILS_FETCHED',
  getUserDetailsFailed: 'GET_USER_DETAILS_FAILED',
};

const actionHandlers = {
  fetchUserDetails: (userId) => {
    return async (dispatch) => {
      try {
        const data = await axios.get(`main/user/${userId}`);
        dispatch({
          type: actions.getUserDetailsSuccess,
          data: data,
        });
        if (data.error) {
          throw data.error_message;
        }
      } catch (e) {
        dispatch({
          type: actions.getUserDetailsFailed,
          data: e,
        });
      }
    };
  },
};

const userReducer = function (state = createUserState(), action) {
  let newState = {};
  switch (action.type) {
    case actions.getUserDetails:
      newState = {
        ...state,
        dataFetching: true,
      };
      break;
    case actions.getUserDetailsSuccess:
      const {data} = action.payload;
      const userData = transformUserPayload(data);
      newState = {
        ...userData,
        dataFetching: false,
      };
      break;
    case actions.getUserDetailsFailed:
      newState = {
        ...state,
        dataFetching: false,
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export {userReducer, actions, actionHandlers};
