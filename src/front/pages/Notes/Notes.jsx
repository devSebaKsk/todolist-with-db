import React, {useEffect, useState} from 'react'
import {NoteCard} from '../../components/Notecard/NoteCard'
import {NoteCardCreation} from '../../components/NoteCardForm/NoteCardForm'
import './notes.scss'
import { NewNote } from '../../components/NewNote/NewNote'

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

    const handleNewNote = () => {
        const newNote = document.querySelector('.notes-container NoteCardCreation')
        const newNoteButton = document.querySelector('.notes-container NewNote')

        if (newNote) {
            newNote.style.display = 'none'
        }
        if (newNoteButton) {
            newNoteButton.style.display = 'block'
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
            <NoteCardCreation />
            <NewNote handleNewNote={handleNewNote}/>
        </div>
    </div>
  )
}
