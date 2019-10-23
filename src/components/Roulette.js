import React, { Component } from "react";

class Roulette extends Component {
  render() {
    return (
        <div>
        <div className="img-div">
          <img src="./roulette-svgrepo-com.svg" className="rotate" style={{ maxWidth: "650px", margin: "0 auto 0 auto" }}/>
        </div> 
      <h1>
        What's for Dinner?{" "}
        <button onClick={e => this.props.handleClick(e)}>Click Here</button>
      </h1>
      </div>
    );
  }
}

export default Roulette;
