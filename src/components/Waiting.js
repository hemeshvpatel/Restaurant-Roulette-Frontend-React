import React, { Component } from "react";

class Waiting extends Component {
  render() {
    return (
      <div>
        <h1> Oops! Gonna have to wait until 4pm :( </h1>
        <h2>You only have ____ left!</h2>
        {/* implement countdown timer until 3:59:59 */}
      </div>
    );
  }
}

export default Waiting;
