import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import RouletteLogo from "../RouletteLogo.svg";

export default class NavBar extends Component {
  constructor() {
    super();
  }

  handleLogout = event => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    this.props.history.push("/");
  };

  render() {
    return (
      <div class="navbar">
        <img
          src="https://i.ibb.co/drvmNVg/restaurantroulette.png"
          alt="restaurantlogo"
          style={{ maxWidth: "10%" }}
        />
        <ul className="nav nav-pills justify-content-end">
          <li className="nav-item">
            <NavLink className="button" to="/preferences">
              Preferences
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="button"
              tabIndex="-1"
              to="/logout"
              onClick={this.handleLogout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
