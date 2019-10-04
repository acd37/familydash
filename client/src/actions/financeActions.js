import axios from 'axios';

import { SET_BUDGET_CATEGORIES } from './types';

// get dates
export const getBudgetCategories = () => (dispatch) => {
  axios
    .get(`/api/finance/categories/`)
    .then((res) =>
      dispatch({
        type: SET_BUDGET_CATEGORIES,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_BUDGET_CATEGORIES,
        payload: []
      })
    );
};
