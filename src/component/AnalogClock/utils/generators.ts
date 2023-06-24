import { Point,LineCoordinates } from "../types/types"
import { convertDegreesToRadians } from "./helpers"

function generateLineCoords(center:Point,radius:number,thetaInDegrees:number,lineLength = 5):LineCoordinates {
    let thetaInRadians = convertDegreesToRadians(thetaInDegrees)
    let startPoint = generatePoint(radius,thetaInRadians)
    
    let x1 = center.x + startPoint.x
    let y1 = center.y + startPoint.y
    
    let endPoint = generatePoint(radius - lineLength,thetaInRadians)

    let x2 = center.x + endPoint.x
    let y2 = center.y + endPoint.y
    
    return {x1,y1,x2,y2}
    
}

function generatePoint(radius:number,thetaInRadians:number):Point {
    let x = radius * Math.cos(thetaInRadians)
    let y = radius * Math.sin(thetaInRadians)
    return {x,y} 
}

function generateHoursLineCoordsFromTime(date:Date,lineLength:number):LineCoordinates {
    let hours = date.getHours()
    let hour = hours % 12

    let minutes = date.getMinutes()
    let minuteInHourPercentage = minutes / 60

    let hourWithFraction = hour + minuteInHourPercentage;

    // Every 360     equals 12 hours
    // Every theta   equals hourWithFraction

    // theta     =   hourWithFraction * 360 / 12

    let theta = (hourWithFraction ) * 360 / 12

    return generateLineCoords({x:150,y:150},lineLength, theta - 90,100)
}
function generateMinutesLineCoordsFromTime(date:Date,lineLength:number):LineCoordinates {
    
    let minutes = date.getMinutes()
   
    // Every 360     equals 60 minutes
    // Every theta   equals minutes

    // theta     =   minutes * 360 / 60

    let theta = minutes * 360 / 60
    return generateLineCoords({x:150,y:150},lineLength, theta - 90,100)
}
function generateSecondsLineCoordsFromTime(date:Date,lineLength:number):LineCoordinates {
    let seconds = date.getSeconds()
    let milliSeconds = date.getMilliseconds()

    let milliSecondsInSecondPercentage = milliSeconds / 1000 
    // Every 360     equals 60 seconds
    // Every theta   equals seonds

    // theta     =   minutes * 360 / 60
    let secondsWithFraction = seconds + milliSecondsInSecondPercentage
    let theta = seconds * 360 / 60
    return generateLineCoords({x:150,y:150},lineLength, theta - 90,100)
}


export {
    generateLineCoords,
    generateHoursLineCoordsFromTime,
    generateMinutesLineCoordsFromTime,
    generateSecondsLineCoordsFromTime
}