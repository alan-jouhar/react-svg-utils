import React, { useEffect, useRef, useState } from "react";
import "./AnalogClock.css";
import {
  generateHoursLineCoordsFromTime,
  generateLineCoords,
  generateMinutesLineCoordsFromTime,
  generateSecondsLineCoordsFromTime,
} from "./utils/generators";
import { LineCoordinates } from "./types/types";
import { timeZonesObject, timeZones } from "./types/types";
export default function AnalogClock() {
  const svgRef = useRef<SVGSVGElement>(null);
  console.log(timeZones);
  let now = new Date();
  const [hoursCoords, setHoursCoords] = useState<LineCoordinates>(generateHoursLineCoordsFromTime(now, 80));
  const [minutesCoord, setMinutesCoords] = useState<LineCoordinates>(generateMinutesLineCoordsFromTime(now, 90));
  const [secondsCoords, setSecondsCoords] = useState<LineCoordinates>(generateSecondsLineCoordsFromTime(now, 110));
  let lineCoords: LineCoordinates[] = [];
  for (let theta = 0; theta < 360; theta += 6) {
    let lineCoord: LineCoordinates;
    if (theta % 5 === 0) {
      lineCoord = generateLineCoords({ x: 150, y: 150 }, 130, theta, 15);
    } else {
      lineCoord = generateLineCoords({ x: 150, y: 150 }, 130, theta);
    }
    lineCoords.push(lineCoord);
  }
  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      const { value: width } = svg.width.baseVal;
      const { value: height } = svg.height.baseVal;
      console.log(width, height);
    }
    setInterval(() => {
      let now = new Date();
      let hoursCoords = generateHoursLineCoordsFromTime(now, 80);
      let minutesCoord = generateMinutesLineCoordsFromTime(now, 90);
      let secondsCoords = generateSecondsLineCoordsFromTime(now, 110);
      setHoursCoords(hoursCoords);
      setMinutesCoords(minutesCoord);
      setSecondsCoords(secondsCoords);
    }, 100);
  }, []);
  return (
    <div className="clock-container">
      <svg width="300" height="300" ref={svgRef}>
        <circle cx="150" cy="150" r="140" stroke="grey" strokeWidth="4" fill="black" />
        {lineCoords.map((coord, i) => (
          <line key={i} {...coord} style={{ stroke: "red", strokeWidth: 2, strokeLinecap: "round" }} />
        ))}
        <line
          x1={hoursCoords.x1}
          y1={hoursCoords.y1}
          x2="150"
          y2="150"
          style={{ stroke: "yellow", strokeWidth: 4, strokeLinecap: "round" }}
        />
        <line
          x1={minutesCoord.x1}
          y1={minutesCoord.y1}
          x2="150"
          y2="150"
          style={{
            stroke: "rgb(105,150,150)",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <line
          x1={secondsCoords.x1}
          y1={secondsCoords.y1}
          x2="150"
          y2="150"
          style={{
            stroke: "rgb(255,0,0)",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
      </svg>
    </div>
  );
}
