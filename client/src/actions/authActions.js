import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, LOADING, REMOVE_LOADING } from './types';

// register
export const registerUser = (userData, history) => {
  axios
    .post('/api/user', userData)
    .then((res) => {
      history.push('/login');
    })
    .catch((err) =>
      dispatchEvent({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login - get user token
export const loginUser = (userData) => (dispatch) => {
  dispatch(loading());
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('familydash', token);

      // set auth token to header
      setAuthToken(token);

      // decode token to get user data and set current user
      const decoded = jwtDecode(token);

      // set  current user
      dispatch(setCurrentUser(decoded));
      dispatch(removeLoading());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user  out
export const logoutUser = () => (dispatch) => {
  // remove  from localstorage
  localStorage.removeItem('familydash');

  // remove from auth header
  setAuthToken(false);

  // set current user to {}
  dispatch(setCurrentUser({}));
};

// loading method
export const loading = () => {
  return {
    type: LOADING
  };
};

// removeLoading method
export const removeLoading = () => {
  return {
    type: REMOVE_LOADING
  };
};
