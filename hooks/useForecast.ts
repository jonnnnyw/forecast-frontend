import useSWR from 'swr';

import { Forecast,  Query } from '../types';

const fetcher = (resource: string) => fetch(resource)
  .then(res => res.json());

 export const useForecast = (query: Query) => {
  const { data, error } = useSWR<Forecast>(`/api/forecasts/${query.date}/${query.lat}/${query.lng}`, fetcher)

  return {
    forecast: data,
    isLoading: !error && !data,
    isError: error
  }
}