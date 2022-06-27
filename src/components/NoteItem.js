import React from "react";
import "../App.css";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text size-font" >{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, hic vero atque sunt voluptate consequatur exercitationem incidunt! Nostrum vitae provident hic incidunt ex repudiandae. Alias explicabo exercitationem non itaque aperiam!</p>
          <i className="fa-solid fa-trash-can mx-2"></i>
          <i className="fa-solid fa-pen-to-square mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
