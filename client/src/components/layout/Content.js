import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Tiles from '../tiles/Tiles';
import Recipes from '../pages/Recipes';
import Settings from '../pages/Settings';
import UserContainer from '../users/UserContainer';

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

    let greeting;
    const date = new Date();

    if (date.getHours() >= 12 && date.getHours() < 18) {
      greeting = "Good afternoon";
    } else if( date.getHours() >= 18 && date.getHours() < 2) {
      greeting = "Good evening"
    } else if( date.getHours() >= 2 && date.getHours() < 12) {
      greeting = "Good morning"
    }

    return (
      <div>
        <h1> {greeting}, {user.firstName}!</h1>
        <h5 style={styles.familyName}>{family.familyName}</h5>

        <Route exact path={'/dashboard'} component={() => <Tiles />} />
        <Route
          path={'/dashboard/recipes'}
          component={() => <Recipes recipes={this.props.recipes} />}
        />
        <Route exact path={'/dashboard/settings'} component={() => <Settings user={user} />} />
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
