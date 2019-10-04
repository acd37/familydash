import axios from 'axios';

import { SET_TODOS } from './types';

export const updateTodo = (todo) => (dispatch) => {
  let req = {
    url: `/api/todo/${todo.id}`,
    method: 'PUT',
    data: todo
  };

  axios(req)
    .then((res) => {
      dispatch({
        type: SET_TODOS,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

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
    .catch((err) => console.log(err));
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
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_TODOS,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_TODOS,
        payload: []
      })
    );
};
