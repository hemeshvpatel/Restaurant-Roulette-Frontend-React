import React, { Component } from "react";

class Weather extends Component {
  state = {
    weather: "",
    temperature: 0
  };

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather = () => {
    // PLEASE UNCOMMENT THE FOLLOWING LINE AS A CORS WORK AROUND.
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    console.log(apiKey);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.props.latData}&lon=${this.props.longData}&APPID=${apiKey}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(weatherData => {
        //console.log("Weather Data = ", weatherData);
        this.setState({
          weather: weatherData,
          temperature: weatherData.main.temp
        });
      });
  };

  //http://openweathermap.org/img/w/10d.png <<change with icon data

  render() {
    //console.log("Weather Component State: ", this.state.weather.main);
    const tempF = (9 / 5) * (parseFloat(this.state.temperature) - 273) + 32;
    // if (this.state.weather !== "") {
    return (
      <div>
        <h3>Weather</h3>
        <p>Feels like {tempF.toFixed(0)} degrees</p>
        {/* <h5>{this.state.weather && this.state.weather.weather[0].main}</h5> */}
        <p>Looks like {this.state.weather && this.state.weather.weather[0].description}</p>
      </div>
    );
  }
}
// }

export default Weather;
