import React, { Component } from "react";

class RestaurantInfo extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Restaurant Info Screen</h1>
        <h2>{this.props.randomMatch.name}</h2>
      </div>
    );
  }
}

export default RestaurantInfo;
