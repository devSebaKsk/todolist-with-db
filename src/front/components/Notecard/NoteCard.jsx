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
          <button><i className="fa-solid fa-pen"/></button>
        </div>
      </div>
    </div>
  )
}
