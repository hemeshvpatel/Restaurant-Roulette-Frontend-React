import React, { Component } from "react";
import MapContainer from './MapContainer'

class RestaurantInfo extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Restaurant Info Screen</h1>
        <h2>{this.props.randomMatch.name}</h2>
        <MapContainer />
      </div>
    );
  }
}

export default RestaurantInfo;
