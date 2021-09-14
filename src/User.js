import React, { useEffect, useState } from 'react';
import RandomTime from './RandomTime';
 
function User(data) {
const [isHidden, setIsHidden] = useState(false);
const [isLastItem, setIsLastItem] = useState(false);
let times = (data.time)
// function lastItem(data) {
//     if (data.length === data.length - 1) {
//         setIsLastItem(true)
//     }
// }
// useEffect(() => {lastItem()}, [])

const handleClick = () => {
    setIsHidden(!isHidden);
  }

// const time = new Date().toLocaleTimeString();


   return(
       <div style={{display: isHidden  ? 'none' : 'block'}}>
           <img src={data.user.picture.large} alt={data.user.name.first} />
           <h3 className="person-h3"><span className="username">{data.user.name.first} {data.user.name.last}</span> {times[data.index]}</h3>
           <button onClick={() => handleClick()}>Delete</button>

           <hr style={{display: data.index === data.lastIndex ? 'none' : 'block'}} />
       </div>
   )
}
 
export default User;