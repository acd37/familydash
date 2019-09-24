import React from 'react';

function Tile(props) {
  return (
    <div className='ui raised card' style={{ width: props.width || 400, marginTop: 0, marginBottom: 0 }}>
      <div className='content'>
        {props.icon && (
          <h2 class='ui header' style={{ marginBottom: 30 }}>
            <i class={`${props.icon} icon`}></i>
            <div class='content'>
              {props.title}
              <div class='sub header'>{props.subTitle}</div>
            </div>
          </h2>
        )}

        <div className='description'>{props.children}</div>
      </div>
    </div>
  );
}

export default Tile;
