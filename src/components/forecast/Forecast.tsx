import "./Forecast.css";
import HorizontallyScrollable from "../HorizontallyScrollable";
import HourlyForecastCard from "../hourlyForecastCard/HourlyForecastCard";
import { useEffect, useState } from "react";

const Forecast = ({ data }: any) => {
  const [updatedData, setUpdatedData] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;

    const getRemainingHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const remainingHours = 24 - currentHour;
      const times = ["Now"];

      for (let i = 1; i < remainingHours; i++) {
        const hour = (currentHour + i) % 24;
        const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? "PM" : "AM";
        times.push(`${formattedHour} ${period}`);
      }

      return times;
    };

    const iconNumbers = ['01', '02', '03', '04', '09', '10', '11', '13', '50'];

    // Generate the updated data with spread operator
    const newData = getRemainingHours().map((time, index) => ({
      ...data[index % data.length],
      displayTime: time,
      icon: iconNumbers[index % iconNumbers.length],
    }));

    setUpdatedData(newData);
  }, [data]);

  return (
    <div className="forecast">
      <div className="forecast-container">
        <h3>CONDITION THROUGHOUT TODAY</h3>
        <hr style={{ border: "1px solid #FFFFFF4D" }} />
        <HorizontallyScrollable className="widget-container">
          {updatedData.map((singleData: any, index) => (
            <div key={index}>
              <HourlyForecastCard data={singleData} />
            </div>
          ))}
        </HorizontallyScrollable>
      </div>
    </div>
  );
};

export default Forecast;
