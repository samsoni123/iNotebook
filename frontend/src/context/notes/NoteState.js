import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)
      

      //Get a Note
      const getNotes = async()=>{
        //API call
        const response = await fetch(`${window.location.origin}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token": localStorage.getItem('token')
            }
          });
         
        const json = await response.json();
        setNotes(json);

      }

      //Add a Note
      const addNote = async( title, description, tag)=>{

        //API call
        const response = await fetch(`${window.location.origin}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
          });
          const note = await response.json(); 
          setNotes(notes.concat(note))

      }

      //Edit a Note
      const editNote = async(id, title, description, tag)=>{
        //API call
        const response = await fetch(`${window.location.origin}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
          });
          //const json = await response.json(); 
        
          let newNotes= JSON.parse(JSON.stringify(notes))
        //Logic to edit in Client 
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }           
      }
      setNotes(newNotes);

    }
      //Delete a Note
      const deleteNote = async(id)=>{
        //API call
        const response = await fetch(`${window.location.origin}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          //const json = response.json();
          const newNotes = notes.filter((note)=>{return note._id!== id})
          setNotes(newNotes);

      }
    
    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;