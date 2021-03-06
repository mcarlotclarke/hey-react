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
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((joke) => joke.joke));
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    try {
      const jokes = [];

      while (jokes.length < this.props.numOfJokes) {
        const response = await axios.get(API_URL, {
          headers: { Accept: 'application/json' },
        });

        const newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({
            id: response.data.id,
            joke: newJoke,
            votes: 0,
          });
        } else {
          console.log('FOUND A DUPLICATE!');
          console.log(newJoke);
        }
      }

      this.setState(
        {
          jokes: [...this.state.jokes, ...jokes],
          loading: false,
        },
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    const deepCopy = JSON.parse(JSON.stringify(this.state.jokes));
    const deepCopyMap = deepCopy.map((joke) =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    );

    this.setState(
      {
        jokes: deepCopyMap,
      },
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleNewJoke() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }

    const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

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
          <button
            className="JokeList-getmore"
            onClick={() => this.handleNewJoke()}
          >
            New Jokes
          </button>
        </div>
        <div className="JokeList-jokes">
          {jokes.map((joke) => (
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
