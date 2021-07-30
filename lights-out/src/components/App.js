import React, { Component } from 'react';
import Board from './Board';
import '../style/App.css';

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
