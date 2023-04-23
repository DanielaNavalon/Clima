import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCity } from './ciudades';

const API_KEY = '77129692856bc491031fea2705cd878e';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const images = ['/images/clima.jpg', '/images/clima.jpg', '/images/clima.jpg', '/images/clima.jpg', '/images/clima.jpg'];

  useEffect(() => {
    const fetchData = async () => {
      const cities = [];
      for (let i = 0; i < 5; i++) {
        const city = getCity();
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const imageIndex = Math.floor(Math.random() * images.length);
        cities.push({ ...response.data, imageIndex });
      }
      setWeatherData(cities);
      setLoading(false);
    };
    fetchData();
    

    
    const intervalId = setInterval(() => {
      setImageIndex((imageIndex + 1) % images.length);
    }, 5000);
    

    return () => clearInterval(intervalId);
  }, [imageIndex, images.length]);

  if (loading) {
    return <p></p>;
  }

  if (!weatherData) {
    return <p>No se ha cargado</p>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 16 }}>Clima</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
        {weatherData.map((data, index) => {
          const temperature = Math.round(data.main.temp - 273.15);
          const isThird = index === 2;
          return (
            <div key={index} className={isThird ? "third-item" : "non-third-item"} style={{ textAlign: 'center', width: 300 }}>
              <img src={images[data.imageIndex]} alt="Imagen" style={{ width: '100%', height: '200px', marginBottom: 16 }} />
              <h2 style={{ fontSize: 24, marginBottom: 8 }}>{data.name}</h2>
              <p style={{ fontSize: 16, marginBottom: 8 }}>{data.weather[0].description}</p>
              <p style={{ fontSize: 24 }}>{temperature}°C</p>
            </div>
          );
        })}
      </div>
      <style>
        {`
          .third-item {
            border: 2px solid blue;
          }
  
          .third-item:hover {
            background-color: lightblue;
          }
  
          .non-third-item {
            opacity: 0.5;
          }
        `}
      </style>
    </div>
  );
  

  
};

export default Weather;
