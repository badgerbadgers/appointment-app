
import React from 'react';

function RandomTime() {
    let hrs = Math.round(Math.random() * 24);
    let mins = Math.round(Math.random() * 60);    
    let hFormat = (hrs<10 ? "0" : "");
    let mFormat = (mins<10 ? "0" : "");
    let amPm = (hrs<12 ? "AM" : "PM");
    let is12 = (hrs % 12 === 0);
  
    return amPm === "AM" && !is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
                  : "AM" && is12  ? String(12 + ":" +mFormat+mins+ " " +amPm)
                  : is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
                  : String(hFormat+(hrs-12)+ ":" +mFormat+mins+ " " +amPm);
  
  }
  
//   let time = randomTime();
export default RandomTime;