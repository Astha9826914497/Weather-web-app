// file for bar against city

import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSun, Drop, DropHalfBottom, Eye, Snowflake, Sun, Wind } from "@phosphor-icons/react";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(query);
    }
  };
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  // color of main icon
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search city"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            value={query}
          />
          <div className="img-box">
            {" "}
            {/* search icon */}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
            />
          </div>
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>

              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li className="temperature-icon">
                Temperature{"           "}
                <span className="icon">
                  {Math.round(weather.main.temp)}°c{" "}
                  {weather.weather[0].main === "Haze" && (
                    <Sun size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Clouds" && (
                    <Cloud size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Rain" && (
                    <CloudRain size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Snow" && (
                    <Snowflake size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Dust" && (
                    <Wind size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Drizzle" && (
                    <CloudLightning size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Fog" && (
                    <CloudFog size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Smoke" && (
                    <CloudSun size={32} color={defaults.color} />
                  )}
                  {weather.weather[0].main === "Tornado" && (
                    <Wind size={32} color={defaults.color} />
                  )}
                </span>
              </li>
              <li>
                Overall Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Windy Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
              <li>
                
              </li>
              <li>
                Sunrise: <span className="temp">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span>
              </li>
              <li>
                Sunset: <span className="temp">{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
