import React, { useState } from 'react';
import '../App.css';

const NoteInfo = ({db}) => {
    console.log(db);

  
    return (
            <li>
                {db.content}
            </li>
    )
}

const NotesInfo = ({db}) => {
    return (
        <li>
            {db.map(dbm => (<NoteInfo db={dbm} key={dbm.id}/>
            ))}
        </li>
    )
}
export default NotesInfo;