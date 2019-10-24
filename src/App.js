import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';



class App extends Component {
  constructor() {
    super()

    this.state={
      cuisines: [],
      isSignedUp: false,
      isLoggedIn: false,
      user: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/cuisines')
    .then(resp => resp.json())
    .then(cuisines => {
      this.setState({ cuisines: cuisines})
    }).then(
      fetch(`http://localhost:3000/api/users/${this.state.user.id}`)
          .then(resp => resp.json())
          .then(resp => {
              this.setState({ user: resp })

                  })
    )
  }
  signedIn = (isSignedUp) => {
    this.setState({ isSignedUp: isSignedUp })
    }

  loggedIn = (isLoggedIn) => {
    this.setState({ isLoggedIn: isLoggedIn })
  }

  userSignUp = (user) => {
    this.setState({ user: user })
  }

  userLogIn = (user) => {
    this.setState({ user: user })
  }

  handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem("jwt")
    this.setState ({ user: '' })
}

  render() {
    if (this.state.user === true) {
      return <Redirect to='/home' />
    }
    return (
      <Router>
      <div>
        <Route 
        exact path="/signup"  
        render={(props) => <Signup {...props} cuisines={this.state.cuisines} signedIn={this.signedIn} userSignUp={this.userSignUp} />} 
        />
        <Route 
        exact path="/login"
        render={(props) => <Login {...props} loggedIn={this.loggedIn} userLogIn={this.userLogIn}/>} 
        />  
        {this.state.user ? 
        (<Route 
        exact path="/home" 
        render={() => <Home user={this.state.user} handleLogout={(event) => this.handleLogout}/>}
        />) :
        (<Redirect from="/home" to="/login" /> )
      }      
        
      </div>
    </Router>
    );
  }
}

export default App;
