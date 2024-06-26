import React, { useEffect, useState } from "react";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import WeatherDetails from "./components/WeatherDetails";
import Details from "./components/Details";
import Forecast from "./components/Forecast";
import ForecastDaily from "./components/ForecastDaily";
import { getFormattedWeatherData } from "./services/weatherService";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Map from "./components/Map";
import Alerts from "./components/Alerts";
import TopButtons from "./components/TopButtons";


const App = () => {
  const [city, setCity] = useState("Whitechapel");
  const [unit, setUnit] = useState("c");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData(city).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [city, unit]);

  const formatBackground = (weather) => {
    if (!weather) return "overview";
    return weather.is_day
      ? "day-background"
      : "night-background";
  };

  return (
      <body>
        <article>
          <div id="topBar">
            <Inputs setCity={setCity} unit={unit} setUnit={setUnit} />
            <TopButtons setCity={setCity} />
          </div>
          <section id="main">
            <div className={`background ${formatBackground(weather)}`}>
              {weather && (
                <>
                  <TimeAndLocation weather={weather} />
                  <TemperatureAndDetails weather={weather} unit={unit} />
                </>
              )}
            </div>
            <div id="info">
            {weather && (
                  <>
                    <Map weather={weather} />
                  </>
                )}
            </div>
            <div id="forecast">
              {weather && (
                  <>
                    <Details weather={weather} unit={unit} title={"Astro Details"}/>
                  </>
                )}
            </div>
            <div id="hours">
            {weather && (
                <Forecast
                  title="hourly forecast"
                  unit={unit}
                  forecast={weather.hourlyForecast}
                />
              )}
            </div>
            <div id="someInfo">
              {weather && (
                <>
                  <WeatherDetails weather={weather} unit={unit} title={"Extra Details"} />
                </>
              )}
            </div>
            <div id="future">
              {weather && (
                <ForecastDaily
                  title="10 Days"
                  unit={unit}
                  forecast={weather.dailyForecast}
                />
              )}  
            </div>
          </section>
          {weather && weather.alerts && <Alerts alerts={weather.alerts} />}
        </article>
        <ToastContainer />
      </body>
  );
};

export default App;
