import axios from 'axios';

import {
  SET_RECIPE,
  SET_RECIPES,
  SET_FOUND_RECIPES,
  SEARCHING_RECIPES,
  SET_CALENDAR_RECIPES
} from './types';

// remove recipe from meal plan

// get individual recipe by id
export const getIndividualRecipe = (id) => (dispatch) => {
  axios
    .get(`/api/recipe/individual/${id}`)
    .then((res) =>
      dispatch({
        type: SET_RECIPE,
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

// search recipe api
export const searchRecipes = (query) => (dispatch) => {
  dispatch(loading());

  const appKey = '0d7c357a031f21e3587e1a801d5b7d01';
  const appId = '052913be';

  axios
    .get(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`)
    .then((res) => {
      dispatch({
        type: SET_FOUND_RECIPES,
        payload: res.data.hits
      });
    })
    .catch((err) => console.log(err));
};

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

// delete recipe
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

// update recipe
export const updateRecipe = (recipe, familyId) => (dispatch) => {
  axios
    .put(`/api/recipe/${familyId}/${recipe.id}/`, recipe)
    .then((res) => {
      dispatch({
        type: SET_RECIPES,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_RECIPES,
        payload: []
      })
    );
};

//get all calendar meals
export const getCalendarMeals = () => (dispatch) => {
  axios
    .get(`/api/recipe/meals/calendar`)
    .then((res) => {
      dispatch({
        type: SET_CALENDAR_RECIPES,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CALENDAR_RECIPES,
        payload: []
      });
    });
};
// loading method
export const loading = () => {
  return {
    type: SEARCHING_RECIPES
  };
};
