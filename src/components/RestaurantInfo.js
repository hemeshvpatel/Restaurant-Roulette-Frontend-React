import React, { Component } from "react";
import MapContainer from './MapContainer'
import Restaurant from './Restaurant'

class RestaurantInfo extends Component {
    constructor(props){
        super(props)
        
        this.state = {

        };

    }
  
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col">
          <Restaurant restaurant={this.props.randomMatch}/>
          </div>
          <div class="col">
          <script type='text/javascript' src="//www.opentable.com/widget/reservation/loader?rid=412810&type=standard&theme=standard&iframe=true&domain=com&lang=en-US&newtab=false"></script>
          </div>
          </div>
          <div>
          <MapContainer latData={this.props.latData} longData={this.props.longData} />
          </div>
      </div>
    );
  }
}

export default RestaurantInfo;
