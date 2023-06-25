import React, { useEffect, useRef, useState } from "react";
import "./AnalogClock.scss";
import {
  generateHoursLineCoordsFromTime,
  generateLineCoords,
  generateMinutesLineCoordsFromTime,
  generateSecondsLineCoordsFromTime,
} from "./utils/generators";
import { LineCoordinates } from "./types/types";
import { timeZonesObject, AnalogClockPros } from "./types/types";

export default function AnalogClock({ side, brand, timeZone }: AnalogClockPros) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoursHandLength, minutesHandLength, secondHandLength] = [0.25 * side, 0.3 * side, 0.35 * side];
  const [timerId, setTimerId] = useState<number | null>(null);

  let now = new Date(new Date().toLocaleString("en-US", { timeZone: timeZone }));

  const [dayTime, setDayTime] = useState(now.getHours() >= 12 ? "PM" : "AM");

  const [hoursCoords, setHoursCoords] = useState<LineCoordinates>(
    generateHoursLineCoordsFromTime(now, hoursHandLength, { x: side / 2, y: side / 2 })
  );
  const [minutesCoord, setMinutesCoords] = useState<LineCoordinates>(
    generateMinutesLineCoordsFromTime(now, minutesHandLength, { x: side / 2, y: side / 2 })
  );
  const [secondsCoords, setSecondsCoords] = useState<LineCoordinates>(
    generateSecondsLineCoordsFromTime(now, secondHandLength, { x: side / 2, y: side / 2 })
  );

  let lineCoords: LineCoordinates[] = [];

  for (let theta = 0; theta < 360; theta += 6) {
    let lineCoord: LineCoordinates;
    if (theta % 5 === 0) {
      lineCoord = generateLineCoords({ x: side / 2, y: side / 2 }, 0.45 * side, theta, 15);
    } else {
      lineCoord = generateLineCoords({ x: side / 2, y: side / 2 }, 0.45 * side, theta);
    }
    lineCoords.push(lineCoord);
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (timerId) {
      clearInterval(timerId);
    }
    let timer = window.setInterval(() => {
      let now = new Date(new Date().toLocaleString("en-US", { timeZone: timeZone }));
      setDayTime(now.getHours() >= 12 ? "PM" : "AM");
      let hoursCoords = generateHoursLineCoordsFromTime(now, hoursHandLength, { x: side / 2, y: side / 2 });
      let minutesCoord = generateMinutesLineCoordsFromTime(now, minutesHandLength, { x: side / 2, y: side / 2 });
      let secondsCoords = generateSecondsLineCoordsFromTime(now, secondHandLength, { x: side / 2, y: side / 2 });
      setHoursCoords(hoursCoords);
      setMinutesCoords(minutesCoord);
      setSecondsCoords(secondsCoords);
    }, 1000);
    setTimerId(timer);
  }, [timeZone, brand, side]);

  if (!side || side < 20) {
    return null;
  }

  return (
    <div className="clock-container">
      <svg width={side} height={side} ref={svgRef}>
        <defs>
          <filter id="inner-shadow">
            <feGaussianBlur stdDeviation="5" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
          <filter id="outer-shadow">
            <feGaussianBlur stdDeviation="5" />
            <feComposite operator="out" in2="SourceGraphic" />
            {/* <feDropShadow dx="0" dy="0" stdDeviation="1 5" floodColor="green" /> */}
          </filter>
        </defs>
        <circle cx={side / 2} cy={side / 2} r={side / 2 - 10} stroke="green" strokeWidth="4" fill="black" />
        {lineCoords.map((coord, i) => (
          <line key={i} {...coord} style={{ stroke: "white", strokeWidth: 2, strokeLinecap: "round" }} />
        ))}
        <rect
          x={side * 0.75}
          y={side / 2}
          rx={side * 0.016}
          ry={side * 0.016}
          width={side * 0.085}
          height={side * 0.06}
          fill="white"
          filter="url(#inner-shadow)"
        ></rect>
        <text x={side * 0.75} y={side * 0.55} style={{ fontSize: `${side * 0.053}px` }}>
          {dayTime}
        </text>
        <text
          x="50%"
          y={side * 0.8}
          style={{ fontSize: `${side * 0.053}px` }}
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          // filter="url(#outer-shadow)"
        >
          {brand.toUpperCase()}
        </text>
        <line
          x1={hoursCoords.x1}
          y1={hoursCoords.y1}
          x2={side / 2}
          y2={side / 2}
          style={{ stroke: "white", strokeWidth: `${side * 0.013}`, strokeLinecap: "round" }}
        />
        <line
          x1={minutesCoord.x1}
          y1={minutesCoord.y1}
          x2={side / 2}
          y2={side / 2}
          style={{
            stroke: "white",
            strokeWidth: `${side * 0.006}`,
            strokeLinecap: "round",
          }}
        />
        <line
          x1={secondsCoords.x1}
          y1={secondsCoords.y1}
          x2={side / 2}
          y2={side / 2}
          style={{
            stroke: "rgb(255,0,0)",
            strokeWidth: `${side * 0.006}`,
            strokeLinecap: "round",
          }}
        />
        <circle cx={side / 2} cy={side / 2} r={0.016 * side} fill="white" />
      </svg>
    </div>
  );
}
