import useSWR from 'swr';

import { Forecast,  Query } from '../types';

const fetcher = (resource: string) => fetch(resource)
  .then(res => res.json());

 export const useForecast = (query: Query) => {
  const { data, error } = useSWR<Forecast>(`${process.env.NEXT_PUBLIC_ENDPOINT}/forecast.json?time=${query.date.getTime()}&lat=${query.lat}&lng=${query.lng}`, fetcher)

  return {
    forecast: data,
    isLoading: !error && !data,
    isError: error
  }
}