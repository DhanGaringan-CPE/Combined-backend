import { useState } from 'react'
import { useScheduleContext } from "../hooks/useScheduleContext"

const ScheduleForm = () => {
  const { dispatch } = useScheduleContext()
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const timeBox = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
  ];


  const handleSubmit = async (e) => {
    e.preventDefault()

    const schedule = {day, time}
    
    const response = await fetch('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setDay('')
      setTime('')
      setEmptyFields([])
      console.log('new reservation added:', json)
      dispatch({type: 'CREATE_SCHEDULE', payload: json })
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add reservation</h3>

      <label>Set day (mon-sun):</label>
      <select 
        type="text" 
        onChange={(e) => setDay(e.target.value)} 
        value={day}
        className={emptyFields.includes('day')?'error':''}
      >
      <option value = "">Select a day</option>
      {daysOfWeek.map((day,index) =>(
        <option key={index} value={day}>
          {day}
        </option>
      ))}
      </select>
    
      

      <label>Set time (ex: 9:00 am):</label>
      <select 
        type="text" 
        onChange={(e) => setTime(e.target.value)} 
        value={time}
        className={emptyFields.includes('time')?'error':''}
      >
        <option value = "">Select time</option>
      {timeBox.map((time,index) =>(
        <option key={index} value={time}>
          {time}
        </option>
      ))}
      </select>

      <button>create reservation </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ScheduleForm