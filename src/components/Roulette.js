import React, { Component } from "react";
import { Link } from "react-router-dom";

class Roulette extends Component {
  render() {
    return (
      <div>
        <br />
        <div align="center">
          <h1 className="header">Go ahead, try your luck!</h1>
        </div>
        <br />
        <div className="img-div">
          <Link to="/home/dinner">
            <img
              alt="roulette"
              src="./roulette-svgrepo-com.svg"
              className="rotate"
              style={{ maxWidth: "650px", margin: "0 auto 0 auto" }}
            ></img>
          </Link>
        </div>
      </div>
    );
  }
}

export default Roulette;
