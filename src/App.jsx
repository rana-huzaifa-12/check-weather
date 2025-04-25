import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = "cc6d12c57550805f58a696c2dac07a6a";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError(null);

    } catch (error) {
      setError(err.message);
      setWeather(null);
    }
  }

  return (
    <>
      <div className="copyright">
        <h1>Made with <b>&#10084;</b> By <span>Rana Huzaifa</span> </h1>
        <div className="container">
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 className='app-name'> Check Current Weather</h1>

            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {weather && (
              <div style={{ marginTop: "20px" }}>
                <h2 className='text-color'>{weather.name}</h2>
                <p className='text-color'>{weather.main.temp}°C</p>
                <p className='text-color'>{weather.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default App
