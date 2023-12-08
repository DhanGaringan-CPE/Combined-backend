import React, { useState, useEffect } from 'react';
import { useScheduleContext } from "../hooks/useScheduleContext";

const ScheduleForm = () => {
  const { dispatch, schedules } = useScheduleContext();
  const [selectedDay, setDay] = useState('');
  const [selectedTime, setTime] = useState('');
  const [error, setError] = useState(null);
  const [reservedTimes, setReservedTimes] = useState({});

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ];

  const timeBox = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  ];

  // Function to check if the time is reserved
  const isTimeReserved = (day, time) => {
    return reservedTimes[day]?.includes(time);
  };

  // Populate reserved times from schedules
  useEffect(() => {
  if (schedules) {
    const reserved = {};
    schedules.forEach(schedule => {
      if (!reserved[schedule.day]) {
        reserved[schedule.day] = [];
      }
      reserved[schedule.day].push(schedule.time);
    });
    setReservedTimes(reserved);
  }
}, [schedules]);
 // Depend on schedules

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
    } else {
      setError(null);
      setDay('');
      setTime('');
      dispatch({ type: 'CREATE_SCHEDULE', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add reservation</h3>

      <label>Set day (mon-sun):</label>
      <div className="day-buttons">
        {daysOfWeek.map((day) => (
          <button 
            type="button" 
            key={day} 
            onClick={() => setDay(day)}
            className={day === selectedDay ? 'selected' : ''}
            disabled={isTimeReserved(day, selectedTime)}
          >
            {day}
          </button>
        ))}
      </div>
      
      <label>Set time (ex: 9:00 am):</label>
      <div className="time-buttons">
        {timeBox.map((time) => (
          <button 
            type="button" 
            key={time} 
            onClick={() => setTime(time)}
            className={`${time === selectedTime ? 'selected' : ''} ${isTimeReserved(selectedDay, time) ? 'reserved' : ''}`}
            disabled={isTimeReserved(selectedDay, time)}
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
