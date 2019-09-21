import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCalendarMeals, updateRecipe } from '../../actions/recipeActions';

class MealContainer extends Component {
  componentDidMount() {
    this.props.getCalendarMeals();
  }

  render() {
    const { recipes } = this.props;

    return (
      <div>
        {recipes.map((recipe) => (
          <p>
            <Link to={`/dashboard/recipes/recipe/${recipe.id}/`}>{recipe.name}</Link>{' '}
          </p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.calendarRecipes
});

export default connect(
  mapStateToProps,
  { getCalendarMeals, updateRecipe }
)(MealContainer);
