import React, { useContext, useState } from 'react';
import './NoteItem.css'
import noteContext from '../context/notes/noteContext';
import EditModal from '../modals/EditModal';

const NoteItem = (props) => {
    const {note} = props;
    const readMore = () => {}
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const [isModalOpen, setModalOpen] = useState(false)
    const deleteCard = () => {
        deleteNote(note._id)
    }
    const openModal = () => {
      setModalOpen(true)
    }
    const closeModal = () => {
      setModalOpen(false);
  }
  return (
    <>
        <div className="card mx-3 my-3" style={{width: "18rem"}}>
        <div className="card-body card-style">
            <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-regular fa-pen-to-square mx-3" style={{color: "#777e83", cursor: "pointer"}} onClick={openModal}></i>
            <i className="fa-regular fa-trash-can" style={{color: "#777e83", cursor: "pointer"}} onClick={deleteCard}></i>
            </div>
            <p className={`card-text ${note.description.length > 160 ? 'card-info' : ''}`}>{note.description}</p>
            {note.description.length > 160 && (<button type="button" className="btn btn-dark" onClick={readMore}>Read more</button>)}
        </div>
    </div>
    <EditModal isOpen={isModalOpen} closeModal={closeModal} id={note._id} title={note.title} tag={note.tag} description={note.description}>
      </EditModal>
      </>
  )
}

export default NoteItem
