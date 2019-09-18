import React from 'react';
import Tile from '../common/Tile';

function RecipeCard(props) {
  return (
    <div>
      <Tile>
        <h6>{props.recipe.name}</h6>
        <p className='text-muted small' style={{ marginBottom: 0 }}>
          Calories: {props.recipe.calorieCount} | Time: {(props.recipe.cookTime / 60).toFixed(1)}{' '}
          hrs.
        </p>
      </Tile>
    </div>
  );
}

export default RecipeCard;
