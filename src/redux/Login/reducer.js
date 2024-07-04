// authReducer.js
const initialState = {
  users: false,
  authToken: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        users: true,
        authToken: action.payload.authToken,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
