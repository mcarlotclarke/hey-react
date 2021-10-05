import React, { Component } from 'react';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  render() {
    return (
      <div>
        <h1>Here are some funny jokes!</h1>
      </div>
    );
  }
}

export default JokeList;
