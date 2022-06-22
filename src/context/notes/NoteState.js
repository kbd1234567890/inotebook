import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const  notesInitial = [
        {
          "_id": "62b2b9819b374b77cf1275e7",
          "user": "62512f13e862062956e61610",
          "title": "Soham",
          "description": "salaried employee",
          "tag": "personal",
          "date": "2022-06-22T06:41:05.696Z",
          "__v": 0
        },
        {
          "_id": "62b2b99e9b374b77cf1275ea",
          "user": "62512f13e862062956e61610",
          "title": "Kanif",
          "description": "Businessman",
          "tag": "personal",
          "date": "2022-06-22T06:41:34.075Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitial);
    return(
        <NoteContext.Provider value={{notes, setNotes}} >
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;