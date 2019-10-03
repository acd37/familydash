import { SET_BUDGET_CATEGORIES } from '../actions/types';

const initialState = {
  budgetCategories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BUDGET_CATEGORIES:
      return {
        ...state,
        budgetCategories: action.payload
      };
    default:
      return state;
  }
}
