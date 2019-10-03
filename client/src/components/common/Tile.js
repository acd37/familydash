import React from 'react';

function Tile(props) {
  return (
    <div
      className='ui raised card'
      style={{
        width: props.width || 600,
        maxWidth: '90%',
        margin: '10px 10px 10px 0',
        borderTop: props.borderTop || 'none'
      }}
    >
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
