import React from 'react';

function Tile(props) {
  return (
    <div className='ui raised card' style={{ width: props.width || 400, margin: 10 }}>
      <div className='content'>
        {props.icon && (
          <h2 className='ui header' style={{ marginBottom: 30 }}>
            <i className={`${props.icon} icon`}></i>
            <div className='content'>
              {props.title}
              <div className='sub header'>{props.subTitle}</div>
            </div>
          </h2>
        )}

        <div className='description'>{props.children}</div>
      </div>
    </div>
  );
}

export default Tile;
