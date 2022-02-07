import { Serie } from "../types";

type Data = {
  [index: string]: Serie;
}

/**
 * Filter datum in a serie 
 * by time.
 */
export const filterDatumByTime = (times: number[], data: Data): Data => {

  if(!times.length) {
    return data;
  }

  const filtered: Data = {};
  for (const [key, serie] of Object.entries(data)) {
    filtered[key] = {
      id: serie.id,
      data: serie.data.filter(({ x }) => times.includes(x.getTime()))
    }
  }
  
  return filtered;
}
