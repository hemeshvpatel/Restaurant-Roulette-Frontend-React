import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul class="nav nav-pills justify-content-end">
      <li class="nav-item">
        <NavLink class="nav-link active m-2" to="/preferences">
          Preferences
        </NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link active m-2" tabindex="-1" to="/logout">
          Logout
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
