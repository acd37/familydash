import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIndividualRecipe, updateRecipe } from '../../actions/recipeActions';
import Tile from '../common/Tile';
import imageGenerator from '../../utils/imageGenerator';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
};

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredients: [''],
      prepTime: '',
      cookTime: '',
      instructions: [''],
      errors: {},
      editing: false
    };
  }

  componentWillMount() {
    this.props.getIndividualRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.recipe);

    if (Object.keys(nextProps.recipe).length !== 0) {
      this.setState({
        name: nextProps.recipe.name,
        description: nextProps.recipe.description,
        ingredients: nextProps.recipe.ingredients,
        prepTime: nextProps.recipe.prepTime,
        cookTime: nextProps.recipe.cookTime,
        instructions: nextProps.recipe.instructions
      });
    }
  }

  handleToggleForm = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing
    }));
  };

  addIngredient = (e) => {
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, '']
    }));
  };

  addInstruction = (e) => {
    this.setState((prevState) => ({
      instructions: [...prevState.instructions, '']
    }));
  };

  removeIngredient = (e) => {
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
      const updatedRecipe = {
        id: this.props.match.params.id,
        name: this.state.name,
        description: this.state.description,
        ingredients: ingredients,
        prepTime: this.state.prepTime,
        cookTime: this.state.cookTime,
        calorieCount: this.state.calorieCount,
        instructions: instructions
      };

      this.props.updateRecipe(updatedRecipe);

      this.setState({
        editing: false
      });
    }
  };

  handleFetchImage = (ingredient) => {
    return imageGenerator(ingredient);
  };

  render() {
    const { errors } = this.state;

    let content = (
      <div>
        <h1>{this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h1>

        <p>
          <strong>Description:</strong> {this.state.description}
        </p>
        <p>
          <strong>Preparation:</strong> {this.state.prepTime} minutes
        </p>
        <p>
          <strong>Cook:</strong> {this.state.cookTime} minutes
        </p>

        <h4 className='ui horizontal divider header'>
          <i className='shopping basket icon'></i>
          Ingredients
        </h4>
        <div className='ui middle aligned list'>
          {this.state.ingredients.map((ingredient) => (
            <div className='item' key={ingredient.id}>
              <img
                className='ui avatar image'
                src={require(`../../assets/images/food/${this.handleFetchImage(ingredient)}.png`)}
                alt='food icon'
              />
              <div className='content'>
                <div className='header'>{ingredient}</div>
              </div>
            </div>
          ))}
        </div>

        <h4 className='ui horizontal divider header'>
          <i className='question icon'></i>
          Instructions
        </h4>
        <ol>
          {this.state.instructions.map((step) => (
            <li style={{ marginBottom: 20 }}>{step}</li>
          ))}
        </ol>
      </div>
    );

    return (
      <div>
        <h1> Recipe </h1>
        <button className='ui button' onClick={this.handleToggleForm}>
          {this.state.editing ? 'Cancel Editing' : 'Update Recipe'}
        </button>
        <div style={styles.wrapper}>
          <div>
            <Tile width={800}>{content}</Tile>
          </div>
          <div>
            {this.state.editing && (
              <Tile width={600}>
                <h1> Update Recipe</h1>
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
                    <label>
                      {errors.description ? <p>{errors.description}</p> : 'Description'}
                    </label>
                    <input
                      placeholder='Description'
                      name='description'
                      type='text'
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className={`field ${errors.prepTime ? 'error' : ''}`}>
                    <label>
                      {errors.prepTime ? <p>{errors.prepTime}</p> : 'Preparation Time (mins)'}
                    </label>
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

                  {this.state.ingredients.map((val, index) => {
                    let ingredientId = `ingredient-${index}`;

                    return (
                      <div className={`field ${errors.ingredients ? 'error' : ''}`}>
                        <label>
                          {errors.ingredients ? (
                            <p>{errors.ingredients}</p>
                          ) : (
                            `Ingredient #${index + 1}`
                          )}
                        </label>
                        <input
                          placeholder='New Ingredient'
                          name={ingredientId}
                          type='text'
                          data-id={index}
                          id={ingredientId}
                          value={this.state.ingredients[index]}
                          onChange={this.onChange}
                          className='ingredient'
                          style={{ width: '75%' }}
                        />{' '}
                        <button
                          value={this.state.ingredients[index]}
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

                  {this.state.instructions.map((val, index) => {
                    let instructionId = `instruction-${index}`;

                    return (
                      <div key={index} className={`field ${errors.instructions ? 'error' : ''}`}>
                        <label>
                          {errors.instructions ? (
                            <p>{errors.instructions}</p>
                          ) : (
                            `Step #${index + 1}`
                          )}
                        </label>
                        <input
                          placeholder='Instruction'
                          name={instructionId}
                          type='text'
                          id={instructionId}
                          data-id={index}
                          value={this.state.instructions[index]}
                          onChange={this.onChange}
                          className='instruction'
                          style={{ width: '75%' }}
                        />{' '}
                        <button
                          value={this.state.instructions[index]}
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
                  <input type='submit' className='ui button' value='Update' />
                </form>
              </Tile>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.recipes.recipe
});

export default connect(
  mapStateToProps,
  { getIndividualRecipe, updateRecipe }
)(Recipe);
