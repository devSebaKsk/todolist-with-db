import React, { useState } from 'react'
import './notecardform.scss'

export const NoteCardCreation = (props) => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const date = new Date().toLocaleDateString();

  const [toggle, setToggle] = useState({ display: 'none' })
  const [toggleUser, setToggleUSer] = useState({ display: 'block' })
  const [estado, setEstado] = useState("")

  const [color, setColor] = useState({backgroundColor: '#6340bc'})


  const handleColor = (color) => {
    setColor(color)
  }
  const toggleColor = () => {

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
        window.location.reload()
      } else {
        console.error('Error creating note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  }






  return (
    <div className='wrapper-form' style={color}>
      <form>
        <div className='card-header'>
          <h1><input placeholder='Title' onChange={(e) => {
            setTitle(e.target.value)
          }} /></h1>
        </div>
        <div className='card-content'>
          <p><textarea placeholder='Content' onChange={
            (e) => {
              setBody(e.target.value)
            }} /></p>
        </div>
        <div className='card-footer'>
          <div>
            <p>Fecha: {date}</p>
          </div>
          <div className='card-footer-buttons'>
            <button type="button" style={toggleUser} onClick={toggleColor}><i className="fa-solid fa-palette" /></button>
            <div style={toggle} className='color-palette'>
              <button type="button" onClick={()=> (setColor({ backgroundColor: '#176294' }), toggleColor())} className='color-blue'><i className="fa-solid fa-droplet"></i></button>
              <button type="button" onClick={()=> (setColor({ backgroundColor: '#6340bc' }), toggleColor())} className='color-purple'><i className="fa-solid fa-droplet"></i></button>
              <button type="button" onClick={()=> (setColor({ backgroundColor: '#40bc72' }), toggleColor())} className='color-green'><i className="fa-solid fa-droplet"></i></button>
            </div>
            <button type="button" onClick={handleCreateNote}><i className="fa-solid fa-plus" /></button>
          </div>
        </div>
      </form>
    </div>
  )
}
