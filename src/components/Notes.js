import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes } = context;
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        <h3>
          {notes.map((note) => {
            return <NoteItem note={note} key={note._id} />;
          })}
        </h3>
      </div>
    </>
  );
};

export default Notes;
