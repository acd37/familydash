import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, GET_FAMILY, SET_CURRENT_USER } from './types';

// create new family
export const createFamily = (familyName, history) => (dispatch) => {
  axios
    .post('/api/family', familyName)
    .then((res) => console.log(res.data))
    .catch(
      (err) => console.log(err)
      //   dispatchEvent({
      //     type: GET_ERRORS,
      //     payload: err.response.data
      //   })
    );
};

// get family
export const getFamily = () => (dispatch) => {
  axios
    .get('/api/family')
    .then((res) =>
      dispatch({
        type: GET_FAMILY,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FAMILY,
        payload: {}
      })
    );
};
