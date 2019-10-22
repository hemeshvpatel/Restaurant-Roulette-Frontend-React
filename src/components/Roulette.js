import React, { Component } from "react";

class Roulette extends Component {
  render() {
    return (
      <h1>
        What's for Dinner?{" "}
        <button onClick={e => this.props.handleClick(e)}>Click Here</button>
      </h1>
    );
  }
}

export default Roulette;
