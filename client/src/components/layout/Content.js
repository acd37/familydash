import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Tiles from './Tiles';
import Recipes from '../pages/Recipes';
import Settings from '../pages/Settings';

class Content extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>

        <Route exact path={'/dashboard'} component={() => <Tiles />} />
        <Route
          path={'/dashboard/recipes'}
          component={() => <Recipes recipes={this.props.recipes} />}
        />
        <Route exact path={'/dashboard/settings'} component={() => <Settings />} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  family: state.family
});

export default connect(
  mapStateToProps,
  {}
)(Content);
