import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const onChange = (e) => {
     setNote({...note, [e.target.name] : e.target.value})
    }
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note)
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })
    }
  return (
    <div className='container'>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAdd}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote
