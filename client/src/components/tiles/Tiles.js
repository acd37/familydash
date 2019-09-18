import React, { Component } from 'react';
import Todo from '../Todo';
import Tile from '../common/Tile';

class Tiles extends Component {
  render() {
    return (
      <div>
        <Tile>
          <Todo />
        </Tile>
      </div>
    );
  }
}

export default Tiles;
