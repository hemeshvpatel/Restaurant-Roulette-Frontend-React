import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <div class="navbar">
      <img
        src="https://i.ibb.co/drvmNVg/restaurantroulette.png"
        alt="restaurantlogo"
        style={{ maxWidth: "10%" }}
      />
      <ul className="nav nav-pills justify-content-end">
        <li className="nav-item">{props.icon}</li>
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
            onClick={props.handleLogout()}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
