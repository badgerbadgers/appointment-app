import React, { useState, useEffect } from 'react';
import User from './User';
 
function UserList(data) {
  const [sortedTime, setSortedTime] = useState([]);
  const [randomHour, setRandomHour] = useState([]);
  const STARTHOUR = 8;

  // function RandomTime() {
  //   let hrs = Math.round(Math.random() * 24);
  //   let mins = Math.round(Math.random() * 60);    
  //   let hFormat = (hrs<10 ? "0" : "");
  //   let mFormat = (mins<10 ? "0" : "");
  //   let amPm = (hrs<12 ? "AM" : "PM");
  //   let is12 = (hrs % 12 === 0);
  
  //   return amPm === "AM" && !is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
  //                 : "AM" && is12  ? String(12 + ":" +mFormat+mins+ " " +amPm)
  //                 : is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
  //                 : String(hFormat+(hrs-12)+ ":" +mFormat+mins+ " " +amPm);
  
  // }
  // let newTime = RandomTime();

  // let getTime = () => {
  //   setTime(newTime);
  // }
  // useEffect(() => {
  //   getTime()
  // }, [])
  // console.log(newTime)

  // function getInt(min, max) {
  //   return Math.floor(Math.random() * (max) + min); //The maximum is exclusive and the minimum is inclusive
  // }
  // function getTime(){
  //   let hours = getInt(0,12)
  //   let mins = getInt(0,59)
  //   console.log(hours, mins)
  // }

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
  function getTimes() {
    let times = [];
    while(times.length !== 10) {
      let time = RandomTime();
      let stringSplit = time.split(' ');
      let timeSplit = stringSplit[0].split(':');
      if(stringSplit[1] === 'AM'){
        if(parseInt(timeSplit[0]) > 7 && parseInt(timeSplit[0]) <= 11){
          times.push(time)
        } 
      } else {
        if(parseInt(timeSplit[0]) <= 6){
          times.push(time)
        } 
      }
    }
    let sortedTime = times.sort();
    setSortedTime(sortedTime)
  }







  useEffect(() => {
    getTimes()
  }, [])

   return(
     <>
       {data.users.map((user,i) => {
           return(
             <>
             <User key={user.login.uuid} user={user} index={i} lastIndex={data.lastIndex} time={sortedTime} />
             </>
             )
           })
         }
     </>  
   )
}
 
export default UserList;