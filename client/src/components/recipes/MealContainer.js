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

    let content;

    if (recipes.length >= 1) {
      content = recipes.map((recipe) => (
        <p key={recipe.id}>
          <Link to={`/dashboard/recipes/recipe/${recipe.id}/`}>{recipe.name}</Link>{' '}
        </p>
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

    return <div>{content}</div>;
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.calendarRecipes
});

export default connect(
  mapStateToProps,
  { getCalendarMeals, updateRecipe }
)(MealContainer);
