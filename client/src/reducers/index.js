import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import familyReducer from './familyReducer';
import todoReducer from './todoReducer';
import recipeReducer from './recipeReducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import datesReducer from './datesReducer';
import financeReducer from './financeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  family: familyReducer,
  todos: todoReducer,
  recipes: recipeReducer,
  users: userReducer,
  loading: loadingReducer,
  dates: datesReducer,
  finance: financeReducer
});
