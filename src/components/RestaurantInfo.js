import React, { Component } from "react";
import MapContainer from "./MapContainer";
import Restaurant from "./Restaurant";
import Weather from "./Weather";

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <Restaurant restaurant={this.props.randomMatch} />
          </div>
          <div class="col">
            <Weather
              latData={this.props.latData}
              longData={this.props.longData}
              restaurant={this.props.randomMatch}
            />
          </div>
        </div>
        <div>
          <MapContainer
            latData={this.props.latData}
            longData={this.props.longData}
          />
        </div>
      </div>
    );
  }
}

export default RestaurantInfo;
