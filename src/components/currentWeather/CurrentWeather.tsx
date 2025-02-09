import { useContext, useState } from "react";
import "./CurrentWeather.css";
import sunshine from "../../assets/sunshine.png";
import raindrop from "../../assets/rainfall.svg";
import sunshine_mid from "../../assets/sunshine_mid_img.png";
import { FaMapMarkerAlt } from "react-icons/fa";

const CurrentWeather = ({ data }: any) => {
  const [toFahrenheit, setToFahrenheit] = useState(false);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  // console.log(formatTimestamp(1738908202));

  return (
    <div className="currentWeather">
      {/* Temperature */}
      <div className="currentweather_temperature">
        <div style={{ padding: "10px" }}></div>

        <div className="weather-icon">
          <img
            src={`icons/${data.weather[0].icon}.png`}
            className="current_image"
          />
        </div>
        <div className="value">
          <div className="real">
            {toFahrenheit
              ? `${celsiusToFahrenheit(data.main.temp)} °F`
              : `${Math.round(data.main.temp)} °C`}
          </div>
          <div
            className="toFahrenheitContainer"
            onClick={() => setToFahrenheit(!toFahrenheit)}
          >
            {toFahrenheit ? <p>To celsius</p> : <p>To farenheit</p>}
          </div>
        </div>
        <div className="description">
          <img
            src={`icons/${data.weather[0].icon}.png`}
            style={{
              width: "35px",
              height: "35px",
              objectFit: "contain",
            }}
          />
          {/* to make the first letter uppercase */}
          {data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1)} 
        </div>
        <div className="place">
          <FaMapMarkerAlt />
          {"  "}
          <b>{data.name}</b>, {data.sys.country}
        </div>
      </div>

      {/* SUNRISE */}
      <div className="others">
        <div className="others_header">
          <img src={sunshine} className="sunshine_image" />
          <p>SUNRISE</p>
        </div>
        <div className="others_time">{formatTimestamp(data.sys.sunrise)}</div>
        <div style={{ padding: "20px" }}></div>
        <img src={sunshine_mid} />
        <div style={{ padding: "10px" }}></div>
        <div className="others_bottom_text">
          Sunset: {formatTimestamp(data.sys.sunset)}
        </div>
      </div>

      {/* RAINFALL */}
      <div className="others">
        <div className="others_header">
          <img src={raindrop} />
          <p>RAINFALL</p>
        </div>
        <div className="others_time">
          0 mm
          <p>in last 24h</p>
        </div>
        <div style={{ padding: "40px" }}></div>
        <div className="others_bottom_text">Next expected is 1.2mm on Fri.</div>
      </div>
    </div>
  );
};

export default CurrentWeather;
