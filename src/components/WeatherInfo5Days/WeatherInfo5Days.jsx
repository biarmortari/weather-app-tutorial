import "./WeatherInfo5Days.css";

function WeatherInfo5Days({ weather5Days }) {
  let dailyForecast = {};

  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const nextFiveDays = Object.values(dailyForecast).slice(1, 6);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
    });

    return newDate;
  }

  return (
    <div className="weather_container">
      <h3>Previsão Próximos 5 Dias</h3>
      <div className="weather__list">
        {nextFiveDays.map((forecast) => (
          <div key={forecast.dt} className="weather_item">
            <p className="forecast_day">{convertDate(forecast)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            />
            <p className="forecast_description">
              {forecast.weather[0].description}
            </p>
            <p>
              {Math.round(forecast.main.temp_max)}ºC máx /
              {Math.round(forecast.main.temp_min)}ºC min
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInfo5Days;
