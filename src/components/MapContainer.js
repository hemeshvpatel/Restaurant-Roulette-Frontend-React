import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;


class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latData: '',
            longData: ''
        }
    }

    componentDidMount() {
        this.setState({ 
            latData : this.props.latData,
            longData: this.props.longData
        })
    }

    render() {
        return (
            <Map
            style={{ width: '75%', height: '75%' }}
            google={this.props.google}
            zoom={18}
            center={{ lat: parseFloat(this.props.latData), lng: parseFloat(this.props.longData) }} >
                <Marker position={{ lat: parseFloat(this.props.latData), lng: parseFloat(this.props.longData) }} />
            </Map>
        )
    }
};

export default GoogleApiWrapper({
    apiKey: apiKey
  })(MapContainer);