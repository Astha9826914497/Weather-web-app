import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
import { Sun } from 'phosphor-react';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSun, Snowflake, Wind } from "@phosphor-icons/react";


const dateBuilder = (d) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You should allow app to acces your location first!!!."
          );
        });
    } else {
      alert("Location not available!!!");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,

    });
    let weatherIcon;
    switch (this.state.main) {
      case "Haze":
        weatherIcon = <Sun size={32} color="#ffffff" />;
        break;
      case "Clouds":
        weatherIcon = <Cloud size={32} color="#ffffff" />;
        break;
      case "Rain":
        weatherIcon = <CloudRain size={32} color="#ffffff" />;
        break;
      case "Snow":
        weatherIcon = <Snowflake size={32} color="#ffffff" />;
        break;
      case "Dust":
        weatherIcon = <Wind size={32} color="#ffffff" />;
        break;
      case "Drizzle":
        weatherIcon = <CloudLightning size={32} color="#ffffff" />;
        break;
      case "Fog":
        weatherIcon = <CloudFog size={32} color="#ffffff" />;
        break;
      case "Smoke":
        weatherIcon = <CloudSun size={32} color="#ffffff" />;
        break;
      case "Tornado":
        weatherIcon = <Wind size={32} color="#ffffff" />;
        break;
      default:
        weatherIcon = <Sun size={32} color="#ffffff" />;
    }
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{this.props.searchedCity ||  this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
            <Sun size={48} />
              {" "}
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {this.state.temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forcast icon={this.state.icon} weather={this.state.main} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your current location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Current location will be displayed soon 
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
