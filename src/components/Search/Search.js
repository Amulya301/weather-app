import axios from "axios";
import React from "react";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "./Search.css";

const Search = ({ onSearchChange }) =>{
    const [search, setSearch] = useState({});

  const loadOptions = (inputValue, callback) => {
    if(!inputValue){
      return callback({});
    }
    
    const GeoApiOptions = {
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&sort=-population&limit=10&namePrefix=${inputValue}`,
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    return axios.request(GeoApiOptions)
    .then(function (response) {
      return{
        options: response.data.data.map((city) => {
          return{
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.region}`,
          }
        })
       
      }
    }).catch(function (error) {
      console.error(error);
    });
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
        debounceTimeout={600}
        inputValue={search}
        onChange={handleWeather}
        loadOptions={loadOptions}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'transparent',
            borderColor: 'black',
            borderRadius: '50px',
          }),
        }}
      />
      </div>
    )
}

export default Search;