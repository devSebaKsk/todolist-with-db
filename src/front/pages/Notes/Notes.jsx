import React, {useEffect, useState} from 'react'
import {NoteCard} from '../../components/Notecard/NoteCard'
import {NoteCardCreation} from '../../components/NoteCardForm/NoteCardForm'
import './notes.scss'
import { NewNote } from '../../components/NewNote/NewNote'

export const Notes = () => {
    const [notes, setNotes] = useState([])

    const addNote = (note) => {
        setNotes([note, ...notes])
    }

    const [toggle, setToggle] = useState({ display: 'none' })
    const [toggleUser, setToggleUSer] = useState({ display: 'block' })
    const [estado, setEstado] = useState("")

    const handleGetNotes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`)
            const data = await response.json()
            setNotes(data)
        } catch (error) {
            console.error('Error fetching notes:', error)
        }
    }

    const toggleNewNote = () => {

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
    useEffect(() => {
        handleGetNotes()
    }, [])


  return (
    <div>
        <div className='notes-container'>
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
            <div style={toggle} >
            <NoteCardCreation addNote={addNote} toggleNewNote={toggleNewNote}/>
            </div>
            <NewNote style={toggleUser} toggleNewNote={toggleNewNote}/>
        </div>
    </div>
  )
}
