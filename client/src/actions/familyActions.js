import axios from 'axios';

import { GET_FAMILY } from './types';

// add finance key to family
export const updateFamily = (data) => (dispatch) => {
  axios
    .post('/api/family/ynabKey', { financeKey: data.apiKey, budgetId: data.budgetId })
    .then((res) => dispatch(getFamily()))
    .catch((err) => console.log(err));
};

// create new family
export const createFamily = (familyName) => (dispatch) => {
  axios
    .post('/api/family', familyName)
    .then((res) => dispatch(getFamily()))
    .catch(
      (err) => console.log(err)
      //   dispatchEvent({
      //     type: GET_ERRORS,
      //     payload: err.response.data
      //   })
    );
};

// join a family
export const joinFamily = (familyCode) => (dispatch) => {
  axios
    .post('/api/family/join', { familyCode })
    .then((res) => dispatch(getFamily()))
    .catch((err) => console.log(err));
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
