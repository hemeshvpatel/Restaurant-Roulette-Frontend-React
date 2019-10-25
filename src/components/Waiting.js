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
          <span className="header" style={{ fontSize: '100px', font: 'Gudea' }}>
            {hours}:{minutes}:{seconds} <br />
            <h1 className="header" style={{ fontSize: '75px'}}>Come back soon!</h1>
          </span>
        );
      }
    };

    //time conversion
    let today = new Date();
    let currenTimeMinutes =
      today.getHours() * 60 + today.getMinutes() + today.getSeconds() / 60;
    // console.log("Hours = ", today.getHours());
    // console.log("Minutes = ", today.getMinutes());
    // console.log("Seconds = ", today.getSeconds());
    // console.log("Datenow fxn = ", Date.now());
    // console.log("CurrentTimeMin = ", currenTimeMinutes);
    let fourpm = 15 * 60 + 59 + 59 / 60;
    let sixpm = 17 * 60 + 59 + 59 / 60;

    const diffmin = sixpm - currenTimeMinutes;
    // console.log("diffmin = ", sixpm - currenTimeMinutes);
    const diffmili = diffmin * 60000;
    // console.log("difmili ", diffmili);

    return (
      <div>
        <div align="center">
          <Countdown date={Date.now() + 2000} renderer={renderer} />
        </div>
        {/* <Countdown date={Date.now() + diffmili} renderer={renderer} /> */}
      </div>
    );
  }
}

export default Waiting;
