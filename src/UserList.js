import React, { useState, useEffect } from 'react';
import User from './User';

/* UserList Component
[x] get data passed down from main 'App' component
[x] loop through the data and create new component
[x] add the following properties to the new component: key, the entire object with all of its' 
  key value pairs, an index and any other properties passed down from main app and UserList 
  component
[x] generate a random time in 12 hour format
[x] the randomly generated time should be between specific hours (i.e. 8am - 6pm)
[x] sort the times from earliest to latest time (first am times then pm times)
[x] times should be evenly generated between am and pm times

*/

//get data passed down from main 'App' component
function UserList(data) {
  const [sortedTime, setSortedTime] = useState([]);

  //generate a random time in 12 hour format
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
  //the randomly generated time should be between specific hours (i.e. 8am - 6pm)
  //times should be evenly generated between am and pm times
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
    //sort the times from earliest to latest time (first am times then pm times)
    let sortedTime = times.sort();
    setSortedTime(sortedTime)
  }

  useEffect(() => {
    getTimes();
  }, [])

   return(
     <>
     {/* loop through the data and create new component */}
       {data.users.map((user,i) => {
           return(
            // add the following properties to the new component: key, the entire object with all of its' 
            // key value pairs, an index and any other properties passed down from main app and UserList 
            // component
             <div key={user.login.uuid}>
             <User user={user} index={i} lastIndex={data.lastIndex} time={sortedTime} updateMeetings={data.updateMeetings} />
             </div>
             )
           })
         }
     </>  
   )
}
 
export default UserList;