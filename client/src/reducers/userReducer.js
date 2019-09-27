import { SET_USERS, SET_USER } from '../actions/types';

const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
