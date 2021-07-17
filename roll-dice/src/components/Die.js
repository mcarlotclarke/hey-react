import React from 'react';

const Die = (props) => {
  return (
    <i
      className={`Die fas fa-dice-${props.face} ${
        props.isRolling && 'shaking'
      }`}
    ></i>
  );
};

export default Die;
