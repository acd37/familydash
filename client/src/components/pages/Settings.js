import React, { Component } from 'react';
import Tile from '../common/Tile';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1> Settings</h1>
        <Tile width={600}>
        <p><strong>Family code: </strong><pre style={{color: '#000'}}>{this.props.user.familyCode}</pre></p>
        <p>Keep this code safe. Share it with those that you would like to have join your family.</p>
        <div class="ui divider"></div>
        <p style={{ color: "#cc0000"}}><strong>Warning: </strong> If your family code is compromised, please regenerate it below.</p>
        <button className="ui button" disabled>Generate New Code</button>
        </Tile>
      </div>
    );
  }
}

export default Settings;
