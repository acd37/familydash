import React from 'react';

export default function Alert(props) {
  return (
    <div class={`alert alert-${props.alertType} alert-dismissible fade show mt-3`} role='alert'>
      <strong>{props.boldText}</strong> {props.text}
      <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
}
