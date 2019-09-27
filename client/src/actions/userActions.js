import axios from 'axios';

import { SET_USERS, SET_USER } from './types';

// update user
export const updateUser = (updatedUser) => (dispatch) => {
  const req = {
    url: '/api/user',
    method: 'PUT',
    data: updatedUser
  };

  axios(req)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// get current profile
export const getCurrentUser = () => (dispatch) => {
  axios
    .get('/api/user')
    .then((res) =>
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_USER,
        payload: {}
      })
    );
};

// get users
export const getUsers = () => (dispatch) => {
  axios
    .get('/api/user/all')
    .then((res) =>
      dispatch({
        type: SET_USERS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_USERS,
        payload: []
      })
    );
};
