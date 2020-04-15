import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCalendarMeals } from '../../actions/recipeActions';
import Button from '@material-ui/core/Button';

const MealContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let content;

    useEffect(() => {
        dispatch(getCalendarMeals());
    }, [dispatch]);

    const recipes = useSelector(state => state.recipes.calendarRecipes);
    console.log('recipes', recipes);

    if (recipes.length >= 1) {
        content = recipes.map(recipe => (
            <div className='item' key={recipe.id}>
                <i className='large utensils middle aligned icon' id={recipe.id} />
                <div className='content'>
                    <Link to={`/dashboard/recipes/recipe/${recipe.id}/`}>{recipe.name}</Link>{' '}
                </div>
            </div>
        ));
    } else {
        content = (
            <div>
                <p>You haven't added any meals yet.</p>
                <Link to='/dashboard/recipes' className='ui button'>
                    Get Started
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Button
                variant='contained'
                color='primary'
                onClick={() => history.push('/dashboard/recipes')}>
                All Recipes
            </Button>

            <div className='ui relaxed divided list'>{content}</div>
        </div>
    );
};

export default MealContainer;
