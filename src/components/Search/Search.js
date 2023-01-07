import React from "react";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { url, geoApiOptions } from "../../geoapi";
import "./Search.css";

const Search = ({ onSearchChange }) =>{
    const [search, setSearch] = useState("");

  const loadOptions = async (city) => {
    console.log(geoApiOptions);
    try {
      const response = await fetch(
        `${url}/cities?minPopulation=100&limit=10&sort=-population&namePrefix=${city}`,
        geoApiOptions
      );
      const response_1 = await response.json();
      return {
        options: response_1.data.map((data) => {
          return {
            value: `${data.latitude} ${data.longitude}`,
            label: `${data.name}, ${data.region}`,
          };
          
        }),
      };
    } catch (err) {
      return console.error(err);
    }
  };

  const handleWeather = (data) => {
    setSearch(data);
    onSearchChange(data);
  };
    return(
        <div className="navbar">
      <AsyncPaginate
      defaultOptions
        className="search"
        placeholder="Search for a city"
        debounceTimeout={100}
        value={search}
        onChange={handleWeather}
        loadOptions={loadOptions}
      />
      </div>
    )
}

export default Search;