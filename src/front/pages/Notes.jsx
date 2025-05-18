import React from 'react'
import {NoteCard} from '../components/Notecard/NoteCard'
import {NoteCardCreation} from '../components/NoteCardForm/NoteCardForm'

export const Notes = () => {
    
  return (
    <div>
        <h1>Notes</h1>
        <div className='notes-container'>
            <NoteCard />
            <NoteCardCreation />
            
        </div>
    </div>
  )
}
