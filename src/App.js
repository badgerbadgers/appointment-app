import React, { useState, useEffect } from 'react';
import UserList from './UserList';
 
/*
Appointment App

Stage 1
[x] initially display only text with current date and a button labeled 'Meetings'
[x] when 'Meetings' button is clicked display text stating number of meetings
[x] get api data from an external source, this data will be displayed on the app page
[x] run handleClick function when 'Meetings' is clicked 
[x] when 'Meetings' is clicked display a 'User' component that shows user image, first and last name,
  a 'Delete' button, a randomly generated time in 12 hr format and a horizontal rule at the bottom of each 'User' component
[x] The times should be displayed from earliest to latest 

Stage 2
[x] generate a random number between 1 and 10
[x] dynamically change the total meeting count being displayed on the page, the total meetings
  should be the random number between 1 and 10
[x] any state changes should reflect on the rendered page text being displayed

Stage 3 
[x] store and display deleted meetings
[x] create new deleted user component
[] use router to route to new deleted meetings

Stage 4
[] remove arabic user names with conditional statement
[] return an input field for each user card, the text entered should be rendered on the 
  webpage
[] edit the random time to allow the user to change meeting times

/* Generate a random number between 1 and 10 */
let randomNum = Math.floor(Math.random() * 10) + 1;

/* dynamically change the total meeting count being displayed on the page*/
const url = `https://randomuser.me/api/?results=${randomNum}`;

function App() {
 const [isHidden, setIsHidden] = useState(true)
 const [randomUsers, setRandomUsers] = useState([]);
 const [totalMeetings, setTotalMeetings] = useState(0);
 const [deletedMeetings, setDeletedMeetings] = useState([]);

 //run handleClick function when 'Meetings' is clicked 
 const handleClick = (e) => {
  e.preventDefault();
  getData();
  // setTotalMeetings(randomUsers.length)
 }
 
 function updateMeetings(index) {
   //updates total number of meetings
  setTotalMeetings(totalMeetings - 1);
  //updates user data less the user clicked
  const deletedUser = randomUsers[index];
  const newlyDeleted = [...deletedMeetings, deletedUser];
  console.log(deletedMeetings)
  setDeletedMeetings(newlyDeleted);
  const copyOfUsers = randomUsers;
  copyOfUsers.splice(index, 1);
  setRandomUsers(copyOfUsers);
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
  .then(() => setTotalMeetings(randomUsers.length))
  .catch(error => console.log(error))
  
  if(randomUsers.length > 0) {
    setIsHidden(!isHidden)}
 }
 
 useEffect(() => {
  getData();
 }, []);

 var today = new Date(),
 date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

 return(
   <main>
     <section className="container">
     {/* Initially display only text with current date and a button labeled 'Meetings'*/}
      <h3>Hello today is {date}</h3>
      {/* when 'Meetings' button is clicked display text stating number of meetings */}
      <button className="meetingbtn" onClick={handleClick}>Meetings</button>
        <div className="userProfile" style={{display: isHidden  ? 'none' : 'block'}}>
        {/* any state changes should reflect on the rendered page text being displayed */}
        <p>There are {totalMeetings} meetings today.</p>
        {/* when 'Meetings' is clicked display a 'User' component that shows user image, first and last name,
        a 'Delete' button, a randomly generated time in 12 hr format and a horizontal rule at the bottom of each 'User' component unless last 'User' / meeting */}
         {/* The times should be displayed from earliest to latest */}
          <UserList users={randomUsers} updateMeetings={updateMeetings} />
          <h3>Deleted Meetings: </h3>
          {deletedMeetings.map(meeting => {
            return(
              <>
              <img src={meeting.picture.large} alt={meeting.name.first} />
              <p key={meeting.login.uuid}>{meeting.name.first} {meeting.name.last}</p>
              </>
            )
          })}
        </div>
     </section>
   </main>
 );
}
 
export default App;

