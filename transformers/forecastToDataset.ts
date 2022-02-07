
import { hoursToSerie } from './';
import { Forecast, Dataset } from '../types';

export const forecastToDataset = (forecast: Forecast): Dataset => {
  const hours = forecast.hours.map((hour) => new Date(hour.time));
      
  const waveHeight = hoursToSerie(forecast.hours, 'waveHeight', 'meteo');
  const airTemperature = hoursToSerie(forecast.hours, 'airTemperature', 'noaa');
  const waterTemperature = hoursToSerie(forecast.hours, 'waterTemperature', 'noaa');
  const windDirection = hoursToSerie(forecast.hours, 'windDirection', 'noaa');
  const windSpeed = hoursToSerie(forecast.hours, 'windSpeed', 'noaa');

  const metrics = { 
    waveHeight, 
    airTemperature, 
    waterTemperature, 
    windSpeed, 
    windDirection 
  };

  return { hours, metrics, filtered: metrics };
}
