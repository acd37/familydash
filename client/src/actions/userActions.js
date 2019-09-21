import axios from 'axios';

import { SET_USERS } from './types';

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
