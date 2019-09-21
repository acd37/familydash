import React from 'react';

export default function Alert(props) {
  return (
    <div className='ui negative message'>
      <div className='header'>{props.boldText}</div>
      <p>{props.text}</p>
    </div>
  );
}
