import { SET_TODOS } from '../actions/types';

const initialState = {
  todos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}
