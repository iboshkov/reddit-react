import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Truncate from 'react-truncate';
import Subreddit from './Subreddit';
import Thread from './Thread';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }
  doStuff() {
    alert();
  }

  render() {
    const Home = ({ match }) => (
      <Subreddit name=''></Subreddit>
    );

    const SubredditComp = ({ match }) => (
      <div>
        <Subreddit name={match.params.subreddit}></Subreddit>
      </div>
    )

    const ThreadComp = ({ match }) => (
      <div>
        {match.params.subreddit} : {match.params.thread}
        <Thread permalink={match.url} />
      </div>
    )

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Reddit</h2>
        </div>
        <p className="App-intro">
        </p>

        <div className="ui container">
          <Router>
            <div>
              <div className="ui horizontal list">
                <div className="item"><Link to="/">Home</Link></div>
                <div className="item"><Link to="/r/leagueoflegends">LeagueOfLegends</Link></div>
                <div className="item"><Link to="/r/globaloffensive">GlobalOffensive</Link></div>
              </div>

              <hr />

              <Route exact path="/" component={Home} />

              <Route exact path={`/r/:subreddit`} component={SubredditComp} />
              <Route path={`/r/:subreddit/comments/:thread_id/:thread`} component={ThreadComp} />
              <Route exact path='/subreddits/' render={() => (
                <h3>Please select a subreddit.</h3>
              )} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
