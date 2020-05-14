import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NotesInfo from './services/NotesInfo.js';
import './App.css';
import Notes from "./services/notes.js"

function App() {
  const [notes, setNotes] = useState([]);
  const [formValue, setFormValue] = useState(["", ""]);
  const [type, setType] = useState(["Lisää uusi muistiinpano", "Lisää", 0, -1]);

  const[filter, setFilter] = useState(false);

  const SetValueOf = (index, value) => {
    let temp = [...formValue];
    temp[index] = value;
    setFormValue(temp);
  }
  const Reset = () => {
    document.getElementById("Muistiinpano").value = "";
    document.getElementById("confirm").checked = false;
  }
  const Confirm = (id = undefined, _type = 0) => {
    //console.log("Confirm(" + id + ", " + _type + ")");
    //New note
    if(id === undefined) {
      let content = formValue[0] !== "" ? formValue[0] : "(No content)";
      let important = formValue[1] !== "" ? formValue[1] : false;

      var newNote = {
        "content": content,
        "date": new Date().toISOString(),
        "important": important
      };
      Notes.add(newNote)
        .then(e => {
          let temp = [...notes];
          temp.push(newNote)
          setNotes(temp);
        })
      .then(e => setFormValue([]));
      //console.log(notes);
    }
    else {
      //Edit/Delete
      //Type 0 = delete, 1 = Edit
      if (_type === 0) {
        //console.log("Delete");
          Notes.remove(id).then(e => {
            let temp = [];
            notes.map(note => {
              if(note.id !== id) temp.push(note);
            });
            setNotes(temp);
          });
      } else if (_type === 1) {
        var updatedNote = {
          "content": formValue[0],
          "date": new Date().toISOString(),
          "important": formValue[1]
        };
        Notes.update(id, updatedNote).then(e => {
let tempMap = [...notes];
          notes.map((note, index) => {
            if(note.id === id) {
tempMap[index] = updatedNote;
            }
          });
          setNotes(tempMap);
        });
      }
      else
        console.log("Undefined type " + _type);
    }
    setFormValue([]);
    Reset();
    setType(["Lisää muistiinpano", "Lisää", undefined, undefined]);
  }

  const SelectNote = id => {
    //console.log(id);
    if(type[2] !== 2) {
      setType(["Muokkaa muistiinpanoa", "Muokkaa", 2, id]);
    }
    else {
      Confirm(id, 1);
    }
  }
  const hook = () => {
  axios
  .get('http://localhost:3001/notes')
    .then(response => {
      const notes = response.data
      setNotes(notes)
    })
  }
  useEffect(hook, [formValue]);

  let button = type[1] === "Lisää" ? <button onClick={e => Confirm()}>{type[1]}</button> : <button onClick={e => SelectNote(type[3])}>{type[1]}</button>
  let data = filter ? Notes.getImportant(notes) : notes;

  return (
    <div className="App">
    <button onClick={e => setFilter(!filter)}>{filter ? "Näytä kaikki" : "Näytä tärkeät"}</button>
      <br/>
      <ul>
      <NotesInfo db={data} confirm={Confirm} select={SelectNote}/>
      </ul>
      <header className="App-header">

        <p>{type[0]}</p>

<input placeholder="Muistiinpano" onChange={e => SetValueOf(0, e.target.value)} type="text" id="Muistiinpano" required/>
<br/>
<label>Important
  <input onChange={e => SetValueOf(1, e.target.checked)} type="checkbox" id="confirm"/>
</label>
<br/>
  {button}
    </header>
  </div>
  );
}

export default App;
