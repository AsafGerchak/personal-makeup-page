import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// COMPONENTS
import HomePage from './HomePage';
import UserPage from './UserPage';


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          loggedIn: true
        })
      }
    });
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
        loggedIn: false
      });
    })
  }

  login = () => {
    auth.signInWithPopup(provider).then((res) => {
      this.setState({
        user: res.user,
        loggedIn: true
      });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/"><h1>Makeup! Oh Shit Son</h1></Link>

          {this.state.user
            ? <div>
                <h4>{`Hi there ${this.state.user.displayName}`}</h4>
                <button onClick={this.logout}>Logout</button>

                <Route exact path="/" component={HomePage} />
                <Route exact path="/userPage/:user_id" render={() => <UserPage loginStatus={this.state.loggedIn} />} />
              </div>
            : <button onClick={this.login}>Login</button>
          }
        </div>
      </Router>
    );
  }
}

export default App;
