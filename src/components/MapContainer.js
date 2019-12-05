import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button, Icon, Label } from "semantic-ui-react";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latData: "",
      longData: ""
    };
  }

  componentDidMount() {
    this.setState({
      latData: this.props.latData,
      longData: this.props.longData
    });
  }

  render() {
    return (
      <>
        <div>
          <Button as="div" labelPosition="right" style={{ width: auto }}>
            <Button color="pink">
              <Icon name="heart" />
              Like
            </Button>
            <Label as="a" basic color="pink" pointing="left">
              2,048
            </Label>
          </Button>
        </div>
        <Map
          style={{ width: "75%", height: "75%" }}
          google={this.props.google}
          zoom={18}
          center={{
            lat: parseFloat(this.props.latData),
            lng: parseFloat(this.props.longData)
          }}
        >
          <Marker
            position={{
              lat: parseFloat(this.props.latData),
              lng: parseFloat(this.props.longData)
            }}
          />
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);
