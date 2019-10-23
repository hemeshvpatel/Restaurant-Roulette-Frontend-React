import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav nav-pills justify-content-end">
      <li className="nav-item">
        <NavLink className="nav-link active m-2" to="/preferences">
          Preferences
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link active m-2" tabIndex="-1" to="/logout">
          Logout
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
