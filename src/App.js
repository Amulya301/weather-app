import React from "react";
import CurrentWeather from "./components/currentweather/currentWeather";
import "./App.css";
// import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/weather"
            element={<CurrentWeather key="weather" />}
          />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
