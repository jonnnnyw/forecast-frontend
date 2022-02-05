import type { NextApiRequest, NextApiResponse } from 'next';

import { Forecast } from '../../../../../../types';

const handler = (req: NextApiRequest, res: NextApiResponse<Forecast>) => {
  res.status(200).json({
    hours: [
      {
        time: "2022-01-19T05:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.2,
        },
      },
      {
        time: "2022-01-19T06:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.9,
        },
      },
      {
        time: "2022-01-19T07:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.7,
        },
      },
      {
        time: "2022-01-19T08:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.1,
        },
      },
      {
        time: "2022-01-19T09:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.3,
        },
      },
      {
        time: "2022-01-19T10:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.4,
        },
      },
      {
        time: "2022-01-19T11:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.7,
        },
      },
      {
        time: "2022-01-19T12:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.9,
        },
      },
      {
        time: "2022-01-19T13:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 2.4,
        },
      },
      {
        time: "2022-01-19T14:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.8,
        },
      },
      {
        time: "2022-01-19T15:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.3,
        },
      },
      {
        time: "2022-01-19T16:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 4.3,
        },
      },
      {
        time: "2022-01-19T17:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 2.3,
        },
      },
      {
        time: "2022-01-19T18:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 2.7,
        },
      },
      {
        time: "2022-01-19T19:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 1.7,
        },
      },
      {
        time: "2022-01-19T20:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 5.2,
        },
      },
      {
        time: "2022-01-19T21:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 4.3,
        },
      },
      {
        time: "2022-01-19T22:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 4.3,
        },
      },
      {
        time: "2022-01-19T23:00:00+13:00",
        waterTemperature: {
          meto: -2.6,
        },
        waveHeight: {
          noaa: 2.1,
          meteo: 4.4,
        },
      }
    ],
    meta: {
      dailyQuota: 50,
      lat: 58.7984,
      lng: 17.8081,
      requestCount: 1
    }
  })
}

export default handler;