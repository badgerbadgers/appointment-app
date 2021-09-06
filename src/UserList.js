import React from 'react';
import User from './User'
 
function UserList(data) {
   return(
     <>
       {data.users.map(user => <User key={user.login.uuid} user={user} /> )}
     </>  
   )
}
 
export default UserList;