import {
  SET_RECIPE,
  SET_RECIPES,
  SET_FOUND_RECIPES,
  SEARCHING_RECIPES,
  SET_CALENDAR_RECIPES
} from '../actions/types';

const initialState = {
  recipe: {},
  recipes: [],
  foundRecipes: [],
  calendarRecipes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.payload
      };
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case SET_FOUND_RECIPES:
      return {
        ...state,
        loading: false,
        foundRecipes: action.payload
      };
    case SEARCHING_RECIPES:
      return {
        ...state,
        loading: true
      };
    case SET_CALENDAR_RECIPES:
      return {
        ...state,
        calendarRecipes: action.payload
      };
    default:
      return state;
  }
}
