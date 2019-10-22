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
      cuisines: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/cuisines')
    .then(resp => resp.json())
    .then(cuisines => {
      this.setState({ cuisines: cuisines})
    })
  }

  render() {
    return (
      <Router>
      <div>
        <Route 
        exact path="/home" 
        component={Home} 
        />
        <Route 
        exact path="/signup"  
        render={(props) => <Signup {...props} cuisines={this.state.cuisines} />} 
        />
        <Route 
        exact path="/login" 
        component={Login} 
        />
      </div>
    </Router>
    );
  }
}

export default App;
