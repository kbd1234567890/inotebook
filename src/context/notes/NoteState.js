import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:4000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get All notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzk2MDI5ZjgyMTcxMzRkZTIwMDA3In0sImlhdCI6MTY1NjUyNjMzOH0.0jfYsbcgVjER6m9238is4RF9y_TdXCD98SVW0ETc980"
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
    // setNotes(notes.concat(json));
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    const note = {
      _id: "62bc9087cbca39aeb2569322",
      user: "62bc96029f8217134de20007",
      title: title,
      description: description,
      tag: tag,
      date: "2022-06-22T06:41:05.696Z",
      __v: 0,
    };

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzk2MDI5ZjgyMTcxMzRkZTIwMDA3In0sImlhdCI6MTY1NjUyNjMzOH0.0jfYsbcgVjER6m9238is4RF9y_TdXCD98SVW0ETc980"
      },
      body : JSON.stringify({"title": title, "description" : description, "tag": tag })
    });

    setNotes(notes.concat(note));
    // getNotes();
  };
  // Delete Note
  const deleteNote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzk2MDI5ZjgyMTcxMzRkZTIwMDA3In0sImlhdCI6MTY1NjUyNjMzOH0.0jfYsbcgVjER6m9238is4RF9y_TdXCD98SVW0ETc980"
      },
    });
    const json = await response.json();
    console.log(json)

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    console.log("Deleting a note with id " + id);
  };
  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API call
    
      const response = await fetch(`${host}/api/notes/updatenote/${id }`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiYzk2MDI5ZjgyMTcxMzRkZTIwMDA3In0sImlhdCI6MTY1NjUyNjMzOH0.0jfYsbcgVjER6m9238is4RF9y_TdXCD98SVW0ETc980"
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
    

    for (let i = 0; i < notes.length; i++) {
      let ele = notes[i];
      if (ele._id === id) {
        ele.title = title;
        ele.description = description;
        ele.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
