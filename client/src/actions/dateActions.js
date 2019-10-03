import axios from 'axios';

import { SET_DATES } from './types';

// get dates
export const getDates = (familyId) => (dispatch) => {
  axios
    .get(`/api/date/${familyId}`)
    .then((res) =>
      dispatch({
        type: SET_DATES,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_DATES,
        payload: []
      })
    );
};

// create date
export const createDate = (date) => (dispatch) => {
  axios
    .post('/api/date', date)
    .then((res) =>
      dispatch({
        type: SET_DATES,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_DATES,
        payload: []
      })
    );
};

// create date
export const deleteDate = (dateId, familyId) => (dispatch) => {
  axios
    .delete(`/api/date/${dateId}/${familyId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_DATES,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_DATES,
        payload: []
      })
    );
};
