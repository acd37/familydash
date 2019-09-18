import axios from 'axios';

import { GET_ERRORS, SET_TODOS } from './types';

// get todos
export const getTodos = (familyId) => (dispatch) => {
  axios
    .get(`/api/todo/${familyId}`)
    .then((res) =>
      dispatch({
        type: SET_TODOS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_TODOS,
        payload: []
      })
    );
};

// create todo
export const createTodo = (todo) => (dispatch) => {
  axios
    .post('/api/todo', todo)
    .then((res) =>
      dispatch({
        type: SET_TODOS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_TODOS,
        payload: []
      })
    );
};

// create todo
export const deleteTodo = (todoId, familyId) => (dispatch) => {
  axios
    .delete(`/api/todo/${todoId}/${familyId}`)
    .then((res) =>
      dispatch({
        type: SET_TODOS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_TODOS,
        payload: []
      })
    );
};
