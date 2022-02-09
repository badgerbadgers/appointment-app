import React from 'react';
import DeletedUser from './DeletedUser';

function DeletedUserList(data) {
    return(
        <>
        <h3 className="deleted-H3">Deleted Meetings:</h3>
        {data.deletedMeetings
          .map((meeting, i) => {
            return(
              // <div>
              // <img src={meeting.picture.large} alt={meeting.name.first} />
              // <h3 key={meeting.login.uuid} className="person-h3"><span className="username">{meeting.name.first} {meeting.name.last}</span></h3>
              // </div>
              <div key={meeting.login.uuid}>
                <DeletedUser meeting={meeting} deletedMeetings={data.deletedMeetings} index={i} addDeletedMeetings={data.addDeletedMeetings} />
              </div>
            )
          })}
        </>
    )
}

export default DeletedUserList;