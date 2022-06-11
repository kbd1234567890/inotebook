import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const s1 = {
        "name": "Kanifanath",
        "class": "A+"
    }

    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(()=> {setState({
            "name" : "Shreyas",
            "class" : "A++"
        })}, 10000);
    }
    return(
        <NoteContext.Provider value={{state,update}} >
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;