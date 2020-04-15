import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AllRecipes from '../recipes/AllRecipes';
import AddRecipe from '../recipes/AddRecipe';
import SearchRecipe from '../recipes/SearchRecipe';
import Recipe from '../recipes/Recipe';
import { Route, Link } from 'react-router-dom';
import { getRecipes, createRecipe, deleteRecipe } from '../../actions/recipeActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: 30,
            marginRight: theme.spacing(1)
        }
    }
}));

const Recipes = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useSelector(state => state.family.family);

    useEffect(() => {
        dispatch(getRecipes(id));
    });

    return (
        <div>
            <div className={classes.root}>
                <Button onClick={() => history.push('/dashboard/recipes/')}>View All</Button>
                <Button onClick={() => history.push('/dashboard/recipes/add')}>Add New</Button>
                <Button onClick={() => history.push('/dashboard/recipes/search')}>Search</Button>
            </div>

            <Route exact path={'/dashboard/recipes/'} component={() => <AllRecipes />} />
            <Route exact path={'/dashboard/recipes/add'} component={AddRecipe} />
            <Route exact path={'/dashboard/recipes/recipe/:id'} component={Recipe} />
            <Route exact path={'/dashboard/recipes/search'} component={SearchRecipe} />
        </div>
    );
};

export default Recipes;
