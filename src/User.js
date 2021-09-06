import React, { useState } from 'react';
 
function User(data) {
const [isHidden, setIsHidden] = useState(false);
const handleClick = () => {
    setIsHidden(!isHidden);
  }
const time = new Date().toLocaleTimeString();
   return(
       <div style={{display: isHidden  ? 'none' : 'block'}}>
           <img src={data.user.picture.large} alt={data.user.name.first} />
           <h3 className="person-h3"><span className="username">{data.user.name.first} {data.user.name.last} -</span> {time}</h3>
           <button onClick={() => handleClick()}>Delete</button>
           <hr/>
       </div>
   )
}
 
export default User;