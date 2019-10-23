import React, { Component } from "react";
import MapContainer from './MapContainer'

class RestaurantInfo extends Component {
    constructor(props){
        super(props)
        
        this.state = {

        };

    }
  
  render() {
    return (
      <div>
        <h1>Restaurant Info Screen</h1>
        <h2>{this.props.randomMatch.name}</h2>
        <MapContainer latData={this.props.latData} longData={this.props.longData}/>
      </div>
    );
  }
}

export default RestaurantInfo;
