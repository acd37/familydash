import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import familyReducer from './familyReducer';
import todoReducer from './todoReducer';
import recipeReducer from './recipeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  family: familyReducer,
  todos: todoReducer,
  recipes: recipeReducer
});
