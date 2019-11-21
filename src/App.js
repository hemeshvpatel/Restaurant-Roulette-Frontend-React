import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Preferences from "./components/Preferences";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";
import RestaurantInfo from "./components/RestaurantInfo";

class App extends Component {
  constructor() {
    super();

    this.state = {
      cuisines: [],
      user: ""
    };
  }

  componentDidMount() {
    fetch("https://restaurant-roulette-backend.herokuapp.com/cuisines")
      .then(resp => resp.json())
      .then(cuisines => {
        this.setState({ cuisines: cuisines });
      });
    // .then(
    //   fetch(
    //     `https://restaurant-roulette-backend.herokuapp.com/api/users/${this.state.user.id}`
    //   )
    //     .then(resp => resp.json())
    //     .then(resp => {
    //       if (resp === null) {
    //         alert("Invalid username or password - please try again!");
    //       } else {
    //         console.log(resp);
    //         this.setState({ user: resp });
    //       }
    //     })
    // );
  }

  handleRestaurant = res => {
    this.setState({
      restaurant: res
    });
  };

  userSignUp = user => {
    this.setState({ user: user });
  };

  userLogIn = user => {
    this.setState({ user: user });
  };

  render() {
    console.log(this.state);
    // if (this.state.user === true) {
    //   return <Redirect to="/home" />;
    // }
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Login
                {...props}
                loggedIn={this.loggedIn}
                userLogIn={this.userLogIn}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={props => (
              <Signup
                {...props}
                cuisines={this.state.cuisines}
                signedIn={this.signedIn}
                userSignUp={this.userSignUp}
              />
            )}
          />
          <Route
            exact
            path="/home"
            render={props => (
              <>
                <NavBar
                  {...props}
                  cuisines={this.state.cuisines}
                  user={this.state.user}
                />
                <Home
                  {...props}
                  history={this.history}
                  user={this.state.user}
                  handleRestaurant={this.handleRestaurant}
                  handleLogout={event => this.handleLogout}
                  cuisines={this.state.cuisines}
                />
              </>
            )}
          />
          <Route
            exact
            path="/home/dinner"
            render={props => (
              <>
                <NavBar
                  {...props}
                  cuisines={this.state.cuisines}
                  user={this.state.user}
                />

                <RestaurantInfo {...props} restaurant={this.state.restaurant} />
              </>
            )}
          />

          <Route
            exact
            path="/preferences"
            render={props => (
              <>
                <NavBar
                  {...props}
                  cuisines={this.state.cuisines}
                  user={this.state.user}
                />
                <Preferences
                  {...props}
                  handlePreferences={this.handlePreferences}
                  user={this.state.user}
                  cuisines={this.state.cuisines}
                />
              </>
            )}
          />
        </Switch>
      </Router>
      /* <Route
            exact
            path="/signup"
            render={props => (
              <Signup
                {...props}
                cuisines={this.state.cuisines}
                signedIn={this.signedIn}
                userSignUp={this.userSignUp}
              />
            )}
          /> */
      /* <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                loggedIn={this.loggedIn}
                userLogIn={this.userLogIn}
              />
            )}
          /> */
      // <Route
      //   exact
      //   path="/home"
      //   render={() => (
      //     <Home
      //       history={this.history}
      //       user={this.state.user}
      //       handleLogout={event => this.handleLogout}
      //       cuisines={this.state.cuisines}
      //     />
      //   )}
      // />
      // ) : (
      //   <Redirect from="/home" to="/login" />
      // )}
    );
  }
}

export default App;
