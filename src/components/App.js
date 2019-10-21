import React, { Component } from "react";
import NavBar from "./NavBar";
import RouletteContainer from "./RouletteContainer";
import RestaurantList from "./RestaurantList";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <RouletteContainer />
        <RestaurantList />
      </div>
    );
  }
}

export default App;
