// const checkNightDay = (sunsetTime) => {
//     let currentDate = new Date();
//     let currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
//     let sunsetDate = new Date(sunsetTime * 1000);
//     let sunsetHours = sunsetDate.getHours();
//     let sunsetMinutes = sunsetDate.getMinutes();
//     let sunsetTotalMinutes = sunsetHours * 60 + sunsetMinutes;
    
    
//       if(currentTime < sunsetTotalMinutes){
//       setNight(true)
//       }else{
//       setNight(false)
//       }
      
//   };
  
  
  
  
//   const checkNightDay = (sunset, sunrise) => {
//   // current time
//   let currentDate = new Date();
//     let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
  
//     let sunsetTime = new Date(sunset * 1000);
//     let sunriseTime = new Date(sunrise * 1000);
   
//     let sunsetHour = sunsetTime.getHours();
//     let sunriseHour = sunriseTime.getHours();
    
//     let sunsetMin = sunsetTime.getMinutes();
//     let sunriseMin = sunriseTime.getMinutes();
    
//     let sunSetTime = sunsetHour + ":" + sunsetMin;
//     let sunRiseTime = sunriseHour + ":" + sunriseMin;
    
//   if(sunSetTime > currentTime && sunRiseTime < currentTime){
//     setNight(true)
//   }
//       return currentTime
//   };
  
  
//   // brazil
//   // algeria
//   // china
//   // canada



import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import { MdAdd } from "react-icons/md";

import Footer from "./components/Footer.jsx";

const App = () => {
  const [addNewCity, setAddNewCity] = useState(false);
  const [night, setNight] = useState(false);
  const [weather, setWeather] = useState({});
  const [inp, setInput] = useState("");
  
  const [city, setCity] = useState(() => {
    const saveCity = localStorage.getItem("city");
    return saveCity ? JSON.parse(saveCity) : "delhi";
  });
  const [cites,setCites]=useState("")

  const handleCity = () => {
    setCity(inp);
    localStorage.setItem("city", JSON.stringify(inp));
    setAddNewCity(e => !e);
  };

const checkNightDay = (sunriseTime, sunsetTime) => {
  let currentDate = new Date();
  let currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
  // let currentTime = "4:58"

  let sunriseDate = new Date(sunriseTime * 1000);
  let sunriseTotalMinutes = sunriseDate.getHours() * 60 + sunriseDate.getMinutes();

  let sunsetDate = new Date(sunsetTime * 1000);
  let sunsetTotalMinutes = sunsetDate.getHours() * 60 + sunsetDate.getMinutes();

  if (currentTime >= sunsetTotalMinutes || currentTime < sunriseTotalMinutes) {
    setNight(night);
  } else {
    setNight(!night);
  }
};

  useEffect(() => {
    const key = "MaKqdc/dF+xY+OvUVzZhSQ==gxGnCMwySRk2XHfE";
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
          headers: {
            'X-Api-Key': key,
            'Content-Type': 'application/json',
          },
        });
        setWeather(response.data);
        checkNightDay(response.data.sunset);
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
console.log(cites)
  return (
    <>
      <h2 className="mt-8 m-auto w-full md:w-[80%] text-white font-bold text-2xl md:text-3xl capitalize px-4 md:px-0">
        Weather Forecast
      </h2>

      {/* CITY INPUT */}
      {!addNewCity ? (
        <div className="m-auto w-full md:w-[80%] flex justify-end items-center px-4">
          <button className="cursor-pointer bg-white rounded-lg md:text-2xl text-xl p-2" onClick={() => setAddNewCity(e => !e)}>
            <MdAdd />
          </button>
        </div>
      ) : (
        <div className="container grid grid-cols-1 gap-4 m-auto w-full md:w-[80%] py-4 px-4 md:px-0">
          <input
            placeholder="Enter your city"
            type="text"
            className="border bg-[transparent] rounded-lg py-2 px-4"
            onChange={e => setInput(e.target.value)}
          />
          <button className="cursor-pointer rounded-lg py-2 px-4 border" onClick={handleCity}>
            Add
          </button>
        </div>
      )}

      <div className="container grid grid-cols-1 m-auto w-full md:w-[80%] py-4 px-4 md:px-0">
        {/* main dashboard */}
        <div className="box flex justify-between items-center gap-4 py-8 px-6">
          <div>
            <span className="title uppercase font-semibold text-xl">{city}</span>
            <p className="mt-6 text-6xl">{weather.temp}<sup>°</sup> C</p>
          </div>
          <div className="w-[100px]">
            {night ? 
              <img src="/night.png" alt="night" /> :
              <img src="/sun.png" alt="day" />
            }
          </div>
        </div>
        
        {/* all other details */}
        <div className="box grid grid-cols-2 gap-8 py-8 px-6 mt-6">
          <div>
            <span className="title font-semibold text-xl">Real feel</span>
            <p className="mt-1 md:mt-2 text-sm md:text-lg">{weather.feels_like}<sup>°</sup> C</p>
          </div>
          <div>
            <span className="title font-semibold text-xl">Humidity</span>
            <p className="mt-1 md:mt-2 text-sm md:text-lg">{weather.humidity} %</p>
          </div>
          <div>
            <span className="title font-semibold text-xl">Wind speed</span>
            <p className="mt-1 md:mt-2 text-sm md:text-lg">{weather.wind_speed} KM/H</p>
          </div>
        </div>

        {/* all other details */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="box flex justify-start items-center md:py-8 py-4 px-4 md:px-6">
            <div>
              <span className="title font-semibold text-xl">Sun rise</span>
              <p className="mt-1 md:mt-2 text-sm md:text-lg">{sunSetTime(weather.sunrise)} AM</p>
            </div>
          </div>
          <div className="box flex justify-start items-center md:py-8 py-4 px-4 md:px-6">
            <div>
              <span className="title font-semibold text-xl">Sun set</span>
              <p className="mt-1 md:mt-2 text-sm md:text-lg">{sunSetTime(weather.sunset)} PM</p>
            </div>
          </div>
          <div className="box flex justify-start items-center md:py-8 py-4 px-4 md:px-6">
            <div>
              <span className="title font-semibold text-xl">Current time</span>
              <p className="mt-1 md:mt-2 text-sm md:text-lg">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default App;
