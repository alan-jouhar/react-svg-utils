import timeZonesJson from "../utils/timeZones.json";

const indexedTimeZones = timeZonesJson.map((timeZone) => [timeZone.offset, timeZone.utc] as [number, string[]]);

const summedIndexedTimeZones = indexedTimeZones.reduce<[number, string[]][]>((acc, e) => {
  const foundIndex = acc.findIndex((n) => n[0] === e[0]);
  if (foundIndex > 0) {
    acc[foundIndex][1] = acc[foundIndex][1].concat(e[1]);
  } else {
    acc.push(e);
  }
  return acc;
}, []);

export const timeZonesObject: { [index: number]: string[] } = Object.fromEntries(summedIndexedTimeZones);

export const timeZones = Object.values(timeZonesObject).flat();

export interface Point {
  x: number;
  y: number;
}

export interface LineCoordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
