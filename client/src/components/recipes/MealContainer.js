import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCalendarMeals, updateRecipe } from '../../actions/recipeActions';

class MealContainer extends Component {
  componentDidMount() {
    this.props.getCalendarMeals();
  }

  viewAllRecipes = () => {
    this.props.history.push('/recipes');
  };

  render() {
    const { recipes } = this.props;

    let content;

    if (recipes.length >= 1) {
      content = recipes.map((recipe) => (
        <div class='item' key={recipe.id}>
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
        <Link className='ui button' to='/dashboard/recipes'>
          All Recipes
        </Link>

        <div className='ui relaxed divided list'>{content}</div>
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
