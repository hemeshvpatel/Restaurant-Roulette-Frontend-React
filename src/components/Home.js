import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Preferences from "./Preferences";
import Logout from "./Logout";
import { tsImportEqualsDeclaration } from "@babel/types";
import Waiting from "./Waiting";
import RestaurantInfo from "./RestaurantInfo";
import Roulette from "./Roulette";

export default class Home extends Component {
  state = {
    matches: [],
    randomMatch: "",
    latData: 0,
    longData: 0,
    placeID: "",
    restaurantName: "",
    showWaitingorRoulette: true,
    showRestaurantInfo: false,
    randomCuisine: ''
  };



  componentDidMount() {
    this.fetchCoordinates();
    this.randomizeUserCuisine();
  }


  fetchCoordinates = () => {
    const zipcode = this.props.user.zipcode
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=austin&components=postal_code:"+${zipcode}+"&sensor=false&key=${apiKey}`;

    fetch(url, { method: "POST" })
      .then(response => response.json())
      .then(data => {
        let latitude = data.results[0].geometry.location.lat;
        let longitude = data.results[0].geometry.location.lng;
        //console.log("Lat = ", latitude, " Long = ", longitude);
        this.fetchRestaurant(latitude, longitude);
      });
  };

  randomizeUserCuisine = () => {
    fetch(`http://localhost:3000/api/users/${this.props.user.id}`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        // const cuisinePreferences = data.cuisine_preferences
        // let randomCuisine = cuisinePreferences[Math.floor(Math.random() * cuisinePreferences.length)]
        // this.setState({ randomCuisine: randomCuisine.cuisine.kind })
    })
      
}

  fetchRestaurant = (latitude, longitude) => {
    // PLEASE UNCOMMENT THE FOLLOWING LINE AS A CORS WORK AROUND.
    // const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const cuisine1 = this.state.randomCuisine;
    const miles = this.props.user.radius;
    const radius = miles * 1600;
    // PLEASE UNCOMMENT THE FOLLOWING LINE AS A CORS WORK AROUND
    // const urlNearbySearch = `${proxyURL}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=${cuisine1}&key=${apiKey}`;
    
    //COMMENT OUT THIS LINE IF YOU'RE USING THE ABOVE CORS WORK AROUNDS.
    const urlNearbySearch = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=${cuisine1}&key=${apiKey}`;

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
          latData: randomResult.geometry.location.lat,
          longData: randomResult.geometry.location.lng,
          placeID: randomResult.place_id,
          restaurantName: randomResult.name
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  handleClick = e => {
    this.setState({
      showWaitingorRoulette: false,
      showRestaurantInfo: true
    });
  };

  render() {
    console.log(this.props.user);
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let currentTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("time format ", currentTime);

    // let currentDateTime = date + " " + time;
    // console.log("dateTime format ", dateTime);

    // if (currentTime > "16:00:00") {
    //   console.log("Time is past 4pm");
    // } else {
    //   console.log("Wait until 4pm");
    // }

    //conditional logic to be added for displaying componenets below:
    //If time is before 5pm display roulette
    /* <Route exact path="/roulette" component={Roulette} />
    else
    <Route exact path="/restaurant" component={Restaurant} /> */

    return (
      <Router>
        <div>
          <NavBar handleLogout={this.props.handleLogout}/>
          <Route exact path="/preferences" component={Preferences} />
          <Route exact path="/logout" component={Logout} />
          <div>
          <RestaurantInfo randomMatch={this.state.randomMatch} latData={this.state.latData} longData={this.state.longData}/>
            {/* {this.state.showWaitingorRoulette && currentTime < "16:00:00" ? (
              <Waiting currentTime={currentTime} />
            ) : (
              <Roulette handleClick={this.handleClick} />
            )}
          </div>
          <div>
            {this.state.showRestaurantInfo && (
              <RestaurantInfo randomMatch={this.state.randomMatch} latData={this.state.latData} longData={this.state.longData}/>
            )} */}
          </div>
        </div>
      </Router>
    );
  }
}
