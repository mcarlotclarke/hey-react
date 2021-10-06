import React from 'react';

const Joke = (props) => {
  return (
    <>
      <div className="Joke">
        <button>Up</button>
        <button>Down</button>
        <div>count</div>
        <span>{props.joke}</span>
      </div>
    </>
  );
};

export default Joke;
