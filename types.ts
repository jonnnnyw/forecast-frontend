
export interface Point {
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}
 
export interface Query {
  date: string;
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
  readonly [index: string]: Sources;
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