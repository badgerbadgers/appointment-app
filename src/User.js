import React, { useEffect } from 'react';

/*User Component
[x] the User component should return a div with an image, name, button and a line
[x] find a way hide the line on the final user that is being shown
[x] when you click the button it should delete that corresponding user
*/
const User = (data) => {
// let isDeleted = data.isDeleted
// let setIsDeleted = data.setIsDeleted
// const [isLastItem, setIsLastItem] = useState(false);
let times = (data.time)

//when you click the button it should delete that corresponding user
const handleClick = (user, index) => {
    data.deleteMeetings(user, index);
  }

   //the User component should return a div with an image, name, button and a line
   return(
         <div>
             <img src={data.user.picture.large} alt={data.user.name.first} />
             <h3 className="person-h3"><span className="username">{data.user.name.first} {data.user.name.last}</span> {times[data.index]} </h3>
             {/* find a way hide the line on the final user that is being shown */}
             <button onClick={() => handleClick(data.user)}>Delete</button>
             {data.index === data.users.length - 1 ? null: <hr />}
         </div>
 
   )
}
 
export default User;