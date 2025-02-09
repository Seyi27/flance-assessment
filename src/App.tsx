import React, { useState } from "react";
import "./App.css";
import Main from "./components/main/Main";
import Search from "./components/search/Search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api/api";

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [forecast, setForecast] = useState();
  const [loader, setLoader] = useState(false);

  const getAllWeatherData = (lat: number, lon: number) => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeatherData({ ...weatherResponse });
        setForecast({ ...forcastResponse });

        setLoader(false);
      })
      .catch(console.log);
  };

  return (
    <div className="app">
      <div className="header">
        <Search getAllWeatherData={getAllWeatherData} />
      </div>

      <Main
        getAllWeatherData={getAllWeatherData}
        currentWeatherData={currentWeatherData}
        forecast={forecast}
        loader={loader}
        setLoader={setLoader}
      />
    </div>
  );
};

export default App;
