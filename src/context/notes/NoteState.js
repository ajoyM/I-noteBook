import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3500";

  // Get note list
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/note/getNote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBc21taXRhYWEiLCJlbWFpbCI6ImFzbWl0YU1hMTIzQHlvcG1haWwuY29tIiwiaWQiOiI2NmM3NzkyZjMxNzU4MWUzM2Q1Y2Q4Y2YifSwiaWF0IjoxNzI0NjExODE1fQ.5FJ4KZ_37o14g1X-zvmWRj_xMqvV266jHTmi2nN0PJo",
        },
      });
      const res = await response.json();
      setNotes(res);
      return res;
    } catch (error) {
      console.log("errror", error);
    }
  };
  // Add new note
  const addNote = async(note) => {
    const {title, description, tag} = note;
    try {
      const response = await fetch(`${host}/api/note/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBc21taXRhYWEiLCJlbWFpbCI6ImFzbWl0YU1hMTIzQHlvcG1haWwuY29tIiwiaWQiOiI2NmM3NzkyZjMxNzU4MWUzM2Q1Y2Q4Y2YifSwiaWF0IjoxNzI0NjExODE1fQ.5FJ4KZ_37o14g1X-zvmWRj_xMqvV266jHTmi2nN0PJo",
        },
        body: JSON.stringify({
          title,
          description,
          tag
        })
      });
      const res = await response.json();
      if (res) {
        await getNotes();
      }
    } catch (error) {
      console.log("errror", error);
    }
  };

  // edit a node
  const editNote = async (note) => {
    const {title, description, tag} = note;
    try {
      const response = await fetch(`${host}/api/note/update/${note.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBc21taXRhYWEiLCJlbWFpbCI6ImFzbWl0YU1hMTIzQHlvcG1haWwuY29tIiwiaWQiOiI2NmM3NzkyZjMxNzU4MWUzM2Q1Y2Q4Y2YifSwiaWF0IjoxNzI0NjExODE1fQ.5FJ4KZ_37o14g1X-zvmWRj_xMqvV266jHTmi2nN0PJo",
        },
        body: JSON.stringify({
          title,
          description,
          tag
        })
      });
      const res = await response.json();
      if (res) {
        await getNotes();
      }
    } catch (error) {
      console.log(error)
    }
  };

  // delete a node
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/note/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBc21taXRhYWEiLCJlbWFpbCI6ImFzbWl0YU1hMTIzQHlvcG1haWwuY29tIiwiaWQiOiI2NmM3NzkyZjMxNzU4MWUzM2Q1Y2Q4Y2YifSwiaWF0IjoxNzI0NjExODE1fQ.5FJ4KZ_37o14g1X-zvmWRj_xMqvV266jHTmi2nN0PJo",
        },
      });
      const res = await response.json();
      if (res && res.success) {
        await getNotes();
      }
    } catch (error) {
      console.log("errror", error);
    }
  };
  //
  const [notes, setNotes] = useState([]);
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
