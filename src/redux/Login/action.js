// authActions.js
export const loginRequest = (email, password) => ({
  type: 'LOGIN_REQUEST',
  payload: { email, password },
});

export const loginSuccess = (authToken) => ({
  type: 'LOGIN_SUCCESS',
  payload: { authToken },
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: { error },
});
