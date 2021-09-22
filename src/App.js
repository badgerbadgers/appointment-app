import React, { useState, useEffect } from 'react';
import UserList from './UserList';
 
/*
Appointment App

Stage 1
[x] initially display only text with current date and a button labeled 'Meetings'
[x] when 'Meetings' button is clicked display text stating number of meetings
[x] run handleClick function when 'Meetings' is clicked 
[x] when 'Meetings' is clicked display a 'User' component that shows user image, first and last name,
  a 'Delete' button, a randomly generated time in 12 hr format and a horizontal rule at the bottom of each 'User' component
[x] The times should be displayed from earliest to latest 

Stage 2
[] dynamically change the total meeting count being displayed on the page
[] create value equal to the daily meeting count
[] any state changes should reflect on the rendered page text being displayed

Stage 3 
[] return an input field for each user card, the text entered should be rendered on the 
  webpage
[] edit the random time to allow the user to change meeting times
[] 

*/

/* Generate a random number between 1 and 10 */
let zooms = Math.floor(Math.random() * 10) + 1;
const url = `https://randomuser.me/api/?results=${zooms}`;

function App() {
 const [isHidden, setIsHidden] = useState(true)
 const [randomUsers, setRandomUsers] = useState([]);
 const [dataLength, setDataLength] = useState(0);
 const [totalMeetings, setTotalMeetings] = useState(0)

 //run handleClick function when 'Meetings' is clicked 
 const handleClick = (e) => {
  e.preventDefault();
  getData();
  setTotalMeetings(randomUsers.length)
  console.log(zooms)
 }

 function updateMeetings() {
  setTotalMeetings(totalMeetings - 1);
}

//AXIOS METHOD TO GET API DATA
// async function getData() {
//  try {
//    const { data } = await axios.get(url)
//    setRandomUsers(data.results)
//  }
//  catch(error) {
//    console.log(error)
//  }
// }


const getData = () => {
  fetch(url)
  .then(response => response.json())
  .then(response  => setRandomUsers(response.results))
  .then(response  => setDataLength(randomUsers.length))
  .catch(error => console.log(error))
  
  if(randomUsers.length > 0) {
    setIsHidden(!isHidden)}
 }
 
 useEffect(() => {
  getData();
 }, []);

 var today = new Date(),
 date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
 const lastIndex = dataLength - 1;

 return(
   <main>
     <section className="container">
     {/* Initially display only text with current date and a button labeled 'Meetings'*/}
      <h3>Hello today is {date}</h3>
      {/* when 'Meetings' button is clicked display text stating number of meetings */}
      <button className="meetingbtn" onClick={handleClick}>Meetings</button>
        <div className="userProfile" style={{display: isHidden  ? 'none' : 'block'}}>
        <p>There are {totalMeetings} meetings today.</p>
        {/* when 'Meetings' is clicked display a 'User' component that shows user image, first and last name,
        a 'Delete' button, a randomly generated time in 12 hr format and a horizontal rule at the bottom of each 'User' component unless last 'User' / meeting */}
         {/* The times should be displayed from earliest to latest */}
          <UserList users={randomUsers} lastIndex={lastIndex} updateMeetings={updateMeetings} />
        </div>
     </section>
   </main>
 );
}
 
export default App;

