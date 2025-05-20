import React from 'react'
import './newnote.scss'
import { useState } from 'react'

export const NewNote = (props) => {
  return (
    <div className='wrapper-newnote'>
        <div className='newnote-container'>
            <div className='newnote'>
            <h2>New Note</h2>
            <button onClick={props.handleNewNote} ><i class="fa-solid fa-plus fa-2xl"></i></button>
            </div>
        </div>
    </div>
  )
}
