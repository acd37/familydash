import { GET_FAMILY } from '../actions/types';

const initialState = {
  family: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAMILY:
      return {
        ...state,
        family: action.payload
      };
    default:
      return state;
  }
}
