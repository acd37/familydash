import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import { connect } from 'react-redux';

const styles = {
    flexContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    }
};

class AllRecipes extends Component {
    render() {
        let content;

        if (this.props.recipes.length >= 1) {
            content = this.props.recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ));
        } else {
            content = (
                <div>
                    <p> Add some recipes to see them here.</p>
                </div>
            );
        }

        return (
            <div>
                <h1> All Recipes </h1>

                <div style={styles.flexContainer}>{content}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipes: state.recipes.recipes
});

export default connect(mapStateToProps, {})(AllRecipes);
