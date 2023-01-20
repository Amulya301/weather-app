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
    <div className="home_page">
      <Header />
    <div className="home">
      <div className="tag-btn">
        <h2>Weather in your pockets directly in just few clicks!!</h2>
        <button className="btn" onClick={routeChange}>
          Explore
        </button>
      </div>
    </div>
    </div>
  );
};

export default Home;
