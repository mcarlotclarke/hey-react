import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import '../styles/JokeList.css';

const API_URL = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  static defaultProps = {
    numOfJokes: 10,
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  async componentDidMount() {
    const jokes = [];

    while (jokes.length < this.props.numOfJokes) {
      const response = await axios.get(API_URL, {
        headers: { Accept: 'application/json' },
      });
      jokes.push(response.data.joke);
    }

    this.setState({
      jokes: jokes,
    });
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes!
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="Icon"
          />
          <button className="JokeList-getmore">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map((joke) => (
            <ul>
              <Joke joke={joke} />
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
