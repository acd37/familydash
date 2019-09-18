import axios from 'axios';

import { GET_ERRORS, SET_RECIPES } from './types';

// get recipes
export const getRecipes = (familyId) => (dispatch) => {
  axios
    .get(`/api/recipe/${familyId}`)
    .then((res) =>
      dispatch({
        type: SET_RECIPES,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_RECIPES,
        payload: []
      })
    );
};

// create recipe
export const createRecipe = (recipe) => (dispatch) => {
  axios
    .post('/api/recipe', recipe)
    .then((res) =>
      dispatch({
        type: SET_RECIPES,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_RECIPES,
        payload: []
      })
    );
};

// create recipe
export const deleteRecipe = (recipeId, familyId) => (dispatch) => {
  axios
    .delete(`/api/recipe/${recipeId}/${familyId}`)
    .then((res) =>
      dispatch({
        type: SET_RECIPES,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_RECIPES,
        payload: []
      })
    );
};
