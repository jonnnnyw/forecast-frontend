
export interface Point {
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}
 
export interface Query {
  name: string;
  date: Date;
  lat: number;
  lng: number
}

export interface Forecast {
  readonly hours: Hours[];
  readonly meta: Meta;
}

export interface Meta {
  readonly dailyQuota: number;
  readonly lat: number;
  readonly lng: number;
  readonly requestCount: number;
}

export interface Hours {
  readonly time: string;
  readonly waveHeight?: Sources;
  readonly airTemperature?: Sources;
  readonly waterTemperature?: Sources;
  readonly windDirection?: Sources;
  readonly windSpeed?: Sources;
}

export interface Sources {
  readonly smhi?: string | number;
  readonly noaa?: string | number;
  readonly meteo?: string | number;
  readonly meto?: string | number;
}

export interface Serie {
  readonly id: string | number;
  readonly data: Datum[];
}

export interface Datum {
  readonly x: Date;
  readonly y: number | string;
}

export interface Range {
  data: { a: number, b: number, time: Date }[];
  boundaries: {
    a: Boundary;
    b: Boundary;
  }
}

export interface Boundary {
  min: number;
  max: number;
  range: number;
}