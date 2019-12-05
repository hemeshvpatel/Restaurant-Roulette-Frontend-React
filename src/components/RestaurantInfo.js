import React, { Component } from "react";
import MapContainer from "./MapContainer";
import Restaurant from "./Restaurant";
import Weather from "./Weather";

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // componentDidMount() {
  //   fetch("https://restaurant-roulette-backend.herokuapp.com/matches")
  //     .then(resp => resp.json())
  //     .then(resp => {
  //       console.log(resp);
  //       once I receive all matches where the user_id is the same as current users id, I'll get the most recent match, save it as the one that's currently being viewed and use that to make patch requests for whether it's "liked" or not.
  //     });
  // }

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
