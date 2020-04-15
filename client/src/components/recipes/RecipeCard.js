import React, { useEffect } from 'react';
import Tile from '../common/Tile';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipe, updateRecipe } from '../../actions/recipeActions';

const RecipeCard = props => {
    const dispatch = useDispatch();
    const { recipe } = props;

    const handleDeleteRecipe = recipe => {
        const confirmDelete = window.confirm(
            "Are you sure you'd like to delete this recipe? This action cannot be undone."
        );

        if (confirmDelete) {
            dispatch(deleteRecipe(recipe.id, recipe.familyId));
        }
    };

    const handleMealPlan = recipe => {
        const newStatus = !recipe.calendar;

        const updatedRecipe = { ...recipe, calendar: newStatus };
        updatedRecipe.ingredients = JSON.parse(updatedRecipe.ingredients);
        updatedRecipe.instructions = JSON.parse(updatedRecipe.instructions);

        dispatch(updateRecipe(updatedRecipe, recipe.familyId));
    };

    return (
        <div>
            <Tile>
                <h3>
                    <Link to={`/dashboard/recipes/recipe/${recipe.id}`}>{recipe.name}</Link>
                </h3>

                <p style={{ marginBottom: 0 }}>
                    Calories: {recipe.calorieCount} | Time: {(recipe.cookTime / 60).toFixed(1)} hrs.
                </p>
                <div className='extra content' style={{ marginTop: 15 }}>
                    {recipe.calendar ? (
                        <button className='ui button' onClick={() => handleMealPlan(recipe)}>
                            Remove from Meal Plan
                        </button>
                    ) : (
                        <button className='ui button' onClick={() => handleMealPlan(recipe)}>
                            Add to Meal Plan
                        </button>
                    )}

                    <span
                        className='right floated star'
                        onClick={() => handleDeleteRecipe(recipe)}
                        style={{ cursor: 'pointer' }}>
                        <i className='trash icon'></i>
                        Delete
                    </span>
                </div>
            </Tile>
        </div>
    );
};

export default RecipeCard;
