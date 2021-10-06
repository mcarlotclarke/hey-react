import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

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
        <h1>Dad's Jokes!</h1>
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
