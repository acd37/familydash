import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions/recipeActions';

const styles = {
  wrapper: {
    width: 800,
    maxWidth: '90%'
  }
};

class AddRecipe extends Component {
  state = {
    name: '',
    description: '',
    ingredients: [''],
    prepTime: '',
    cookTime: '',
    instructions: [''],
    errors: {}
  };

  onSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    const { name, ingredients, prepTime, cookTime, instructions } = this.state;

    if (name.length < 1) {
      errors.name = 'You must give your recipe name.';
      this.setState({ errors });
    } else if (!prepTime) {
      errors.prepTime = 'You must provide a preparation time.';
      this.setState({ errors });
    } else if (!cookTime) {
      errors.cookTime = 'You must provide a cooking time.';
      this.setState({ errors });
    } else {
      const newRecipe = {
        name: this.state.name,
        description: this.state.description,
        ingredients: ingredients,
        prepTime: this.state.prepTime,
        cookTime: this.state.cookTime,
        calorieCount: this.state.calorieCount,
        instructions: instructions
      };

      this.props.createRecipe(newRecipe);

      this.setState({
        name: '',
        description: '',
        ingredients: [''],
        prepTime: '',
        cookTime: '',
        instructions: ['']
      });
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;

    if (e.target.className === 'ingredient') {
      let ingredients = [...this.state.ingredients];

      ingredients[e.target.dataset.id] = e.target.value;

      this.setState({ ingredients });
    } else if (e.target.className === 'instruction') {
      let instructions = [...this.state.instructions];
      instructions[e.target.dataset.id] = e.target.value;

      this.setState({ instructions });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  addIngredient = (e) => {
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, '']
    }));
  };

  removeIngredient = (e) => {
    e.preventDefault();
    let arr = [...this.state.ingredients];
    console.log(arr);
    let index = arr.indexOf(e.target.value);
    console.log(e.target.value);
    console.log(index);

    if (index !== -1) {
      arr.splice(index, 1);
      this.setState({
        ingredients: arr
      });
    }
  };

  removeInstruction = (e) => {
    e.preventDefault();
    let arr = [...this.state.instructions];
    console.log(arr);
    let index = arr.indexOf(e.target.value);
    console.log(e.target.value);
    console.log(index);

    if (index !== -1) {
      arr.splice(index, 1);
      this.setState({
        instructions: arr
      });
    }
  };

  addInstruction = (e) => {
    this.setState((prevState) => ({
      instructions: [...prevState.instructions, '']
    }));
  };

  render() {
    const { errors, ingredients, instructions } = this.state;

    return (
      <div style={styles.wrapper}>
        <h1> Add New Recipe</h1>
        <form onSubmit={this.onSubmit} className='ui form'>
          <h4 className='ui dividing header'>Description</h4>
          <div className={`field ${errors.name ? 'error' : ''}`}>
            <label>{errors.name ? <p>{errors.name}</p> : 'Name'}</label>
            <input
              placeholder='Name'
              name='name'
              type='text'
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div className={`field ${errors.description ? 'error' : ''}`}>
            <label>{errors.description ? <p>{errors.description}</p> : 'Description'}</label>
            <input
              placeholder='Description'
              name='description'
              type='text'
              value={this.state.description}
              onChange={this.onChange}
            />
          </div>
          <div className={`field ${errors.prepTime ? 'error' : ''}`}>
            <label>{errors.prepTime ? <p>{errors.prepTime}</p> : 'Preparation Time (mins)'}</label>
            <input
              placeholder='Preparation Time'
              name='prepTime'
              type='number'
              value={this.state.prepTime}
              onChange={this.onChange}
            />
          </div>

          <div className={`field ${errors.cookTime ? 'error' : ''}`}>
            <label>{errors.cookTime ? <p>{errors.cookTime}</p> : 'Cook Time (mins)'}</label>
            <input
              placeholder='Cook Time'
              name='cookTime'
              type='text'
              value={this.state.cookTime}
              onChange={this.onChange}
            />
          </div>
          <div className={`field ${errors.calorieCount ? 'error' : ''}`}>
            <label>
              {errors.cookTcalorieCountime ? <p>{errors.calorieCount}</p> : 'Calorie Count'}
            </label>
            <input
              placeholder='Calorie Count'
              name='calorieCount'
              type='text'
              value={this.state.calorieCount}
              onChange={this.onChange}
            />
          </div>

          <h4 className='ui dividing header'>Ingredients</h4>

          {ingredients.map((val, index) => {
            let ingredientId = `ingredient-${index}`;

            return (
              <div className={`field ${errors.ingredients ? 'error' : ''}`}>
                <label>
                  {errors.ingredients ? <p>{errors.ingredients}</p> : `Ingredient #${index + 1}`}
                </label>
                <input
                  placeholder='New Ingredient'
                  name={ingredientId}
                  type='text'
                  data-id={index}
                  id={ingredientId}
                  value={ingredients[index]}
                  onChange={this.onChange}
                  className='ingredient'
                  style={{ width: '75%' }}
                />{' '}
                <button
                  value={ingredients[index]}
                  onClick={this.removeIngredient}
                  className='ui button'
                  style={{ padding: '12px', marginLeft: 5 }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <input
            onClick={this.addIngredient}
            type='button'
            className='ui button'
            value='Add Ingredient'
          />

          <h4 className='ui dividing header'>Instructions</h4>

          {instructions.map((val, index) => {
            let instructionId = `instruction-${index}`;

            return (
              <div key={index} className={`field ${errors.instructions ? 'error' : ''}`}>
                <label>
                  {errors.instructions ? <p>{errors.instructions}</p> : `Step #${index + 1}`}
                </label>
                <input
                  placeholder='Instruction'
                  name={instructionId}
                  type='text'
                  id={instructionId}
                  data-id={index}
                  value={instructions[index]}
                  onChange={this.onChange}
                  className='instruction'
                  style={{ width: '75%' }}
                />{' '}
                <button
                  value={instructions[index]}
                  onClick={this.removeInstruction}
                  className='ui button'
                  style={{ padding: '12px', marginLeft: 5 }}
                >
                  Remove
                </button>
              </div>
            );
          })}

          <input
            type='button'
            onClick={this.addInstruction}
            className='ui button'
            value='Add Step'
          />
          <div className='ui divider'></div>

          <input type='submit' className='ui button' value='Submit Recipe' />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { createRecipe }
)(AddRecipe);
