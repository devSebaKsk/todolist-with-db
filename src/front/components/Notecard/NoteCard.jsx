import React , {useState, useEffect} from 'react'
import './notecard.scss'

export const NoteCard = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState('')

  const handleGetNote = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/1`)
      const data = await response.json()
      setTitle(data.title)
      setBody(data.body)
      setDate(data.date)
    }
    catch (error) {
      console.error('Error fetching note:', error)
    }
  }

  const handleEditNote = () => {
    const titleInput = document.querySelector('.card-header h2')
    const bodyInput = document.querySelector('.card-content p')
    const saveButton = document.querySelector('.editButtons')
    const editButton = document.querySelector('.pen-button')

    if (saveButton) {
      saveButton.style.display = 'block'
    }
    if (editButton) {
      editButton.style.display = 'none'
    }

    titleInput.contentEditable = true
    bodyInput.contentEditable = true
  }

  const handleCloseEdit = () => {
    const titleInput = document.querySelector('.card-header h2')
    const bodyInput = document.querySelector('.card-content p')
    const saveButton = document.querySelector('.editButtons')
    const editButton = document.querySelector('.pen-button')

    if (saveButton) {
      saveButton.style.display = 'none'
    }
    if (editButton) {
      editButton.style.display = 'block'
    }

    titleInput.contentEditable = false
    bodyInput.contentEditable = false
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
        <h2>{title}</h2>
      </div>
      <div className='card-content'>
        <p>{body}</p>
      </div>
      <div className='card-footer'>
        <div>
          <p>Fecha: {date}</p>
        </div>
        <div>
          <button className='pen-button'><i className="fa-solid fa-pen" onClick={handleEditNote}/></button>
          <div className='editButtons' style={{display: 'none'}}>
            <button onClick={() => handleChangeNote(1)}><i className="fa-solid fa-floppy-disk"/></button>
            <button><i className="fa-solid fa-trash"/></button>
            <button onClick={handleCloseEdit}><i className="fa-solid fa-xmark"/></button>
          </div>
        </div>
      </div>
    </div>
  )
}
