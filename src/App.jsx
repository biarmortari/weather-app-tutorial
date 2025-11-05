import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo.jsx";
import WeatherInfo5Days from "./components/WeatherInfo5Days/WeatherInfo5Days.jsx";

function App() {
  const [weather, setWeather] = useState({});
  const [weather5Days, setWeather5Days] = useState();

  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "f42ad1f22fc352fd5f682cf50a37c48d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const dataWeather = await axios.get(url);
    const dataWeather5Days = await axios.get(url5days);

    console.log(dataWeather5Days);

    setWeather5Days(dataWeather5Days.data);
    setWeather(dataWeather.data);
  }

  return (
    <>
      <div className="container">
        <h1>Previsão do Tempo</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite o nome da cidade"
        />
        <button onClick={searchCity}>Buscar</button>
        {weather && weather.weather ? <WeatherInfo weather={weather} /> : ""}
        {weather5Days && <WeatherInfo5Days weather5Days={weather5Days} />}
      </div>
    </>
  );
}

export default App;
