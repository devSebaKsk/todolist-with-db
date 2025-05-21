import React, { useState } from 'react'
import './notecardform.scss'

export const NoteCardCreation = (props) => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const date = new Date().toLocaleDateString();

  const handleCreateNote = async () => {
    const note = {
      title: title,
      body: body
    };
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
        });
        if (response.ok) {
          const newNote = await response.json()
          console.log('Note created successfully');
          props.addNote(newNote)
          setTitle("")
          setBody("")
          props.toggleNewNote()
        } else {
          console.error('Error creating note');
        }
      } catch (error) {
        console.error('Error creating note:', error);
      }
    }


    
  


  return (
    <div className='wrapper-form'>
      <form>
      <div className='card-header'>
        <h1><input placeholder='Title' onChange={(e)=>{
          setTitle(e.target.value)
        }} /></h1>
      </div>
      <div className='card-content'>
        <p><textarea placeholder='Content' onChange={
          (e)=>{
            setBody(e.target.value)}} /></p>
      </div>
      <div className='card-footer'>
        <div>
          <p>Fecha: {date}</p>
        </div>
        <div>
          <button type="button" onClick={handleCreateNote}><i className="fa-solid fa-plus"/></button>
        </div>
      </div>
      </form>
    </div>
  )
}
