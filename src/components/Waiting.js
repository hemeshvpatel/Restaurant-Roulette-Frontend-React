import React, { Component } from "react";

class Waiting extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div>
        <div className="img-div">
          <img src="./roulette-svgrepo-com.svg" className="rotate" style={{ maxWidth: "650px", margin: "0 auto 0 auto" }}/>
        </div> 
        <h1> Oops! Gonna have to wait until 4pm :( </h1>
        <h2>You only have ____ left!</h2>
        {/* implement countdown timer until 3:59:59 */}
      </div>
    );
  }
}

export default Waiting;
