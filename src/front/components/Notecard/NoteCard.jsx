import React from 'react'
import './notecard.scss'

export const NoteCard = () => {
  return (
    <div className='wrapper'>
      <div className='card-header'>
        <h2>Titulo</h2>
      </div>
      <div className='card-content'>
        <p>Contenido de la card</p>
      </div>
      <div className='card-footer'>
        <div>
          <p>Fecha: 16/06/1991</p>
        </div>
        <div>
          <button><i className="fa-solid fa-pen"/></button>
        </div>
      </div>
    </div>
  )
}
