import React, { Component } from 'react';
import Tile from '../common/Tile';
import Todo from '../Todo';
import UserContainer from '../users/UserContainer';
import MealContainer from '../recipes/MealContainer';
import Location from '../location/Location';

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    gridColumnGap: 25,
    gridRowGap: 25
  }
};

class Tiles extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <Tile
          title='Family Members'
          subTitle='All members of your group are listed here.'
          icon='user'
        >
          <UserContainer />
        </Tile>
        <Tile title='Tasks' subTitle='Get this stuff done!' icon='tasks'>
          <Todo />
        </Tile>
        <Tile
          title='Weekly Meals'
          subTitle="Mmmm. It's going to be a yummy week!"
          icon='shopping basket'
        >
          <MealContainer />
        </Tile>
        <Tile title='Location' subTitle='Where are your folks?' icon='map'>
          <Location />
        </Tile>
      </div>
    );
  }
}

export default Tiles;
