import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <NavLink class="nav-link active" to="/preferences">
          Preferences
        </NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link active" to="/logout">
          Logout
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
