import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllRecipes from '../recipes/AllRecipes';
import AddRecipe from '../recipes/AddRecipe';
import Recipe from '../recipes/Recipe';
import { Route, Link } from 'react-router-dom';
import { getRecipes, createRecipe, deleteRecipe } from '../../actions/recipeActions';

class Recipes extends Component {
  componentDidMount() {
    const { id } = this.props.family.family;

    this.props.getRecipes(id);
  }

  render() {
    const { recipes } = this.props.recipes;

    return (
      <div>
        <Link className='btn btn-primary mr-3' to='/dashboard/recipes/'>
          View All
        </Link>
        <Link className='btn btn-primary mr-3' to='/dashboard/recipes/add'>
          Add New
        </Link>
        {/* <Link className='btn btn-primary' to='/dashboard/recipes/recipe/1'>
          One recipe
        </Link> */}

        <Route
          exact
          path={'/dashboard/recipes/'}
          component={() => <AllRecipes recipes={recipes} />}
        />
        <Route exact path={'/dashboard/recipes/add'} component={AddRecipe} />
        <Route exact path={'/dashboard/recipes/recipe/:id'} component={Recipe} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  family: state.family,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getRecipes, createRecipe, deleteRecipe }
)(Recipes);
