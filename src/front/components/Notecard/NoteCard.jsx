import React, { useState, useEffect } from 'react'
import './notecard.scss'

export const NoteCard = ({ note }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState('')
  const [toggle, setToggle] = useState({ display: 'none' })
  const [toggleUser, setToggleUSer] = useState({ display: 'block' })
  const [estado, setEstado] = useState("")


  const handleGetNote = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${note.id}`)
      const data = await response.json()
      setTitle(data.title)
      setBody(data.body)
      setDate(data.date)
    }
    catch (error) {
      console.error('Error fetching note:', error)
    }
  }

  const toggleEditButton = () => {

    if (estado === "") {
      setToggle({ display: 'block' });
      setToggleUSer({ display: 'none' });

      setEstado("active")
    } else {
      setToggle({ display: 'none' });
      setToggleUSer({ display: 'block' });
      setEstado("")
    }
  }

  

  const handleChangeNote = async (id) => {
    const note = {
      title: title,
      body: body
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });
      if (response.ok) {
        console.log('Note updated successfully');
      } else {
        console.error('Error updating note');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }



  useEffect(() => {
    handleGetNote()
  }, [])

  return (
    <div className='wrapper'>
      <div className='card-header'>
        <h2 style={toggleUser}>{title}</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={toggle} />
      </div>
      <div className='card-content'>
        <p style={toggleUser}>{body}</p>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} style={toggle} />
      </div>
      <div className='card-footer'>
        <div>
          <p>Fecha: {date}</p>
        </div>
        <div>
          <button className='pen-button' style={toggleUser}><i className="fa-solid fa-pen" onClick={toggleEditButton} /></button>
          <div className='editButtons' style={toggle}>
            <button onClick={() => handleChangeNote(1)}><i className="fa-solid fa-floppy-disk" /></button>
            <button><i className="fa-solid fa-trash" /></button>
            <button onClick={toggleEditButton}><i className="fa-solid fa-xmark" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
