import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

const Note = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;
    useEffect(() => {
      getNotes().then((data) => console.log('note is list', data));
    }, []);
  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
        {notes.map((note) => {
            return <NoteItem note={note} />
        })}
    </div>
  )
}

export default Note
