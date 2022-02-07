import { Serie, Range } from '../types';

export const serieToRange = (serieA: Serie, serieB: Serie): Range => {
  const data: { a: number, b: number, time: Date }[] = [];

  const minA = serieA.data.reduce((prev, next) => next.y < prev.y ? next : prev);
  const maxA = serieA.data.reduce((prev, next) => next.y > prev.y ? next : prev);
  const minB = serieB.data.reduce((prev, next) => next.y < prev.y ? next : prev);
  const maxB = serieB.data.reduce((prev, next) => next.y > prev.y ? next : prev);

  serieA.data.map((datum) => {
      data[datum.x.getTime()] = { a: Number(datum.y), b: 0, time: datum.x };
  });

  serieB.data.map((datum) => {
      const existing = data[datum.x.getTime()] ?? { a: 0, b: 0, time: datum.x };
      data[datum.x.getTime()] = { ...existing, b: Number(datum.y) };
  });

  return {
      data: Object.values(data),
      boundaries: {
        a: { min: Number(minA.y), max: Number(maxA.y), range: Number(maxA.y) - Number(minA.y) },
        b: { min: Number(minB.y), max: Number(maxB.y), range: Number(maxB.y) - Number(minB.y) }
      }
  };
}
