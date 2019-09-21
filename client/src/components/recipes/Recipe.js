import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIndividualRecipe } from '../../actions/recipeActions';
import Tile from '../common/Tile';

class Recipe extends Component {
  state = {
    name: ''
  };

  componentDidMount() {
    this.props.getIndividualRecipe(this.props.match.params.id);
  }

  render() {
    const { recipe } = this.props;

    let content;

    if (Object.keys(recipe).length > 0) {
      content = (
        <div>
          <h3>{recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}</h3>
          <p>
            <strong>Description:</strong> {recipe.description}
          </p>
          <p>
            <strong>Preparation:</strong> {recipe.prepTime} minutes
          </p>
          <p>
            <strong>Cook:</strong> {recipe.cookTime} minutes
          </p>

          <h4> Ingredients </h4>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>

          <h4> Instructions </h4>
          <ul>
            {recipe.instructions.map((step) => (
              <li>{step}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      content = (
        <div className='ui placeholder'>
          <div className='paragraph'>
            <div className='line'></div>
            <div className='line'></div>
          </div>
          <div className='paragraph'>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1> Recipe </h1>
        <Tile>{content}</Tile>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.recipes.recipe
});

export default connect(
  mapStateToProps,
  { getIndividualRecipe }
)(Recipe);
