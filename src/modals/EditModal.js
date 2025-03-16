import React, { useState, useContext } from "react";
import "./EditModal.css";
import noteContext from '../context/notes/noteContext'


const EditModal = (props) => {
  const context = useContext(noteContext);
  const {editNote} = context;
  const [note, setnote] = useState({
    title: props.title,
    description: props.description,
    tag: props.tag,
    id: props.id
  });
  if (!props.isOpen) return null;

  const handleInputChange = (event) => {
    setnote({ ...note, [event.target.name]: event.target.value });
  };

  const updateNote = (e) => {
    e.preventDefault();
    editNote(note);
    props.closeModal();
  }

  const closePopup = (e) => {
    if (e.target.className === 'modal-overly'){
      props.closeModal();
    }
  }
  return (
    <div className="modal-overly" onClick={closePopup}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Note</h3>
          <button className="close-button" onClick={props.closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="description"
              className="form-control"
              id="description"
              name="description"
              aria-describedby="emailHelp"
              value={note.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger mx-3" onClick={props.closeModal}>
            Close
          </button>
          <button className="btn btn-success btn-container" disabled={!(note.title && note.description)} onClick={updateNote}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
