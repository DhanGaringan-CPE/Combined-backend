import React, { useState } from 'react';
import { useScheduleContext } from "../hooks/useScheduleContext";

const ScheduleForm = () => {
  const { dispatch } = useScheduleContext();
  const [selectedDay, setDay] = useState('');
  const [selectedTime, setTime] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ];

  const timeBox = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schedule = { day: selectedDay, time: selectedTime };
    
    const response = await fetch('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setDay('');
      setTime('');
      setEmptyFields([]);
      console.log('new reservation added:', json);
      dispatch({ type: 'CREATE_SCHEDULE', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add reservation</h3>

      <label>Set day (mon-sun):</label>
      <div className={emptyFields.includes('day') ? 'day-buttons error' : 'day-buttons'}>
        {daysOfWeek.map((day) => (
          <button 
            type="button" 
            key={day} 
            onClick={() => setDay(day)}
            className={day === selectedDay ? 'selected' : ''}
          >
            {day}
          </button>
        ))}
      </div>
      
      <label>Set time (ex: 9:00 am):</label>
      <div className={emptyFields.includes('time') ? 'time-buttons error' : 'time-buttons'}>
        {timeBox.map((time) => (
          <button 
            type="button" 
            key={time} 
            onClick={() => setTime(time)}
            className={time === selectedTime ? 'selected' : ''}
          >
            {time}
          </button>
        ))}
      </div>

      <button type="submit">Create reservation</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ScheduleForm;
