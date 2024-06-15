import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { MdAdd } from "react-icons/md";

import Footer from "./components/Footer.jsx";
import CitesCards from "./components/CitesCards.jsx";

const App = () => {
  const [city, setCity] = useState("");
  const [cites, setCites] = useState(() => {
    const savedCites = localStorage.getItem("cites");
    return savedCites ? JSON.parse(savedCites) : [];
  });
  const [addNewCity, setAddNewCity] = useState(false);
  const [night, setNight] = useState(false);
  const [weather, setWeather] = useState({});
  const [inp, setInput] = useState("");

  const handleCity = () => {
    const newCity = { id: uuidv4(), city: inp };
    const updatedCites = [...cites, newCity];
    setCites(updatedCites);
    localStorage.setItem("cites", JSON.stringify(updatedCites));
    setCity(inp);
    setAddNewCity(false);
  };

  const checkNightDay = (sunriseTime, sunsetTime) => {
    let currentDate = new Date();
    let currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

    let sunriseDate = new Date(sunriseTime * 1000);
    let sunriseTotalMinutes =
      sunriseDate.getHours() * 60 + sunriseDate.getMinutes();

    let sunsetDate = new Date(sunsetTime * 1000);
    let sunsetTotalMinutes =
      sunsetDate.getHours() * 60 + sunsetDate.getMinutes();

    if (
      currentTime >= sunsetTotalMinutes ||
      currentTime < sunriseTotalMinutes
    ) {
      setNight(true);
    } else {
      setNight(false);
    }
  };

  useEffect(() => {
    const key = "";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/weather?city=${
            !city ? "delhi" : city
          }`,
          {
            headers: {
              "X-Api-Key": key,
              "Content-Type": "application/json",
            },
          }
        );
        setWeather(response.data);
        checkNightDay(response.data.sunrise, response.data.sunset);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [city]);

  const sunSetTime = (timestep) => {
    const date = new Date(timestep * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  };
  console.log(cites);
  return (
    <>
      <h2 className="mt-8 m-auto w-full md:w-[80%] text-white font-bold text-2xl md:text-3xl capitalize px-4 md:px-0">
        Weather Forecast
      </h2>

      {cites.length > 0 ? (
        <CitesCards
          cites={cites}
          setCites={setCites}
          city={city}
          setCity={setCity}
        />
      ) : (
        ""
      )}

      {/* CITY INPUT */}
      {!addNewCity ? (
        <div className="m-auto w-full md:w-[80%] flex justify-end items-center px-4">
          <button
            className="cursor-pointer bg-white rounded-lg md:text-2xl text-xl p-2"
            onClick={() => setAddNewCity((e) => !e)}
          >
            <MdAdd />
          </button>
        </div>
      ) : (
        <div className="container grid grid-cols-1 gap-4 m-auto w-full md:w-[80%] py-4 px-4 md:px-0">
          <input
            placeholder="Enter your city"
            type="text"
            className="border bg-[transparent] rounded-lg py-2 px-4"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="cursor-pointer rounded-lg py-2 px-4 border"
            onClick={handleCity}
          >
            Add
          </button>
        </div>
      )}

      <div className="container grid grid-cols-1 m-auto w-full md:w-[80%] py-4 px-4 md:px-0">
        {/* main dashboard */}
        <div className="box flex justify-between items-center gap-4 py-8 px-6">
          <div>
            <span className="title uppercase font-semibold text-xl">
              {!city ? "delhi" : city}
            </span>
            <p className="mt-6 text-6xl">
              {weather.temp}
              <sup>°</sup> C
            </p>
          </div>
          <div className="w-[100px]">
            {night ? (
              <img src="/night.png" alt="night" />
            ) : (
              <img src="/sun.png" alt="day" />
            )}
          </div>
        </div>

        {/* all other details */}
        <div className="box grid grid-cols-2 gap-8 py-8 px-6 mt-6">
          <div>
            <span className="title font-semibold text-xl">Real feel</span>
            <p className="mt-1 md:mt-2 text-sm md:text-lg">
              {weather.feels_like}
              <sup>°</sup> C
            </p>
          </div>
          <div>
            <span className="title font-semibold text-xl">Humidity</span>
            <p className="mt-1 md:mt-2 text-sm md:text-lg">
              {weather.humidity} %
            </p>
          </div>
          <div>
            <span className="title font-semibold text-xl">Wind speed</span>
            <p className="mt-1 md:mt-2 text-sm md:text-lg">
              {weather.wind_speed} KM/H
            </p>
          </div>
        </div>

        {/* all other details */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="box flex justify-start items-center md:py-8 py-4 px-4 md:px-6">
            <div>
              <span className="title font-semibold text-xl">Sun rise</span>
              <p className="mt-1 md:mt-2 text-sm md:text-lg">
                {sunSetTime(weather.sunrise)} AM
              </p>
            </div>
          </div>
          <div className="box flex justify-start items-center md:py-8 py-4 px-4 md:px-6">
            <div>
              <span className="title font-semibold text-xl">Sun set</span>
              <p className="mt-1 md:mt-2 text-sm md:text-lg">
                {sunSetTime(weather.sunset)} PM
              </p>
            </div>
          </div>
          <div className="box flex justify-start items-center md:py-8 py-4 px-4 md:px-6">
            <div>
              <span className="title font-semibold text-xl">Current time</span>
              <p className="mt-1 md:mt-2 text-sm md:text-lg">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
