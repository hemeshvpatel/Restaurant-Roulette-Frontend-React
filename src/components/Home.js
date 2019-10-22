import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Preferences from "./Preferences";
import Logout from "./Logout";
import { tsImportEqualsDeclaration } from "@babel/types";

export default class Home extends Component {
  state = {
    matches: [],
    randomMatch: "",
    latData: 0,
    longData: 0,
    placeID: "",
    restaurantName: ""
  };

  componentDidMount() {
    this.fetchCoordinates();
  }

  fetchCoordinates = () => {
    const zipcode = 78702;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=austin&components=postal_code:"+${zipcode}+"&sensor=false&key=${apiKey}`;

    fetch(url, { method: "POST" })
      .then(response => response.json())
      .then(data => {
        console.log("fetchCoordinates response: ", data);
        let latitude = data.results[0].geometry.location.lat;
        let longitude = data.results[0].geometry.location.lng;
        console.log("Lat = ", latitude, " Long = ", longitude);
        this.fetchRestaurant(latitude, longitude);
      });
  };

  fetchRestaurant = (latitude, longitude) => {
    //link to understanding why have to use proxyurl to get to api (CORS)
    //https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141

    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    // Form User Inputs:
    const cuisine1 = "indian";
    const cuisine2 = "mexican";
    //radius is in meters, have to convert miles to meters by multiplying by 1600
    const miles = 1;
    const radius = miles * 1600;
    //const urlFindPlaceFromText = `${proxyURL}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=indian&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:${radius}@${latitude},${longitude}&key=${apiKey}`;
    const urlNearbySearch = `${proxyURL}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=${cuisine1}&&${cuisine2}&key=${apiKey}`;

    console.log("About to fetch restaurant from: ", urlNearbySearch);
    fetch(urlNearbySearch, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetch Restaurant Data: ", data);
        const allMatches = data.results;
        const randomResult =
          allMatches[Math.floor(Math.random() * allMatches.length)];
        this.setState({
          matches: data.results,
          randomMatch: randomResult,
          latData: latitude,
          longData: longitude,
          placeID: randomResult.place_id,
          restaurantName: randomResult.name
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  randomMatch() {
    const allMatches = [...this.state.matches];
    const randomResult =
      allMatches[Math.floor(Math.random() * allMatches.length)];
    this.setState({
      randomMatch: randomResult
    });
  }

  render() {
    console.log("Current State: ", this.state);

    //Time data
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    //conditional logic to be added for displaying componenets below:
    //If time is before 5pm display roulette
    /* <Route exact path="/roulette" component={Roulette} />
    else
    <Route exact path="/restaurant" component={Restaurant} /> */

    console.log(dateTime);
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/preferences" component={Preferences} />
          <Route exact path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}
