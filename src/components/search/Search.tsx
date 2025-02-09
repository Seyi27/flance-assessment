import { useContext, useState } from "react";
import "./Search.css";
import { REACT_APP_API_KEY } from "../../api/api";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Search = ({ getAllWeatherData }: any) => {
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [openSearchResults, setOpenSearchResults] = useState(false);

  const searchPlaces = async (text: string) => {
    const options = {
      method: "GET",
      url: "https://ai-weather-by-meteosource.p.rapidapi.com/find_places",
      params: {
        text,
        language: "en",
      },
      headers: {
        "x-rapidapi-key": REACT_APP_API_KEY,
        "x-rapidapi-host": "ai-weather-by-meteosource.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = async (e: any) => {
    setText(e.target.value);
    const data = await searchPlaces(e.target.value);

    if (data) { // incase it is undefined or there is an error
      setSearchResults(data);
      setOpenSearchResults(data.length);
    } else {
      setSearchResults([]);
      setOpenSearchResults(false);
    }
  };

  const changePlace = (place: any) => {
    getAllWeatherData(place.lat.slice(0, -1), place.lon.slice(0, -1));
    setText("");
    setOpenSearchResults(false);
  };

  return (
    <>
      <div className="search-container">
        <div className="search-icon">
          <FaSearch/>
        </div>
        <div className="search-input">
          <input
            type="text"
            name="search-city"
            placeholder="Search location"
            value={text}
            onChange={onSearch}
          />
        </div>
      </div>

      {openSearchResults && (
        <div className="search-results">
          <div className="results-container">
            {searchResults.map((place: any, index: any) => (
              <div
                className="result"
                key={index}
                onClick={() => changePlace(place)}
              >
                {place.name}, {place.country}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
