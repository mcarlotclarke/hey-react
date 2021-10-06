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
      jokes.push({ id: response.data.id, joke: response.data.joke, votes: 0 });
    }

    this.setState({
      jokes: jokes,
    });
  }

  handleVote = (id, delta) => {
    const deepCopy = JSON.parse(JSON.stringify(this.state.jokes));
    const deepCopyMap = deepCopy.map((joke) =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    );

    this.setState({
      jokes: deepCopyMap,
    });
  };

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
            <Joke
              key={joke.id}
              joke={joke.joke}
              votes={joke.votes}
              upvote={() => this.handleVote(joke.id, 1)}
              downvote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
