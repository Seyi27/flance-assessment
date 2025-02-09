import { useContext } from "react";
import "./HourlyForecastCard.css";

const HourlyForecastCard = ({ data }: any) => {
  return (
    <div className="widget">
      <div className='time'>{data.displayTime}</div>
      <div className="icon-temp">
        <div className="icon">
          <img src={`icons/${data.icon}d.png`} />
        </div>
        <div className="hourly_temperature">{Math.round(data.temperature)}°</div>
      </div>
    </div>
  );
};

export default HourlyForecastCard;
