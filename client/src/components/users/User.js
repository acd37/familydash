import React from 'react';

function User(props) {
  return (
    <div>
      <div className='ui card' style={{ width: 145, margin: '0 20px' }}>
        <div className='image'>
          <img src={require('../../assets/images/user.png')} />
        </div>
        <div class='content'>
          <a class='header'>
            {props.user.firstName} {props.user.lastName}
          </a>
        </div>
      </div>
    </div>
  );
}

export default User;
