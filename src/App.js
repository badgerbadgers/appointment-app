import React, { useState, useEffect } from 'react';
import UserList from './UserList';
 
const url = 'https://randomuser.me/api/?results=5'
 
function App() {
 const [loading, setLoading] = useState(false)
 const [isHidden, setIsHidden] = useState(true)
 const [randomUsers, setRandomUsers] = useState([]);
  
 const handleClick = () => {
  //  setIsHidden(!isHidden);
  //  if(randomUsers.length === 0) {
  //    getData();
  //  }
  console.log(randomUsers.length)
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
  fetch('https://randomuser.me/api/?results=5')
  .then(response => response.json())
  .then(response  => setRandomUsers(response.results))
  .catch(error => console.log(error))
  
  if(randomUsers.length > 0) {setIsHidden(!isHidden)}
 }
 
 useEffect(() => {
  if(randomUsers.length < 1) {
    getData()
  }

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
 return(
   <main>
     <section className="container">
      <h3>Hello today is {date}</h3>
      <button className="meetingbtn" onClick={(e) => getData(e)}>Meetings</button>
        <div className="userProfile" style={{display: isHidden  ? 'none' : 'block'}}>
          <UserList users={randomUsers} />
        </div>
     </section>
   </main>
 );
}
 
export default App;

