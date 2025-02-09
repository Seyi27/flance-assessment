import HourlyForecastWidget from "../hourlyForecastCard/HourlyForecastCard";
import "./FiveDaysForecast.css";
import HorizontallyScrollable from "../HorizontallyScrollable";
import wind from "../../assets/wind.svg";
import humidity from "../../assets/humidity.png";

const FiveDaysForecast = ({ data, currentData }: any) => {
  const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIndex = new Date().getDay();

  // Get the next 5 days, replacing today with "Today"
  const forecastDays = Array.from({ length: 5 }, (_, i) =>
    i === 0 ? "Today" : WEEK_DAYS[(todayIndex + i) % 7]
  );

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="fiveDaysForecast">
      {/* 5-DAY FORECAST */}
      <div className="fivedaystable">
        <h3>5-DAY FORECAST</h3>
        <hr style={{ border: "1px solid #FFFFFF4D" }} />
        <div style={{ padding: "5px" }}></div>

        <div>
          {data.list.splice(0, 5).map((item: any, idx: any) => (
            <div className="day_forecast_item" key={idx}>
              <p>{forecastDays[idx]}</p>
              <img
                src={`icons/${item.weather[0].icon}.png`}
                className="icon_small"
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <p>{Math.round(item.main.temp_min)}°</p>
                <div className="meter"></div>
                <p>{Math.round(item.main.temp_max)}°</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Humidity */}
      <div className="others">
        <div className="others_header">
          <img src={humidity} />
          <p>HUMIDITY</p>
        </div>
        <div className="others_time">{currentData.main.humidity}%</div>
        <div style={{ padding: "50px" }}></div>
        <div className="others_bottom_text">The dew point is 6o right now.</div>
      </div>

      {/* Wind */}
      <div className="others">
        <div className="others_header">
          <img src={wind} />
          <p>WIND</p>
        </div>
        <div className="others_time">
          {currentData.wind.speed} <small>km/h</small>
        </div>
        <div style={{ padding: "50px" }}></div>
        <div className="others_bottom_text">
          Time now: {formatTimestamp(Math.floor(new Date().getTime() / 1000))}
        </div>
      </div>
    </div>

    //   <div className='fiveDaysForecast'>

    //   <div className='fivedaystable'>
    //     <h3>5-DAY FORECAST</h3>
    //     {/* <div style={{ padding: '1px' }} /> */}
    //     <hr style={{ border: '1px solid #FFFFFF4D' }} />
    //     {/* <div style={{ padding: '10px' }}></div> */}

    //     <div>

    //     </div>
    //   </div>

    //   <div className='others'>
    //     <div className='others_header'>
    //       <img src={humidity} />
    //       <p>HUMIDITY</p>
    //     </div>
    //     <div className='others_time'>
    //       00%
    //     </div>
    //     <div style={{ padding: '50px' }}></div>
    //     <div className='others_bottom_text'>The dew point is 6o right now.</div>
    //   </div>

    //   <div className='others'>
    //     <div className='others_header'>
    //       <img src={wind} />
    //       <p>WIND</p>
    //     </div>
    //     <div className='others_time'>
    //       20 <small>km/h</small>
    //     </div>
    //     <div style={{ padding: '50px' }}></div>
    //     <div className='others_bottom_text'>Time now: 12:00 PM</div>
    //   </div>
    // </div>
  );
};

export default FiveDaysForecast;
