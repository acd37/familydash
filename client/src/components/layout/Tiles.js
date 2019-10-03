import React, { Component } from 'react';
import Tile from '../common/Tile';
import Todo from '../todos/Todo';
import Dates from '../dates/Dates';
import UserContainer from '../users/UserContainer';
import MealContainer from '../recipes/MealContainer';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
  500: 1
};

class Tiles extends Component {
  render() {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        <Tile
          title='Family Members'
          subTitle='All members of your group are listed here.'
          icon='users'
          borderTop='5px solid #ee5253'
        >
          <UserContainer />
        </Tile>
        <Tile
          title='Tasks'
          subTitle='Get this stuff done!'
          icon='tasks'
          borderTop='5px solid #5f27cd'
        >
          <Todo />
        </Tile>
        <Tile
          title='Weekly Meals'
          subTitle="Mmmm. It's going to be a yummy week!"
          icon='shopping basket'
          borderTop='5px solid #10ac84'
        >
          <MealContainer />
        </Tile>
        <Tile
          title='ChoreChart'
          subTitle='What are you doing today?'
          icon='balance scale'
          borderTop='5px solid #ff9f43'
        ></Tile>
        <Tile
          title='Important Dates'
          subTitle='Get ready to celebrate!'
          icon='gift'
          borderTop='5px solid #f368e0'
        >
          <Dates />
        </Tile>
        <Tile
          title='Budget'
          subTitle='Do you really need those new jeans?'
          icon='pound'
          borderTop='5px solid #8395a7'
        ></Tile>
      </Masonry>
    );
  }
}

export default Tiles;
