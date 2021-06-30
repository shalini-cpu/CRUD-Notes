import React, { useState } from "react";
import DeleteIcon from "./DeleteIcon";
import add_note from "./notesReduxAction";

function UpdateNoteModal({
  note,
  modal,
  notes_content_change,
  notes_title_change,
  notes_change
}) {
  //state
  const [mutableNote, setMutableNote] = useState(note);
  const [id, setId] = useState(mutableNote.id);
  var [title, setTitle] = useState(mutableNote.title);
  var [content, setContent] = useState(mutableNote.content);
  var [check_title, setCheck_title] = useState(false);
  var [check_content, setCheck_content] = useState(false);

  // close modal
  const dismissModal = () => {
    modal();
  };

  //stop propagation
  const stopPropagation = e => {
    e.stopPropagation();
  };

  // submit form
  const handleSubmit = e => {
    console.log("done pressed");
    e.preventDefault();
    if (check_title) {
      console.log("sending parameters to change");
      notes_title_change(id, title);
    } else if (check_content) {
      console.log("sending parameters to change");
      notes_content_change(id, content);
    }
    dismissModal();
  }; // end of handleSubmit

  const handleTitle = e => {
    setTitle((title = e.target.value));
    setCheck_title(true);
  };

  const handleContent = e => {
    setContent((content = e.target.value));
    setCheck_content(true);
  };

  const handleDelete = e => {
    e.preventDefault();

    //const id = mutableNote.id;

    if (window.confirm("Do you really want to delete this note?")) {
      const axios = require("axios");

      async function makePostRequest() {
        let res = await axios.delete(`http://localhost:3004/Notes/${id}/`);

        console.log(res.status);
      }

      makePostRequest();
      dismissModal();
      notes_change(id);
    }
  }; // end of handleDelete

  return (
    <div>
      {note && (
        <div className="modal-backdrop" onClick={dismissModal} id="modalBox">
          <div
            className="modal"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalContent"
          >
            <form
              onSubmit={handleSubmit}
              onClick={stopPropagation}
              className="edit-form"
            >
              <input
                id="modalTitle"
                onChange={handleTitle}
                name="title"
                value={title}
                placeholder="Title"
              />

              <textarea
                id="modalContent"
                onChange={handleContent}
                value={content}
                name="content"
                placeholder="Add a note..."
                rows="8"
              />

              <footer className="modal-footer">
                <button
                  onClick={handleDelete}
                  type="button"
                  className="delete-button"
                >
                  <DeleteIcon />
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="submit-button"
                >
                  <span>Done</span>
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateNoteModal;
