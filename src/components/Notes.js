import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="container">
    <div className="row my-3">
      <h2>Your Notes</h2>
      <h3>
        {notes.map((note) => {
          return <NoteItem note={note}/>;
        })}
      </h3>
    </div>
    </div>
  );
};

export default Notes;
