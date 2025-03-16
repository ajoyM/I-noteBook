import React from 'react'
import Note from './Note';
import AddNote from './AddNote';

const Home = () => {
  return (
    <div className='container'>
      <h3>Home page</h3>
      <AddNote />
      <h3>Add notes</h3>
        <Note />
    </div>
  )
}

export default Home
