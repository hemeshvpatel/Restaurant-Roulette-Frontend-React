import React, { Component } from "react";

class Roulette extends Component {
  render() {
    return (
        <div>
          <div>
            <h1>Go ahead, try your luck!</h1>
          </div>
        
        <div className="img-div">
          <img src="./roulette-svgrepo-com.svg" className="rotate" style={{ maxWidth: "650px", margin: "0 auto 0 auto" }} onClick={e => this.props.handleClick(e)}/>
        </div> 
      </div>
    );
  }
}

export default Roulette;
