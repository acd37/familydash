import React, { Component } from 'react';
import RecipeCard from './RecipeCard';

const styles = {
  flexContainer: {
    display: 'grid',
    gridGap: 10,
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, auto))'
  }
};

class AllRecipes extends Component {
  render() {
    return (
      <div>
        <h1> All Recipes </h1>

        <div style={styles.flexContainer}>
          {this.props.recipes.map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
        </div>
      </div>
    );
  }
}

export default AllRecipes;
