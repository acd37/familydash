import React, { Component } from 'react';

const styles = {
  card: {
    background: '#fff',
    borderRadius: '0.375rem',
    boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
    padding: 10,
    boxSizing: 'border-box',
    width: 500,
    maxWidth: '90%'
  }
};

class Tile extends Component {
  render() {
    return <div style={styles.card}>{this.props.children}</div>;
  }
}

export default Tile;
