import React from 'react';
import '../App.css';

const NoteInfo = ({db, confirm, select}) => {


    return (
        <div>
            <h1>{db.content}</h1>
            <h3>{db.important ? "Tärkeä" : ""}</h3>
            <p>ID: {db.id}</p>
            <button onClick={e => select(db.id)}>Muokkaa</button>
            <button onClick={e => confirm(db.id, 0)}>Poista</button>
            <hr/>
        </div>
    )
}

const NotesInfo = ({db, confirm, select}) => {
    return (
        <div>
        <hr />
            {db.map((dbm, index) => (<NoteInfo db={dbm} confirm={confirm} select={select} key={index}/>
            ))}
        </div>
    )
}
export default NotesInfo;
