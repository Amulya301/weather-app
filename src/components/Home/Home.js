import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Home.css";
const Home = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/weather";
    navigate(path);
  };
  return (
    <div>
      <Header />
    <div className="home">
      <img src="icons/girl.jpg" alt="weather" />
      <div className="tag-btn">
        <h1>Weather in your pockets directly in just few clicks!!</h1>
        <button className="btn" onClick={routeChange}>
          Explore
        </button>
      </div>
    </div>
    </div>
  );
};

export default Home;
