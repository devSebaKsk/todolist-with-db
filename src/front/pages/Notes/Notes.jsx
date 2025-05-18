import React, {useEffect, useState} from 'react'
import {NoteCard} from '../../components/Notecard/NoteCard'
import {NoteCardCreation} from '../../components/NoteCardForm/NoteCardForm'
import './notes.scss'

export const Notes = () => {
    const [notes, setNotes] = useState([])

    const handleGetNotes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`)
            const data = await response.json()
            setNotes(data)
        } catch (error) {
            console.error('Error fetching notes:', error)
        }
    }
    useEffect(() => {
        handleGetNotes()
    }, [])


  return (
    <div>
        <h1>Notes</h1>
        <div className='notes-container'>
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
            <NoteCardCreation />
            
        </div>
    </div>
  )
}
