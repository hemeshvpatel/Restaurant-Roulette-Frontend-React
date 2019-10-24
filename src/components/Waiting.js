import React, { Component } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";
import RestaurantInfo from "./RestaurantInfo";
import Roulette from "./Roulette";

class Waiting extends Component {
  render() {
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Roulette handleClick={this.props.handleClick} />;
      } else {
        // Render a countdown
        return (
          <span>
            {hours}:{minutes}:{seconds}
          </span>
        );
      }
    };

    //time conversion
    let today = new Date();
    let currenTimeMinutes =
      today.getHours() * 60 + today.getMinutes() + today.getSeconds() / 60;
    console.log("Hours = ", today.getHours());
    console.log("Minutes = ", today.getMinutes());
    console.log("Seconds = ", today.getSeconds());
    console.log("Datenow fxn = ", Date.now());
    console.log("CurrentTimeMin = ", currenTimeMinutes);
    let fourpm = 15 * 60 + 59 + 59 / 60;
    let sixpm = 17 * 60 + 59 + 59 / 60;

    const diffmin = sixpm - currenTimeMinutes;
    console.log("diffmin = ", sixpm - currenTimeMinutes);
    const diffmili = diffmin * 60000;
    console.log("difmili ", diffmili);

    return (
      <div align="center">
        <h1> Come Back in ... </h1>
        {/* <Countdown date={Date.now() + diffmili} renderer={renderer} /> */}
        <Countdown date={Date.now() + 5000} renderer={renderer} />
      </div>
    );
  }
}

export default Waiting;
