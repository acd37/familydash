import React, { Component } from 'react';
import { createRecipe, searchRecipes } from '../../actions/recipeActions';
import { connect } from 'react-redux';
import SearchResultsContainer from './SearchResultsContainer';

const styles = {
  wrapper: {
    maxWidth: '90%'
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
            <div className={`field ui icon action input ${errors.name ? 'error' : ''}`}>
              <input
                placeholder='Search recipe...'
                name='keywords'
                type='text'
                value={this.state.keywords}
                onChange={this.onChange}
              />
              {this.props.loading && <i class='search icon'></i>}
              <button type='submit' className={`ui ${this.props.loading ? 'loading' : ''} button`}>
                Search
              </button>
            </div>
          </form>

          {this.props.foundRecipes.length > 0 && <SearchResultsContainer />}
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
