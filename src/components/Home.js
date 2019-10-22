import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Preferences from "./Preferences";
import Logout from "./Logout";

export default class Home extends Component {
  render() {
    console.log("API KEY", process.env.REACT_APP_GOOGLE_API_KEY);
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/preferences" component={Preferences} />
          <Route exact path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

//conditional logic to be added for displaying componenets below:
//If time is before 5pm display roulette
/* <Route exact path="/roulette" component={Roulette} />
else
<Route exact path="/restaurant" component={Restaurant} /> */
