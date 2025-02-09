import "./Main.css";
import CurrentWeather from "../currentWeather/CurrentWeather";
import Forecast from "../forecast/Forecast";
import { useContext, useEffect, useState } from "react";
import FiveDaysForecast from "../fiveDaysForecast/FiveDaysForecast";
import hourlyWeatherWather from "../../api/hourly-forecast.json";

const Main = ({
  getAllWeatherData,
  currentWeatherData,
  forecast,
  loader,
  setLoader,
}: any) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<null | string>("");

  useEffect(() => {
    setLoader(true);

    // Get the lat and lon for the user's current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          // Get the data based on user location
          getAllWeatherData(
            position.coords.latitude,
            position.coords.longitude
          );

          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  console.log("location", location);
  console.log("currentwWeather", currentWeatherData);
  console.log("forecast", forecast);

  return (
    <div className="main">
      {loader ? (
        <p style={{ color: "white" }}>Loading...</p>
      ) : (
        <>
          {currentWeatherData && <CurrentWeather data={currentWeatherData} />}

          <Forecast
            data={hourlyWeatherWather.hourly.data}
          />

          {currentWeatherData && (
            <FiveDaysForecast
              data={forecast}
              currentData={currentWeatherData}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Main;
