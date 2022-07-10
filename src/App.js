import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import DeletedUserList from './DeletedUserList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import simplur from 'simplur';

function App() {
const [deletedMeetings, setDeletedMeetings] = useState([]);
const [currentMeetings, setCurrentMeetings] = useState([]);
const [totalMeetings, setTotalMeetings] = useState(0);
const [isHidden, setIsHidden] = useState(true);
//uses simplur library display if there are multiple meetings or just 1 meeting (singular)
const meetingText = simplur`You have ${currentMeetings.length} meeting[|s] today.`;

/* Total Meetings Text Displayed if not using simplur library */
const noun = totalMeetings.length >= 1
  ? 'meetings'
  : 'meeting';
const meetingText2 = `You have ${totalMeetings} ${noun} today.`;
// "You have 3 items in your shopping cart"


//set the current date
var today = new Date(),
date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

const MAX_MEETINGS = 7 // per day
// Generates random number between 1 and MAX_MEETINGS to set number of meetings for the day
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

//run handleClick function when 'Meetings' is clicked
const handleClick = (e) => {
  e.preventDefault();
  setCurrentMeetings([]);
  setDeletedMeetings([]);
  setIsHidden(!isHidden);
 totalMeetings === 0
   ? setTotalMeetings(getRandomInt(1, MAX_MEETINGS))
   : setTotalMeetings(totalMeetings)
  getData(totalMeetings)
  if(totalMeetings === 0) {
    getData();
  }
}

const getData = (totalMeetings) => {
/* dynamically change the total meeting count being displayed on the page*/
const url = `https://randomuser.me/api/?nat=gb&results=${totalMeetings}`;
  fetch(url)
  .then(response => response.json())
  // .then(response  => response.results.filter(users => !(users.location.country === 'Iran')))
  .then(response =>  setCurrentMeetings(response.results))
  .catch(error => console.log(error))
}

function deleteMeetings(user, index) {
 const clickedId = user.login.uuid
 const updatedCurrentMeetings = []
 const updatedDeletedMeetings = [...deletedMeetings]
 currentMeetings.map(currentMeeting => currentMeeting.login.uuid !== clickedId ? 
 updatedCurrentMeetings.push(currentMeeting): updatedDeletedMeetings.push(currentMeeting))
setCurrentMeetings(updatedCurrentMeetings)
setDeletedMeetings(updatedDeletedMeetings)
setTotalMeetings(totalMeetings - 1)
}
 
 
//create a function that adds deleted meetings back to current meetings
function addDeletedMeetings(user, index) {
  //copy of deleted meetings
  const copyOfDeletedMeetings = deletedMeetings;
  //copy of current meetings
  const copyOfCurrentMeetings = currentMeetings;
  //create new constant for currently clicked meeting
  const clickedMeeting = user;
  //map through deleted meetings if clicked meeting matches mapped meeting
  //then on copy of deleted meetings use splice to deleted that meeting
  //then setDeletedMeetings to the copy of deleted meetings
  deletedMeetings.map(meeting => meeting.login.uuid === clickedMeeting.login.uuid ? 
    copyOfDeletedMeetings.splice(index, 1) : null)
  setCurrentMeetings(copyOfDeletedMeetings);
  //push the current clicked meeting object to the copy of current meetings list
  //then set current meeting to copy of current meetings list
  copyOfCurrentMeetings.push(clickedMeeting);
  setCurrentMeetings(copyOfCurrentMeetings);
  //update text on dom to add total meetings by 1
  setTotalMeetings(totalMeetings + 1)
 }
  
useEffect(() => {
  setTotalMeetings(getRandomInt(1, MAX_MEETINGS))
  getData();
}, [deleteMeetings, currentMeetings]);
return(
  <main>
    <section className="container">
    {/* Initially display only text with current date and a button labeled 'Meetings'*/}
     <h3 style={{display: isHidden  ? 'block' : 'none'}}>Hello, today is {date}</h3>
     <nav>
      <ul>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Current Meetings</NavLink></li>
        <li><NavLink to="/deletedmeetings" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Deleted Meetings</NavLink></li>
        {/* <li onClick={handleActiveMeeting} activeClassName="active" className={`menu-item ${isActive ? "active" : ""}`}><NavLink to="/deletedmeetings">Deleted Meetings</NavLink></li> */}
      </ul>
    </nav>
     {/* when 'Meetings' button is clicked display text stating number of meetings */}
     <button className="meetingbtn" onClick={handleClick}>Meetings</button>
       <div className="userProfile" style={{display: isHidden  ? 'none' : 'block' }}>
       {/* any state changes should reflect on the rendered page text being displayed */}
       {/* <p id='totalMeetingsText'>You have {totalMeetings} meetings today.</p> */}
       <p>{meetingText}</p>
       {/* when 'Meetings' is clicked display a 'User' component that shows user image, first and last name,
       a 'Delete' button, a randomly generated time in 12 hr format and a horizontal rule at the bottom of each 'User' component unless last 'User' / meeting */}
        {/* The times should be displayed from earliest to latest */}
        <Routes>
          <Route path="/" element={<UserList users={currentMeetings} 
             deleteMeetings={deleteMeetings} totalMeetings={totalMeetings} 
             setTotalMeetings={setTotalMeetings} currentMeetings={currentMeetings} 
             setCurrentMeetings={setCurrentMeetings} />} />
          <Route exact path="/deletedmeetings" element={<DeletedUserList addDeletedMeetings={addDeletedMeetings} 
             deletedMeetings={deletedMeetings}/> } />
        </Routes>
       </div>
    </section>
  </main>
);
}
export default App;