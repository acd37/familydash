import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import { connect } from 'react-redux';

const styles = {
  flexContainer: {
    display: 'grid',
    gridGap: 10,
    justifyContent: 'flex-start',
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

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes
});

export default connect(
  mapStateToProps,
  {}
)(AllRecipes);
