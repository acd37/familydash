import React, { Component } from 'react';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1> Settings</h1>
        <p>Family code: {this.props.user.familyCode}</p>
      </div>
    );
  }
}

export default Settings;
