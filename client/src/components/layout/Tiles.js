import React, { Component } from 'react';
import Tile from '../common/Tile';
import Todo from '../todos/Todo';
import Dates from '../dates/Dates';
import UserContainer from '../users/UserContainer';
import MealContainer from '../recipes/MealContainer';
import Masonry from 'react-masonry-css';
import Budget from '../finance/Budget';
import Devices from '../devices/Devices';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
  500: 1
};

class Tiles extends Component {
  render() {
    return (
      <div>
        <Masonry breakpointCols={breakpointColumnsObj}>
          <Tile
            title='Family Members'
            subTitle="Family. It's about time."
            icon='users'
            borderTop='5px solid #ee5253'
          >
            <UserContainer />
          </Tile>
          <Tile title='Tasks' subTitle='Get shit done.' icon='tasks' borderTop='5px solid #5f27cd'>
            <Todo />
          </Tile>
          <Tile
            title='Weekly Meals'
            subTitle="What's cookin', good lookin'?"
            icon='shopping basket'
            borderTop='5px solid #10ac84'
          >
            <MealContainer />
          </Tile>
          <Tile
            title='Important Dates'
            subTitle="Don't forget the card!"
            icon='gift'
            borderTop='5px solid #f368e0'
          >
            <Dates />
          </Tile>
          <Tile
            title='ChoreChart'
            subTitle='What are you doing today?'
            icon='balance scale'
            borderTop='5px solid #ff9f43'
          ></Tile>

          <Tile
            title='Budget'
            subTitle="Here's what you have left."
            icon='pound'
            borderTop='5px solid #8395a7'
          >
            <Budget />
          </Tile>
        </Masonry>
      </div>
    );
  }
}

export default Tiles;
