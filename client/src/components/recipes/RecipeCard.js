import React, { Component } from 'react';
import Tile from '../common/Tile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe, updateRecipe } from '../../actions/recipeActions';

class RecipeCard extends Component {
  handleDeleteRecipe = (recipe) => {
    const confirmDelete = window.confirm(
      "Are you sure you'd like to delete this recipe? This action cannot be undone."
    );

    if (confirmDelete) {
      this.props.deleteRecipe(recipe.id, recipe.familyId);
    }
  };

  handleMealPlan = (recipe) => {
    const newStatus = !recipe.calendar;

    const updatedRecipe = { ...recipe, calendar: newStatus };

    this.props.updateRecipe(updatedRecipe, recipe.familyId);
  };

  render() {
    const { recipe } = this.props;

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
              <button className='ui button' onClick={() => this.handleMealPlan(recipe)}>
                Remove from Meal Plan
              </button>
            ) : (
              <button className='ui button' onClick={() => this.handleMealPlan(recipe)}>
                Add to Meal Plan
              </button>
            )}

            <span
              className='right floated star'
              onClick={() => this.handleDeleteRecipe(recipe)}
              style={{ cursor: 'pointer' }}
            >
              <i className='trash icon'></i>
              Delete
            </span>
          </div>
        </Tile>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteRecipe, updateRecipe }
)(RecipeCard);
