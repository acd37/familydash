import { SET_DATES } from '../actions/types';

const initialState = {
  dates: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATES:
      return {
        ...state,
        dates: action.payload
      };
    default:
      return state;
  }
}
