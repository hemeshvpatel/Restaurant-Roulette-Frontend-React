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
    randomCuisine: "",
    user: ""
  };

  componentDidMount() {
    this.fetchCoordinates();
    this.randomizeUserCuisine();
  }

  fetchCoordinates = () => {
    const zipcode = this.props.user.zipcode;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=austin&components=postal_code:"+${zipcode}+"&sensor=false&key=${apiKey}`;

    fetch(url, { method: "POST" })
      .then(response => response.json())
      .then(data => {
        console.log("data response ========", data);
        console.log("api key", apiKey);
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
        this.setState({ user: data });
        // const cuisinePreferences = data.cuisine_preferences
        // let randomCuisine = cuisinePreferences[Math.floor(Math.random() * cuisinePreferences.length)]
        // this.setState({ randomCuisine: randomCuisine.cuisine.kind })
      });
  };

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

  icon = () => {
    //fixing-signup-bug
    return (
      <span class="logo">
        <div className="img-div">
          <svg
            width="334.48pt"
            height="191.4pt"
            viewBox="75.26 39.3 334.48 191.4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="a">
                <rect x="75.26" y="39.3" width="334.48" height="191.4" />
              </clipPath>
            </defs>
            <g clip-path="url(#a)">
              <g opacity=".51">
                <path
                  d="m325.64 64.433c-33.635 0-60.902 27.264-60.902 60.902 0 33.632 27.267 60.898 60.902 60.898 33.634 0 60.9-27.266 60.9-60.898 0-33.638-27.266-60.902-60.9-60.902z"
                  fill="#703d2a"
                />
                <path
                  d="m325.64 75.847c-27.331 0-49.487 22.154-49.487 49.487 0 27.329 22.156 49.485 49.487 49.485 27.329 0 49.485-22.156 49.485-49.485 1e-3 -27.333-22.156-49.487-49.485-49.487z"
                  fill="#a56c42"
                />
                <path
                  d="m325.64 85.421c-22.044 0-39.913 17.868-39.913 39.913 0 22.042 17.869 39.911 39.913 39.911 22.042 0 39.912-17.87 39.912-39.911 0-22.045-17.87-39.913-39.912-39.913z"
                  fill="#c6b8af"
                />
                <path
                  d="m325.64 87.292c-21.01 0-38.042 17.031-38.042 38.042 0 21.008 17.032 38.04 38.042 38.04 21.009 0 38.04-17.032 38.04-38.04 0-21.011-17.031-38.042-38.04-38.042z"
                  fill="#ba7c49"
                />
                <path
                  d="m294.48 103.52c-1.288 1.833-2.393 3.756-3.319 5.739l34.471 16.074-31.152-21.813z"
                  fill="#ce2e2e"
                />
                <g fill="#3a3a3a">
                  <path d="m291.16 109.26c-0.941 2.021-1.696 4.105-2.262 6.231l36.734 9.843-34.472-16.074z" />
                  <path d="m298.75 98.445c-1.595 1.594-3.012 3.293-4.264 5.075l31.152 21.813-26.888-26.888z" />
                </g>
                <g fill="#ce2e2e">
                  <path d="m288.9 115.49c-0.573 2.145-0.954 4.329-1.144 6.529l37.878 3.314-36.734-9.843z" />
                  <path d="m303.82 94.182c-1.783 1.251-3.483 2.671-5.075 4.263l26.888 26.888-21.813-31.151z" />
                  <path d="m294.48 147.15 31.149-21.811-34.466 16.072c0.924 1.985 2.031 3.905 3.317 5.739zm31.151-21.812-2e-3 1e-3 3e-3 -1e-3h-1e-3z" />
                </g>
                <g fill="#3a3a3a">
                  <path d="m287.76 122.02c-0.193 2.204-0.191 4.423-1e-3 6.628l37.879-3.314-37.878-3.314z" />
                  <path d="m288.9 135.18c0.568 2.125 1.321 4.212 2.265 6.231l34.469-16.073-36.734 9.842z" />
                </g>
                <path
                  d="m287.76 128.65c0.191 2.199 0.572 4.384 1.145 6.529l36.734-9.842v-1e-3l-37.879 3.314z"
                  fill="#ce2e2e"
                />
                <g fill="#3a3a3a">
                  <path d="m352.52 98.447-26.886 26.886 31.151-21.813c-1.251-1.782-2.671-3.481-4.265-5.073z" />
                  <path d="m309.56 90.862c-1.985 0.926-3.905 2.032-5.738 3.32l21.813 31.151-16.075-34.471z" />
                  <path d="m328.95 87.455-3.313 37.878 9.842-36.734c-2.144-0.573-4.33-0.953-6.529-1.144z" />
                  <path d="m341.71 90.863-16.073 34.47 21.812-31.152c-1.833-1.286-3.754-2.394-5.739-3.318z" />
                </g>
                <g fill="#ce2e2e">
                  <path d="m347.45 94.181-21.812 31.152 26.886-26.886c-1.591-1.593-3.293-3.014-5.074-4.266z" />
                  <path d="m335.48 88.599-9.842 36.734 16.073-34.47c-2.019-0.942-4.107-1.695-6.231-2.264z" />
                </g>
                <path
                  d="m294.48 147.15c1.252 1.782 2.671 3.481 4.265 5.074l26.886-26.886-31.151 21.812z"
                  fill="#3a3a3a"
                />
                <path
                  d="m322.32 87.455 3.315 37.878 3.313-37.878c-2.205-0.192-4.423-0.192-6.628 0z"
                  fill="#357157"
                />
                <path
                  d="m322.32 87.455c-2.197 0.191-4.384 0.571-6.528 1.145l9.843 36.733-3.315-37.878z"
                  fill="#3a3a3a"
                />
                <g fill="#ce2e2e">
                  <path d="m315.79 88.599c-2.127 0.568-4.211 1.322-6.232 2.263l16.075 34.471-9.843-36.734z" />
                  <path d="m325.64 125.33 36.733 9.842c0.573-2.144 0.953-4.33 1.143-6.528l-37.876-3.314z" />
                  <path d="m325.64 125.33 31.151 21.813c1.287-1.834 2.393-3.754 3.32-5.74l-34.471-16.073z" />
                </g>
                <path
                  d="m363.51 122.02-37.878 3.313 37.876 3.314c0.192-2.206 0.193-4.424 2e-3 -6.627z"
                  fill="#3a3a3a"
                />
                <g fill="#ce2e2e">
                  <path d="m362.37 115.49-36.733 9.841 37.878-3.313c-0.192-2.198-0.572-4.385-1.145-6.528z" />
                  <path d="m356.79 103.52-31.151 21.813 34.47-16.074c-0.926-1.985-2.032-3.905-3.319-5.739z" />
                </g>
                <g fill="#3a3a3a">
                  <path d="m360.1 109.26-34.47 16.074 36.733-9.841c-0.567-2.125-1.322-4.213-2.263-6.233z" />
                  <path d="m325.64 125.33 26.887 26.888c1.593-1.593 3.013-3.292 4.264-5.075l-31.151-21.813z" />
                </g>
                <g fill="#ce2e2e">
                  <path d="m325.63 125.33-26.886 26.886c1.592 1.594 3.292 3.013 5.074 4.266l21.813-31.152h-1e-3z" />
                  <path d="m325.64 125.33v1e-3l-3.314 37.877c2.205 0.192 4.423 0.192 6.628-1e-3l-3.314-37.877z" />
                  <path d="m309.56 159.8c2.02 0.943 4.106 1.697 6.231 2.264l9.843-36.733v-1e-3l-16.074 34.47z" />
                </g>
                <g fill="#3a3a3a">
                  <path d="m315.79 162.07c2.144 0.572 4.331 0.955 6.529 1.145l3.314-37.878-9.843 36.733z" />
                  <path d="m309.56 159.8 16.073-34.468-21.812 31.151c1.834 1.286 3.753 2.392 5.739 3.317zm16.073-34.468 1e-3 -1e-3v-1e-3l-1e-3 2e-3z" />
                  <path d="m325.64 125.33 3.314 37.877c2.199-0.189 4.383-0.571 6.528-1.143l-9.842-36.734z" />
                  <path d="m325.64 125.33 16.073 34.47c1.985-0.925 3.905-2.031 5.739-3.318l-21.812-31.152z" />
                </g>
                <g fill="#ce2e2e">
                  <path d="m325.64 125.33 21.812 31.152c1.783-1.251 3.483-2.671 5.075-4.264l-26.887-26.888z" />
                  <path d="m325.64 125.33 9.842 36.734c2.126-0.568 4.211-1.32 6.231-2.264l-16.073-34.47z" />
                </g>
                <path
                  d="m325.64 125.33 34.471 16.073c0.94-2.019 1.695-4.105 2.262-6.231l-36.733-9.842z"
                  fill="#3a3a3a"
                />
                <path
                  d="m325.64 93.18c-17.758 0-32.154 14.395-32.154 32.154 0 17.756 14.396 32.152 32.154 32.152 17.757 0 32.152-14.396 32.152-32.152 0-17.759-14.395-32.154-32.152-32.154z"
                  fill="#bfafa5"
                />
                <path
                  d="m325.64 94.869c-16.826 0-30.465 13.638-30.465 30.465 0 16.824 13.639 30.463 30.465 30.463 16.824 0 30.464-13.639 30.464-30.463 0-16.827-13.64-30.465-30.464-30.465z"
                  fill="#c6854a"
                />
                <path
                  d="m300.11 107.46c-1.055 1.501-1.96 3.076-2.719 4.701l28.24 13.168-25.521-17.869z"
                  fill="#e03636"
                />
                <g fill="#3a3a3a">
                  <path d="m297.4 112.16c-0.771 1.656-1.389 3.363-1.854 5.105l30.094 8.063-28.24-13.168z" />
                  <path d="m303.61 103.31c-1.306 1.305-2.467 2.697-3.493 4.158l25.521 17.869-22.028-22.027z" />
                </g>
                <g fill="#e03636">
                  <path d="m295.54 117.27c-0.469 1.757-0.781 3.546-0.936 5.348l31.03 2.715-30.094-8.063z" />
                  <path d="m307.76 99.813c-1.461 1.026-2.853 2.189-4.158 3.493l22.028 22.027-17.87-25.52z" />
                  <path d="m300.11 143.2 25.518-17.868-28.235 13.166c0.757 1.627 1.664 3.199 2.717 4.702zm25.52-17.869-2e-3 1e-3 3e-3 -1e-3h-1e-3z" />
                </g>
                <g fill="#3a3a3a">
                  <path d="m294.6 122.62c-0.159 1.806-0.157 3.623-1e-3 5.43l31.031-2.715-31.03-2.715z" />
                  <path d="m295.54 133.4c0.465 1.741 1.082 3.451 1.855 5.105l28.237-13.167-30.092 8.062z" />
                </g>
                <path
                  d="m294.6 128.05c0.156 1.801 0.469 3.591 0.938 5.348l30.093-8.062v-1e-3l-31.031 2.715z"
                  fill="#e03636"
                />
                <g fill="#3a3a3a">
                  <path d="m347.66 103.31-22.026 22.026 25.519-17.869c-1.024-1.461-2.188-2.852-3.493-4.157z" />
                  <path d="m312.46 97.094c-1.625 0.759-3.198 1.665-4.7 2.719l17.87 25.52-13.17-28.239z" />
                  <path d="m328.35 94.303-2.714 31.03 8.063-30.093c-1.757-0.469-3.548-0.781-5.349-0.937z" />
                  <path d="m338.8 97.095-13.167 28.238 17.869-25.52c-1.502-1.054-3.075-1.962-4.702-2.718z" />
                </g>
                <g fill="#e03636">
                  <path d="m343.5 99.813-17.869 25.52 22.026-22.026c-1.304-1.305-2.698-2.468-4.157-3.494z" />
                  <path d="m333.7 95.24-8.063 30.093 13.167-28.238c-1.654-0.772-3.364-1.389-5.104-1.855z" />
                </g>
                <path
                  d="m300.11 143.2c1.026 1.46 2.189 2.852 3.494 4.156l22.026-22.025-25.52 17.869z"
                  fill="#3a3a3a"
                />
                <path
                  d="m322.92 94.303 2.716 31.03 2.714-31.03c-1.806-0.157-3.624-0.157-5.43 0z"
                  fill="#398764"
                />
                <path
                  d="m322.92 94.303c-1.8 0.156-3.591 0.468-5.348 0.937l8.064 30.093-2.716-31.03z"
                  fill="#3a3a3a"
                />
                <g fill="#e03636">
                  <path d="m317.57 95.24c-1.742 0.465-3.45 1.083-5.105 1.854l13.169 28.239-8.064-30.093z" />
                  <path d="m325.64 125.33 30.092 8.063c0.47-1.757 0.781-3.547 0.937-5.348l-31.029-2.715z" />
                  <path d="m325.64 125.33 25.52 17.87c1.054-1.503 1.96-3.075 2.719-4.703l-28.239-13.167z" />
                </g>
                <path
                  d="m356.66 122.62-31.03 2.714 31.029 2.715c0.157-1.807 0.157-3.624 1e-3 -5.429z"
                  fill="#3a3a3a"
                />
                <g fill="#e03636">
                  <path d="m355.73 117.27-30.092 8.062 31.03-2.714c-0.157-1.801-0.468-3.592-0.938-5.348z" />
                  <path d="m351.15 107.46-25.519 17.869 28.238-13.168c-0.758-1.626-1.664-3.199-2.719-4.701z" />
                </g>
                <g fill="#3a3a3a">
                  <path d="m353.87 112.16-28.238 13.168 30.092-8.062c-0.464-1.741-1.083-3.451-1.854-5.106z" />
                  <path d="m325.64 125.33 22.026 22.027c1.305-1.305 2.469-2.697 3.493-4.158l-25.519-17.869z" />
                </g>
                <g fill="#e03636">
                  <path d="m325.63 125.33-22.025 22.025c1.304 1.306 2.697 2.469 4.156 3.495l17.87-25.52h-1e-3z" />
                  <path d="m325.64 125.33v1e-3l-2.715 31.03c1.806 0.157 3.624 0.157 5.43-1e-3l-2.715-31.03z" />
                  <path d="m312.47 153.57c1.655 0.772 3.364 1.39 5.105 1.854l8.064-30.092v-1e-3l-13.169 28.239z" />
                </g>
                <g fill="#3a3a3a">
                  <path d="m317.57 155.43c1.757 0.469 3.548 0.782 5.349 0.938l2.715-31.03-8.064 30.092z" />
                  <path d="m325.63 125.34 1e-3 -1e-3v-1e-3l-1e-3 2e-3zm-13.168 28.237 13.168-28.237-17.869 25.519c1.503 1.053 3.075 1.96 4.701 2.718z" />
                  <path d="m325.64 125.33 2.715 31.03c1.802-0.156 3.591-0.469 5.348-0.937l-8.063-30.093z" />
                  <path d="m325.64 125.33 13.167 28.239c1.627-0.758 3.199-1.665 4.702-2.718l-17.869-25.521z" />
                </g>
                <g fill="#e03636">
                  <path d="m325.64 125.33 17.869 25.521c1.46-1.025 2.853-2.189 4.157-3.494l-22.026-22.027z" />
                  <path d="m325.64 125.33 8.063 30.093c1.742-0.465 3.449-1.082 5.104-1.854l-13.167-28.239z" />
                </g>
                <path
                  d="m325.64 125.33 28.239 13.167c0.77-1.654 1.389-3.363 1.854-5.104l-30.093-8.063z"
                  fill="#3a3a3a"
                />
                <circle
                  cx="325.63"
                  cy="97.585"
                  r="2.2094"
                  fill="#e2e2e2"
                  vector-effect="non-scaling-stroke"
                />
                <path
                  d="m325.57 95.608c-1.093 0-1.979 0.886-1.979 1.978 0 1.093 0.886 1.978 1.979 1.978 1.092 0 1.092-3.956 0-3.956z"
                  fill="#fff"
                />
                <path
                  d="m325.64 101.16c-13.35 0-24.172 10.821-24.172 24.172 0 13.348 10.822 24.17 24.172 24.17 13.349 0 24.171-10.822 24.171-24.17 0-13.351-10.822-24.172-24.171-24.172z"
                  fill="#cec0b7"
                />
                <path
                  d="m325.64 102.18c-12.791 0-23.159 10.368-23.159 23.159 0 12.789 10.368 23.157 23.159 23.157 12.789 0 23.158-10.368 23.158-23.157 0-12.791-10.369-23.159-23.158-23.159z"
                  fill="#d89450"
                />
                <path
                  d="m340.51 109.78c-8.405-8.405-22.032-8.405-30.437 0s-8.405 22.032 0 30.437c4.194 4.192 13.871-1.282 21.472-8.865 7.635-7.616 13.176-17.36 8.965-21.572z"
                  fill="#e09f65"
                />
                <rect
                  x="325.27"
                  y="102.09"
                  width=".736"
                  height="46.493"
                  fill="#685b51"
                />
                <rect
                  x="302.39"
                  y="124.96"
                  width="46.493"
                  height=".736"
                  fill="#685b51"
                />
                <rect
                  transform="matrix(.707 -.707 .707 .707 6.753 266.97)"
                  x="302.39"
                  y="124.96"
                  width="46.493"
                  height=".736"
                  fill="#685b51"
                />
                <rect
                  transform="matrix(.707 -.707 .707 .707 6.751 266.97)"
                  x="325.27"
                  y="102.09"
                  width=".736"
                  height="46.493"
                  fill="#685b51"
                />
                <circle
                  cx="325.63"
                  cy="125.33"
                  r="7.4472"
                  fill="#685b51"
                  vector-effect="non-scaling-stroke"
                />
                <circle
                  cx="325.63"
                  cy="125.33"
                  r="3.2432"
                  fill="#4c4642"
                  vector-effect="non-scaling-stroke"
                />
                <path
                  d="m325.62 76.474c-0.43 0-1.35 1.814-1.35 4.051s0.798 4.05 1.35 4.05 1.35-1.813 1.35-4.05-0.92-4.051-1.35-4.051z"
                  fill="#c1bdbc"
                />
                <path
                  d="m325.62 76.474c-0.43 0-1.35 1.814-1.35 4.051s0.798 4.05 1.35 4.05 0.43-8.101 0-8.101z"
                  fill="#d8d8d8"
                />
                <path
                  d="m325.62 166.08c-0.43 0-1.35 1.814-1.35 4.051s0.798 4.05 1.35 4.05 1.35-1.813 1.35-4.05-0.92-4.051-1.35-4.051z"
                  fill="#c1bdbc"
                />
                <path
                  d="m325.62 166.08c-0.43 0-1.35 1.814-1.35 4.051s0.798 4.05 1.35 4.05 0.43-8.101 0-8.101z"
                  fill="#d8d8d8"
                />
                <path
                  d="m370.42 123.98c-2.237 0-4.051 0.797-4.051 1.35 0 0.552 1.814 1.35 4.051 1.35s4.05-0.921 4.05-1.35c0-0.43-1.813-1.35-4.05-1.35z"
                  fill="#c1bdbc"
                />
                <path
                  d="m370.42 123.98c-2.237 0-4.051 0.797-4.051 1.35 0 0.552 8.101 0.429 8.101 0 0-0.43-1.813-1.35-4.05-1.35z"
                  fill="#d8d8d8"
                />
                <path
                  d="m280.81 123.98c-2.237 0-4.051 0.797-4.051 1.35 0 0.552 1.814 1.35 4.051 1.35s4.051-0.921 4.051-1.35c0-0.43-1.814-1.35-4.051-1.35z"
                  fill="#c1bdbc"
                />
                <path
                  d="m280.81 123.98c-2.237 0-4.051 0.797-4.051 1.35 0 0.552 8.102 0.429 8.102 0 0-0.43-1.814-1.35-4.051-1.35z"
                  fill="#d8d8d8"
                />
                <path
                  d="m360.16 90.783c-0.304-0.304-2.237 0.327-3.819 1.909s-2.3 3.429-1.909 3.819c0.39 0.391 2.236-0.327 3.818-1.909s2.214-3.516 1.91-3.819z"
                  fill="#c1bdbc"
                />
                <path
                  d="m360.16 90.783c-0.304-0.304-2.237 0.327-3.819 1.909s-2.3 3.429-1.909 3.819c0.39 0.391 6.032-5.425 5.728-5.728z"
                  fill="#d8d8d8"
                />
                <path
                  d="m296.8 154.14c-0.304-0.304-2.237 0.328-3.819 1.91s-2.3 3.428-1.91 3.819c0.391 0.39 2.237-0.328 3.819-1.91s2.213-3.515 1.91-3.819z"
                  fill="#c1bdbc"
                />
                <path
                  d="m296.8 154.14c-0.304-0.304-2.237 0.328-3.819 1.91s-2.3 3.428-1.91 3.819c0.391 0.39 6.032-5.425 5.729-5.729z"
                  fill="#d8d8d8"
                />
                <path
                  d="m358.25 156.05c-1.582-1.582-3.428-2.3-3.818-1.91-0.391 0.391 0.327 2.237 1.909 3.819s3.515 2.214 3.819 1.91-0.328-2.237-1.91-3.819z"
                  fill="#c1bdbc"
                />
                <path
                  d="m358.25 156.05c-1.582-1.582-3.428-2.3-3.818-1.91-0.391 0.391 5.424 6.033 5.728 5.729s-0.328-2.237-1.91-3.819z"
                  fill="#d8d8d8"
                />
                <path
                  d="m294.89 92.692c-1.582-1.582-3.428-2.3-3.819-1.909-0.391 0.39 0.327 2.237 1.909 3.819s3.516 2.213 3.819 1.909c0.304-0.304-0.327-2.237-1.909-3.819z"
                  fill="#c1bdbc"
                />
                <path
                  d="m294.89 92.692c-1.582-1.582-3.428-2.3-3.819-1.909-0.391 0.39 5.425 6.032 5.728 5.728 0.304-0.304-0.327-2.237-1.909-3.819z"
                  fill="#d8d8d8"
                />
                <path
                  d="m343.35 82.74c-2.063-0.864-4.044-0.829-4.258-0.32-0.213 0.51 1.151 1.946 3.214 2.811 2.064 0.864 4.092 0.716 4.258 0.32s-1.151-1.946-3.214-2.811z"
                  fill="#c1bdbc"
                />
                <path
                  d="m343.35 82.74c-2.063-0.864-4.044-0.829-4.258-0.32-0.213 0.51 7.306 3.527 7.472 3.131s-1.151-1.946-3.214-2.811z"
                  fill="#d8d8d8"
                />
                <path
                  d="m308.92 164.89c-2.063-0.864-4.044-0.829-4.257-0.32-0.214 0.51 1.151 1.946 3.214 2.811s4.091 0.716 4.257 0.32-1.15-1.946-3.214-2.811z"
                  fill="#c1bdbc"
                />
                <path
                  d="m308.92 164.89c-2.063-0.864-4.044-0.829-4.257-0.32-0.214 0.51 7.305 3.527 7.471 3.131s-1.15-1.946-3.214-2.811z"
                  fill="#d8d8d8"
                />
                <path
                  d="m368.26 138.54c-0.51-0.213-1.946 1.151-2.811 3.214s-0.716 4.092-0.32 4.258 1.946-1.151 2.811-3.214c0.864-2.063 0.829-4.044 0.32-4.258z"
                  fill="#c1bdbc"
                />
                <path
                  d="m368.26 138.54c-0.51-0.213-3.527 7.306-3.131 7.472s1.946-1.151 2.811-3.214c0.864-2.063 0.829-4.044 0.32-4.258z"
                  fill="#d8d8d8"
                />
                <path
                  d="m286.1 104.11c-0.509-0.213-1.946 1.151-2.81 3.214-0.865 2.064-0.716 4.092-0.321 4.258 0.397 0.166 1.946-1.151 2.811-3.214s0.83-4.044 0.32-4.258z"
                  fill="#c1bdbc"
                />
                <path
                  d="m286.1 104.11c-0.509-0.213-3.527 7.306-3.131 7.472 0.397 0.166 1.946-1.151 2.811-3.214s0.83-4.044 0.32-4.258z"
                  fill="#d8d8d8"
                />
                <path
                  d="m368.07 107.65c-0.848-2.07-2.273-3.446-2.784-3.237-0.512 0.21-0.563 2.19 0.285 4.261 0.848 2.07 2.387 3.4 2.784 3.237 0.398-0.163 0.563-2.19-0.285-4.261z"
                  fill="#c1bdbc"
                />
                <path
                  d="m368.07 107.65c-0.848-2.07-2.273-3.446-2.784-3.237-0.512 0.21 2.672 7.66 3.069 7.498 0.398-0.163 0.563-2.19-0.285-4.261z"
                  fill="#d8d8d8"
                />
                <path
                  d="m285.64 141.4c-0.848-2.071-2.273-3.447-2.784-3.237-0.512 0.209-0.563 2.189 0.285 4.26 0.848 2.07 2.387 3.4 2.784 3.237 0.398-0.163 0.563-2.19-0.285-4.26z"
                  fill="#c1bdbc"
                />
                <path
                  d="m285.64 141.4c-0.848-2.071-2.273-3.447-2.784-3.237-0.512 0.209 2.672 7.66 3.069 7.497 0.398-0.163 0.563-2.19-0.285-4.26z"
                  fill="#d8d8d8"
                />
                <path
                  d="m346.23 164.72c-0.21-0.511-2.19-0.562-4.261 0.285-2.07 0.848-3.399 2.387-3.237 2.785 0.163 0.397 2.19 0.562 4.261-0.285 2.07-0.848 3.446-2.274 3.237-2.785z"
                  fill="#c1bdbc"
                />
                <path
                  d="m346.23 164.72c-0.21-0.511-7.66 2.672-7.498 3.069 0.163 0.398 2.19 0.563 4.261-0.285 2.07-0.847 3.446-2.273 3.237-2.784z"
                  fill="#d8d8d8"
                />
                <path
                  d="m312.48 82.288c-0.209-0.511-2.189-0.563-4.26 0.285-2.07 0.848-3.4 2.387-3.237 2.784 0.163 0.398 2.19 0.563 4.26-0.285 2.071-0.847 3.447-2.273 3.237-2.784z"
                  fill="#c1bdbc"
                />
                <path
                  d="m312.48 82.288c-0.209-0.511-7.66 2.672-7.497 3.069 0.163 0.398 2.19 0.563 4.26-0.285 2.071-0.847 3.447-2.273 3.237-2.784z"
                  fill="#d8d8d8"
                />
              </g>
              <g
                fill="#402217"
                font-family="'Pacifico'"
                font-size="30px"
                font-weight="400"
              >
                <text transform="matrix(1.933 0 0 1.933 83 180.12)">
                  Roulette
                </text>
                <text transform="matrix(1.933 0 0 1.933 83 114.87)">
                  Restaurant
                </text>
              </g>
            </g>
          </svg>
        </div>
      </span>
    );
  };

  render() {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let currentTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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
    if (this.state.showRestaurantInfo === true) {
      return (
        <div>
          <NavBar icon={this.icon} handleLogout={this.props.handleLogout} />
          <Route exact path="/preferences" component={Preferences} />
          <Route exact path="/logout" component={Logout} />
          <div>
            {this.state.showRestaurantInfo && (
              <RestaurantInfo
                randomMatch={this.state.randomMatch}
                latData={this.state.latData}
                longData={this.state.longData}
              />
            )}
          </div>
        </div>
      );
    }
    return (
      <Router>
        <div>
          <NavBar icon={this.icon} handleLogout={this.props.handleLogout} />
          <Route exact path="/preferences" component={Preferences} />
          <Route exact path="/logout" component={Logout} />

          <div>
            {/* <RestaurantInfo randomMatch={this.state.randomMatch} latData={this.state.latData} longData={this.state.longData}/> */}
            {this.state.showWaitingorRoulette && currentTime < "17:59:59" ? (
              <Waiting currentTime={currentTime} />
            ) : (
              <Roulette handleClick={this.handleClick} />
            )}
          </div>
        </div>
      </Router>
    );
  }
}
