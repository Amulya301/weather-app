import React from "react";
import "./forecast.css";

const Forecast = ({ data }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  const dayInWeek = new Date().getDay();
  const nextDays = days.slice(dayInWeek, days.length).concat(days.slice(0, dayInWeek));

  return (
    <div>
      <ul className="forecast-list">
        {data.list.splice(0, 7).map((item, index) => {
          return (
            <div className="box-list" key={index}>
                <h1>{nextDays[index]}</h1>
                <img
                      alt="weather"
                      className="icons"
                      src={`weather_icons/${item.weather[0].icon}.png`}
                    />
                <span className='temp'>{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</span>
                </div>
          );
        
        })}
        </ul>
    </div>
  );
};

export default Forecast;
