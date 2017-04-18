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
      <div className="ui container">
        <img className="ui middle aligned tiny App-logo image" src="http://daynin.github.io/clojurescript-presentation/img/react-logo.png" />

        <span className="logo text">React Reddit</span>
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
      </div >
    );
  }
}

export default App;
