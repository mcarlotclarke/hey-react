import React, { useEffect, useState } from 'react';

const Die = ({ number, isRolling }) => {
  const [value, setValue] = useState('one');

  useEffect(() => {
    switch (number) {
      case 1:
        setValue('one');
        break;
      case 2:
        setValue('two');
        break;
      case 3:
        setValue('three');
        break;
      case 4:
        setValue('four');
        break;
      case 5:
        setValue('five');
        break;
      case 6:
        setValue('six');
        break;
      default:
        setValue('');
    }
  }, [number]);

  return (
    <i className={`Die fas fa-dice-${value} ${isRolling && 'shaking'}`}></i>
  );
};

export default Die;
