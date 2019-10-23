import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state ={

        }
    }

    // componentDidMount() {
    //     fetch(URL)
    //     .then(resp => resp.json())
    //     .then(response => {

    //     })
    // }
    render() {
        return (
            <Map
            google={this.props.google}
            zoom={8}
            initialCenter={{ lat: 47.444, lng: -122.176}} >
                <Marker position={{ lat: 48.00, lng: -122.00}} />
            </Map>
        )
    }
};

export default GoogleApiWrapper({
    apiKey: apiKey
  })(MapContainer);