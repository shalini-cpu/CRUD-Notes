import React, { useState } from "react";

// using react hooks here
function AddNoteForm({ add_note }) {
  // declaring states

  const [titleFieldVisible, setTitleFieldVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const showTitleField = () => {
    setTitleFieldVisible(true);
  };

  const hideTitleField = () => {
    setTitleFieldVisible(false);
  };

  // submit form

  const handleSubmit = e => {
    e.preventDefault();

    if (title || content) {
      let d = new Date();
      const id = Date.parse(d);
      const a = { id: id, title: title, content: content };
      add_note(a);
      //     db
      //     .createNote(title.trim(), content.trim())
      //     .then(
      //         () => {
      //             // reset all states
      //             setTitle('')
      //             setContent('')
      //             setTitleFieldVisible('false')
      //         },
      //         e => console.log(e), // log any error in console
      //     )

      // reset all states
      setTitle("");
      setContent("");
      setTitleFieldVisible("false");
    }
  }; // end of handleSubmit

  return (
    <div>
      <div className="create-form">
        {titleFieldVisible && (
          <div className="backdrop" onClick={hideTitleField} />
        )}

        <form onSubmit={handleSubmit} className="create-note">
          {titleFieldVisible && (
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onFocus={showTitleField}
              name="title"
              placeholder="Title"
            />
          )}

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            onFocus={showTitleField}
            name="content"
            placeholder="Take a note..."
          />
          <button type="Submit">
            <span>&#43;</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNoteForm;
