import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';



class App extends Component {
  constructor() {
    super()

    this.state={
      cuisines: [],
      isSignedUp: false,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/cuisines')
    .then(resp => resp.json())
    .then(cuisines => {
      this.setState({ cuisines: cuisines})
    })
  }
  signedIn = (isSignedUp) => {
    this.setState({ isSignedUp: isSignedUp })
    }

  loggedIn = (isLoggedIn) => {
    this.setState({ isLoggedIn: isLoggedIn })
  }

  render() {
    return (
      <Router>
      <div>
      {/* this.state.isSignedUp ||  */}
        {this.state.cuisines.length === 0 ? (
        <Route 
        exact path="/home" 
        render={() => <Home />}
        />
        ) : (
        <Route 
        exact path="/signup"  
        render={(props) => <Signup {...props} cuisines={this.state.cuisines} signedIn={this.signedIn}/>} 
        />,
        <Route 
        exact path="/login"
        render={(props) => <Login {...props} loggedIn={this.loggedIn} />} 
        />
        )}
        
        
      </div>
    </Router>
    );
  }
}

export default App;
