import { Serie, Hours, Sources } from '../types';

export const hoursToSerie = <H extends Hours, K extends keyof Omit<Hours, 'time'>, S extends keyof Sources>(hours: H[], metric: K, source: S, max = 6): Serie => {
  const dataset: Serie = {
      id: metric,
      data: []
  }

  hours.map((hour) => {
      const time = new Date(Date.parse(hour.time));
      const sources = hour[metric];

        if(sources) {

          const value = sources[source];

          if(value) {
            dataset.data.push({
              x: time,
              y: value
            });
          }
        }
    });

  return dataset;
}