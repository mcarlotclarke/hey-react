import React, { useState, useEffect } from 'react';
import Die from './Die';
import { createRandomDice } from './utils';

const RollDice = () => {
  const [dice, setDice] = useState([]);
  const [isRolling, setRolling] = useState(false);

  useEffect(() => {
    setDice(createRandomDice());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRolling(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isRolling]);

  const roll = () => {
    setRolling(true);
    setDice(createRandomDice());
  };

  return (
    <div className="RollDice">
      <div className="RollDice-container">
        {dice.map((die, index) => (
          <Die number={die} key={index} isRolling={isRolling} />
        ))}
      </div>
      <button onClick={roll} disabled={isRolling}>
        {isRolling ? 'Rolling...' : 'ROLL dice!'}
      </button>
    </div>
  );
};

export default RollDice;
