import React, { useState } from 'react';

const DeletedUser = (data) => {
    const handleClick = () => {

        data.addDeletedMeetings(data.meeting, data.index);
      }
    return(
      <div>
        <img src={data.meeting.picture.large} alt={data.meeting.name} />
          <h3 key={data.meeting.login.uuid} className="person-h3">
            <span className="username">{data.meeting.name.first} {data.meeting.name.last}</span>
          </h3>
          <button onClick={() => handleClick()}>Add</button>
          <hr style={{display: data.index === data.deletedMeetings.length - 1  ? 'none' : 'block'}} />
      </div>
    )
}

export default DeletedUser;