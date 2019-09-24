import React, { Component } from 'react';
import Tile from '../common/Tile';
import { createRecipe, searchRecipes } from '../../actions/recipeActions';
import { connect } from 'react-redux';

const styles = {
  wrapper: {
    width: 800,
    maxWidth: '90%'
  },
  tileWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    gridColumnGap: 25,
    gridRowGap: 25
  }
};

class SearchRecipe extends Component {
  state = {
    keywords: '',
    recipeCount: '',
    recipes: [],
    errors: {}
  };

  handleRecipeSearch = (e) => {
    e.preventDefault();

    const query = this.state.keywords;

    this.props.searchRecipes(query);
  };

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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <>
        <div style={styles.wrapper}>
          <h1> Search Recipe</h1>

          <form onSubmit={this.handleRecipeSearch} className='ui form'>
            <div className={`field ${errors.name ? 'error' : ''}`}>
              <label>{errors.keywords ? <p>{errors.keywords}</p> : 'Keywords'}</label>
              <input
                placeholder='Keywords'
                name='keywords'
                type='text'
                value={this.state.keywords}
                onChange={this.onChange}
              />
            </div>
            <button type='submit' className={`ui ${this.props.loading ? 'loading' : ''} button`}>
              Search
            </button>
            {this.props.loading ? (
              <p style={{ fontSize: '0.8rem', margin: 0 }}>Please hold...</p>
            ) : (
              ''
            )}
          </form>
        </div>

        
        <h1> Search Results </h1>
        <div style={styles.tileWrapper}>
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

              <button className='ui button' onClick={() => this.handleSaveRecipe(recipe)}>
                {' '}
                Save{' '}
              </button>
            </Tile>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  foundRecipes: state.recipes.foundRecipes,
  loading: state.recipes.loading
});

export default connect(
  mapStateToProps,
  { createRecipe, searchRecipes }
)(SearchRecipe);
