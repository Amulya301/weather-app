import React, { useState } from "react";
import "./currentWeather.css";
import Card from "react-bootstrap/Card";
import Search from "../Search/Search";
import Forecast from "../forecast/forecast";
import Header from "../Header/Header";

const CurrentWeather = () => {

  const [currentWeather, setCurrentWeather] = useState();
  const [forecastWeather, setforecastWeather] = useState();
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

  const handleChange = (data) => {
    const[latitude, longitude] = data.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);

    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
    .then(async(response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      
      setCurrentWeather({ city: data.label, ...weatherResponse});
      setforecastWeather({ city: data.label, ...forecastResponse});
    })
    .catch((err) => console.log(err));

  };
 
  return (
    <div className="component">
      <Header />
      <Search key="search"onSearchChange={handleChange} />
      {currentWeather ? 
      <div className="weather">
        <Card>
          <Card.Body> 
            <div className="top">
              <div>
                 <p className="city">{currentWeather.city}</p> 
                 <p className="temp-description">{currentWeather.weather[0].description}</p> 
              </div>
              <img
                alt="weather"
                className="weather-img"
                src={`Weather_icons/${currentWeather.weather[0].icon}.png`}
              />
            </div>
            <div className="bottom">
              <p className="temperature">{Math.round(currentWeather.main.temp)}°C</p>
              <div className="forecast">
                <div className="row">
                  <span className="label">Feels like</span>
                  <span className="value">{Math.round(currentWeather.main.feels_like)}°C</span>
                </div>
                <div className="row">
                  <span className="label">Wind</span>
                  <span className="value">{currentWeather.wind.speed} m/s</span>
                </div>
                <div className="row">
                  <span className="label">Humidity</span>
                  <span className="value">{currentWeather.main.humidity}%</span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    :null
      }
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
};

export default CurrentWeather;
