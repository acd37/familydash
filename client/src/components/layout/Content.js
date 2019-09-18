import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Tiles from '../tiles/Tiles';
import Recipes from '../pages/Recipes';
import Settings from '../pages/Settings';

const styles = {
  familyName: {
    textTransform: 'uppercase',
    fontWeight: 300,
    fontSize: '1.2rem'
  }
};

class Content extends Component {
  render() {
    const { user } = this.props.auth;
    const { family } = this.props.family;

    return (
      <div>
        <h1> Welcome, {user.firstName}!</h1>
        <h6 style={styles.familyName}>{family.familyName}</h6>

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
