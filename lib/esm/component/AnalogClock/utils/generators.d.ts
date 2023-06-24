import { Point, LineCoordinates } from "../types/types";
declare function generateLineCoords(center: Point, radius: number, thetaInDegrees: number, lineLength?: number): LineCoordinates;
declare function generateHoursLineCoordsFromTime(date: Date, lineLength: number): LineCoordinates;
declare function generateMinutesLineCoordsFromTime(date: Date, lineLength: number): LineCoordinates;
declare function generateSecondsLineCoordsFromTime(date: Date, lineLength: number): LineCoordinates;
export { generateLineCoords, generateHoursLineCoordsFromTime, generateMinutesLineCoordsFromTime, generateSecondsLineCoordsFromTime };
