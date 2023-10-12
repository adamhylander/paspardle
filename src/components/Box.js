import React from 'react';
import './styling/Box.css';

function Box(props) {
  return (
    <div className="Box" onClick={props.onClick}>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  );
}

export default Box;