/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./App.css";
import AddNoteForm from "./AddNoteForm";
import AllNotes from "./AllNotes";
import UpdateNoteModal from "./UpdateNoteModal";
import add_note from "./notesReduxAction";
import notes from "./notesarray-reducer";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const ste = useSelector(a => a.notes);
  console.log(ste);
  var [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  var [toggle, setToggle] = useState(false);

  const noteSelected = note => {
    setShowModal(true);
    setSelectedNote(note);
    console.log(note, " is selected!");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNote(null);
    console.log(
      "No note is selected and modal is not active!<br>Show Modal: ",
      showModal
    );
  };

  const toggle_change = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const add_note = e => {
    setNotes([...notes, e]);
    console.log(notes);
  };

  const notes_title_change = (id, title) => {
    console.log("well hello");
    notes &&
      notes.filter((nts, index) =>
        nts.id == id ? (notes[index].title = title) : console.log("jj")
      );
  };

  const notes_content_change = (id, content) => {
    console.log("well hello");
    notes &&
      notes.map((nts, index) =>
        nts.id == id ? (notes[index].content = content) : console.log("jj")
      );
  };

  const notes_change = id => {
    console.log(id);
    setNotes(
      (notes = notes.filter(nts => {
        if (nts.id != id) {
          return nts;
        }
      }))
    );
    console.log(notes);
  };

  return (
    <div>
      {/* <header>
        <div class="pos-f-t">
          <nav class="navbar navbar-dark bg-dark">
            <button
              onClick={toggle_change}
              class="navbar-toggler"
              type="button"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="p-1 rounded  shadow-sm mb-2 mt-2 mr-5 ml-4">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    id="button-addon2"
                    type="submit"
                    class="bg-secondary btn btn-link text-warning"
                  >
                    <i
                      class="glyphicon glyphicon-search"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
                <input
                  type="search"
                  placeholder="What're you searching for?"
                  aria-describedby="button-addon2"
                  class="text-white
 bg-light form-control border-0"
                ></input>
              </div>
            </div>
            <span class="navbar-text"></span>
          </nav>
          {toggle ? (
            <nav class="toggle-navbar">
              <div class="bg-dark p-4">
                <h4 class="text-white">Collapsed content</h4>
                <span class="text-muted">Toggleable via the navbar brand.</span>
              </div>
            </nav>
          ) : (
            <div></div>
          )}
        </div>
      </header> */}
      <div className="app">
        <AddNoteForm add_note={add_note} />
        <AllNotes allnotes={notes} selected={noteSelected} />
        {showModal && (
          <UpdateNoteModal
            modal={closeModal}
            note={selectedNote}
            notes_change={notes_change}
            notes_content_change={notes_content_change}
            notes_title_change={notes_title_change}
          />
        )}
      </div>
    </div>
  );
}

export default App;
