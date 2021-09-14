import React, { useState, useEffect } from 'react';
import UserList from './UserList';
 
const url = 'https://randomuser.me/api/?results=10'
 
function App() {
 const [loading, setLoading] = useState(false)
 const [isHidden, setIsHidden] = useState(true)
 const [randomUsers, setRandomUsers] = useState([]);
 const [dataLength, setDataLength] = useState(0);
  
 const handleClick = (e) => {
  //  setIsHidden(!isHidden);
  //  if(randomUsers.length === 0) {
  //    getData();
  //  }
  e.preventDefault();
  getData();
 }

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
  // if(randomUsers.length < 1) {
  //   getData()
  // }
  getData();
 }, []);

 if(loading) {
   return (
     <main>
       <p>Loading...</p>
     </main>
   );
 }
//   if(randomUser.length === 0) {
//    return(
//    <main>
//      <div className='title'>
//        <h2>No Users Left</h2>
//        <button onClick={fetchRandomUsers}>Reset</button>
//      </div>
//    </main>
//    )
//  }
 var today = new Date(),
 date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
 const lastIndex = dataLength - 1;
 return(
   <main>
     <section className="container">
      <h3>Hello today is {date}</h3>
      <button className="meetingbtn" onClick={handleClick}>Meetings</button>
        <div className="userProfile" style={{display: isHidden  ? 'none' : 'block'}}>
          <p>You have {dataLength} meetings today.</p>
          <UserList users={randomUsers} lastIndex={lastIndex}/>
        </div>
     </section>
   </main>
 );
}
 
export default App;

