import React, { useEffect, useState } from 'react';
import RandomTime from './RandomTime';

/*User Component
[x] the User component should return a div with an image, name, button and a line
[x] find a way hide the line on the final user that is being shown
[x] when you click the button it should delete that corresponding user
*/
const User = (data) => {
const [isHidden, setIsHidden] = useState(false);
const [isLastItem, setIsLastItem] = useState(false);
let times = (data.time)

//when you click the button it should delete that corresponding user
const handleClick = () => {
    setIsHidden(!isHidden);
    data.updateMeetings();
  }
   
   //the User component should return a div with an image, name, button and a line
   return(
       <div style={{display: isHidden  ? 'none' : 'block'}}>
           <img src={data.user.picture.large} alt={data.user.name.first} />
           <h3 className="person-h3"><span className="username">{data.user.name.first} {data.user.name.last}</span> {times[data.index]} </h3>
           <button onClick={() => handleClick()}>Delete</button>
           {/* find a way hide the line on the final user that is being shown */}
           <hr style={{display: data.index === data.lastIndex ? 'none' : 'block'}} />
       </div>
   )
}
 
export default User;