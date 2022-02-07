
import { hoursToSerie } from './';
import { Forecast, Dataset } from '../types';

export const forecastToDataset = (forecast: Forecast): Dataset => {
  const hours = forecast.hours.map((hour) => new Date(hour.time));
      
  const swellHeight = hoursToSerie(forecast.hours, 'swellHeight', 'sg');
  const airTemperature = hoursToSerie(forecast.hours, 'airTemperature', 'sg');
  const waterTemperature = hoursToSerie(forecast.hours, 'waterTemperature', 'sg');
  const windDirection = hoursToSerie(forecast.hours, 'windDirection', 'sg');
  const windSpeed = hoursToSerie(forecast.hours, 'windSpeed', 'sg');

  const metrics = { 
    swellHeight, 
    airTemperature, 
    waterTemperature, 
    windSpeed, 
    windDirection 
  };

  return { hours, metrics, filtered: metrics };
}
