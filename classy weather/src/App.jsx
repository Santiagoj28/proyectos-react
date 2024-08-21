import { useEffect } from "react";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  async function getWeatherr(location) {
    try {
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      console.log(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData.daily);
    } catch (err) {
      console.err(err);
    }
  }

  const handleGetWeather = () => {
    const getWeather = async () => {
      try {
        setIsLoading(true);
        setError("");

        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}`
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);
        setLocation(`${name} ${country_code}`);

        console.log(`${name} ${convertToFlag(country_code)}`);
        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        setError(weatherData);
        setWeather(weatherData.daily);
        setError("");
      } catch (error) {
        setError(error.reason);
      } finally {
        setIsLoading(false);
      }
    };
    if (search.length < 3) {
      setError("");
      setWeather([]);
      return;
    }

    getWeather();
  };

  return (
    <>
      <div className="app">
        <h1>Classy Weathers</h1>
        <input
          type="text"
          placeholder="Search for location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="button" onClick={() => handleGetWeather()}>
          Get Weather
        </button>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && <Box weathers={weather} location={location} />}
      </div>
    </>
  );
}

const ErrorMessage = ({ message }) => {
  return (
    <>
      <p className="error">
        <span>⛔</span>
        {message}
      </p>
    </>
  );
};
const Loader = () => {
  return (
    <>
      <p>Loading...</p>
    </>
  );
};
const Box = ({ weathers, location }) => {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weathers;
  console.log(dates);
  return (
    <div className="card">
      <h2>{location}</h2>
      <ul className="weather">
        {dates?.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
};
const Day = ({ date, max, min, code, isToday }) => {
  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }
  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)} &deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
};

export default App;
