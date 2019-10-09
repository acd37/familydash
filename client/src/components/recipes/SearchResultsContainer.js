import React, { Component } from 'react';
import Tile from '../common/Tile';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions/recipeActions';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const styles = {
  tileWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 500px)',
    gridColumnGap: 25,
    gridRowGap: 25
  }
};

class SearchResultsContainer extends Component {
  handleSaveRecipe = (recipe) => {
    // configure ingredients array
    let ingredientsText = [];
    for (let i = 0; i < recipe.recipe.ingredients.length; i++) {
      ingredientsText.push(recipe.recipe.ingredients[i].text);
    }

    const newRecipe = {
      name: recipe.recipe.label,
      ingredients: ingredientsText,
      calorieCount: recipe.recipe.calories,
      instructions: [recipe.recipe.shareAs]
    };

    this.props.createRecipe(newRecipe);
  };

  render() {
    return (
      <div>
        <h1> Search Results </h1>
        <Masonry breakpointCols={breakpointColumnsObj}>
          {this.props.foundRecipes.map((recipe) => (
            <div>
              <Tile>
                <p>
                  <strong>{recipe.recipe.label}</strong>
                </p>
                <p>Calories: {recipe.recipe.calories.toFixed()}</p>
                <ul>
                  {recipe.recipe.ingredients.map((ingredient) => (
                    <li style={{ color: 'rgba(0,0,0,0.3)' }}>{ingredient.text}</li>
                  ))}
                </ul>
                <p></p>

                <a
                  style={{ marginTop: 10 }}
                  className='ui fluid button'
                  href={recipe.recipe.shareAs}
                  target='_blank'
                >
                  View Recipe
                </a>
                <button
                  style={{ marginTop: 10 }}
                  className='ui fluid button'
                  onClick={() => this.handleSaveRecipe(recipe)}
                >
                  Save
                </button>
              </Tile>
            </div>
          ))}
        </Masonry>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foundRecipes: state.recipes.foundRecipes,
  loading: state.recipes.loading
});

export default connect(
  mapStateToProps,
  { createRecipe }
)(SearchResultsContainer);
