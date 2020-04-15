import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllRecipes from '../recipes/AllRecipes';
import AddRecipe from '../recipes/AddRecipe';
import SearchRecipe from '../recipes/SearchRecipe';
import Recipe from '../recipes/Recipe';
import { Route, Link } from 'react-router-dom';
import { getRecipes, createRecipe, deleteRecipe } from '../../actions/recipeActions';

class Recipes extends Component {
    componentDidMount() {
        const { id } = this.props.family.family;

        this.props.getRecipes(id);
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: 30 }}>
                    <Link className='ui button' to='/dashboard/recipes/'>
                        View All
                    </Link>
                    <Link className='ui button' to='/dashboard/recipes/add'>
                        Add New
                    </Link>
                    <Link className='ui button' to='/dashboard/recipes/search'>
                        Search
                    </Link>
                </div>

                <Route exact path={'/dashboard/recipes/'} component={() => <AllRecipes />} />
                <Route exact path={'/dashboard/recipes/add'} component={AddRecipe} />
                <Route exact path={'/dashboard/recipes/recipe/:id'} component={Recipe} />
                <Route exact path={'/dashboard/recipes/search'} component={SearchRecipe} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    family: state.family,
    recipes: state.recipes
});

export default connect(mapStateToProps, { getRecipes, createRecipe, deleteRecipe })(Recipes);
