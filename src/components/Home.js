import React, { Component } from "react";
import Waiting from "./Waiting";
import Roulette from "./Roulette";

export default class Home extends Component {
  state = {
    matches: [],
    randomMatch: "",
    latData: 0,
    longData: 0,
    placeID: "",
    restaurantName: "",
    randomCuisine: "",
    user: localStorage.getItem("user_id"),
    cuisines: this.props.cuisines
    // style: true
  };

  componentDidMount() {
    fetch(
      `https://restaurant-roulette-backend.herokuapp.com/api/users/${window.localStorage.getItem(
        "user_id"
      )}`
    )
      .then(resp => resp.json())
      .then(user => {
        this.setState({ user: user }, () => {
          this.fetchCoordinates();
        });
        // localStorage.removeItem("user_id");
      });
    this.randomizeUserCuisine();
  }

  fetchCoordinates = () => {
    const zipcode = this.state.user.zipcode;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+${zipcode}+"&sensor=false&key=${apiKey}`;

    fetch(url, { method: "POST" })
      .then(response => response.json())
      .then(data => {
        console.log(data, url);
        let latitude = data.results[0].geometry.location.lat;
        let longitude = data.results[0].geometry.location.lng;
        //console.log("Lat = ", latitude, " Long = ", longitude);
        this.fetchRestaurant(latitude, longitude);
      });
  };

  randomizeUserCuisine = () => {
    fetch(
      `https://restaurant-roulette-backend.herokuapp.com/api/users/${window.localStorage.getItem(
        "user_id"
      )}`
    )
      .then(resp => resp.json())
      .then(data => {
        this.setState({ user: data });
      });
  };

  fetchRestaurant = (latitude, longitude) => {
    // PLEASE UNCOMMENT THE FOLLOWING LINE AS A CORS WORK AROUND.
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const cuisine1 = this.state.randomCuisine;
    const miles = this.props.user.radius;
    const radius = miles * 1600;
    // PLEASE UNCOMMENT THE FOLLOWING LINE AS A CORS WORK AROUND
    const urlNearbySearch = `${proxyURL}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=${cuisine1}&key=${apiKey}`;

    //COMMENT OUT THIS LINE IF YOU'RE USING THE ABOVE CORS WORK AROUNDS.
    // const urlNearbySearch = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=${cuisine1}&key=${apiKey}`;

    fetch(urlNearbySearch, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        const allMatches = data.results;
        const randomResult =
          allMatches[Math.floor(Math.random() * allMatches.length)];
        this.setState(
          {
            matches: data.results,
            randomMatch: randomResult,
            latData: randomResult.geometry.location.lat,
            longData: randomResult.geometry.location.lng,
            placeID: randomResult.place_id,
            restaurantName: randomResult.name
          },
          () => {
            this.props.handleRestaurant(randomResult);
            this.createMatch();
          }
        );
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  createMatch = () => {
    fetch("https://restaurant-roulette-backend.herokuapp.com/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.user.id,
        place_id: this.state.placeID,
        place_lat: this.state.latData,
        place_lng: this.state.longData,
        place_name: this.state.restaurantName
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
      });
  };

  render() {
    let today = new Date();
    // let date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
    let currentTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return (
      <>
        {currentTime < "17:59:59" ? (
          <Waiting handleClick={this.handleClick} />
        ) : (
          <Roulette handleClick={this.handleClick} />
        )}
      </>
    );
  }
}
