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
    console.log(this.props);
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <Restaurant restaurant={this.props.restaurant} />
          </div>
          <div class="col">
            <Weather
              latData={this.props.restaurant.geometry.location.lat}
              longData={this.props.restaurant.geometry.location.lng}
              restaurant={this.props.restaurant}
            />
          </div>
        </div>
        <div>
          <MapContainer
            latData={this.props.restaurant.geometry.location.lat}
            longData={this.props.restaurant.geometry.location.lng}
          />
        </div>
      </div>
    );
  }
}

export default RestaurantInfo;
