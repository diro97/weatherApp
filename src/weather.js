import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './weather.css';

const APIKEY = '0134b7881a1bef53ef507a82e59c19c4';

const Weather = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const [showDetailedForecast, setShowDetailedForecast] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherAndForecastData = async () => {
    try {
     
      const weatherResponse = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
      );
      setData(weatherResponse.data);

      
      const forecastResponse = await Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`
      );

      setForecastData(forecastResponse.data);
      setError(''); 
    } catch (err) {
      setError('Error fetching data'); 
    }
  };

  const handleEnter = () => {
    if (!city) {
      setError('Please enter the city name.');
      setLoggedIn(false);
    } else {
      setError('');
      setLoggedIn(true);
      fetchWeatherAndForecastData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEnter();
  };

  useEffect(() => {
    if (loggedIn && city) {
      fetchWeatherAndForecastData();
    }
  }, [loggedIn, city]);

  return (
    <div className='Weather-App'>
      <h1 className='title'>Weather-App</h1>
      {!loggedIn ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='input-container'>
            <input
              type='text'
              className='input'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='Enter the city name'
            />
            <button className='enter-button' type="submit">
              Enter
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        <div>
          {data && (
            <div className='container'>
              <h1 className='city-name'>
                {data.name}, {data.sys.country}
              </h1>
              <div className='weather-info'>
                <div className='temp'>{Math.round(data.main.temp)} C</div>
                <div className='coordinates'>
                  <div>Lat - {data.coord.lat}</div>
                  <div>Lon - {data.coord.lon}</div>
                </div>
              </div>
            </div>
          )}

          {forecastData && (
            <div>
              <h2>Next Three Days Forecast</h2>
              {Array.from(new Set(forecastData.list.slice(0, 13).map(day => new Date(day.dt * 1000).toLocaleDateString()))).map(date => {
                const dayForecasts = forecastData.list.filter(day => new Date(day.dt * 1000).toLocaleDateString() === date);
                const averageTemp = dayForecasts.reduce((sum, day) => sum + day.main.temp, 0) / dayForecasts.length;

                return (
                  <div key={dayForecasts[0].dt}>
                    <p>Date: {new Date(dayForecasts[0].dt * 1000).toLocaleDateString()}</p>
                    <p>Average Temperature: {Math.round(averageTemp)} C</p>
                  </div>
                );
              })}

              <button onClick={() => setShowDetailedForecast(!showDetailedForecast)}>
                {showDetailedForecast ? 'Hide Details' : 'View More'}
              </button>

              {showDetailedForecast && forecastData.list && (
                <div>
                  <h2>Full Week Forecast</h2>
                  {Array.from(new Set(forecastData.list.map(day => new Date(day.dt * 1000).toLocaleDateString()))).map(date => {
                    const dayForecast = forecastData.list.find(day => new Date(day.dt * 1000).toLocaleDateString() === date);
                    return (
                      <div key={dayForecast.dt}>
                        <p>Date: {new Date(dayForecast.dt * 1000).toLocaleDateString()}</p>
                        <p>Temperature: {Math.round(dayForecast.main.temp)} C</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )
      }
    </div>
  );
};

export default Weather;
