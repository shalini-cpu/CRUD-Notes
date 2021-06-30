import React from "react";
import Note from "./Note";
import add_note from "./notesReduxAction";

function AllNotes({ allnotes, selected }) {
  return (
    <div className="notes">
      {allnotes &&
        allnotes.map((nts, index) => (
          <Note key={index} selected={selected} index={index} note={nts} />
        ))}
    </div>
  );
}

export default AllNotes;
