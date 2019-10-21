import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <Route exact path="/home" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>
  );
}

export default App;
