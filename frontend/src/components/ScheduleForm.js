import React, { useState, useEffect } from 'react';
import { useScheduleContext } from "../hooks/useScheduleContext";

const ScheduleForm = () => {
  const { dispatch, schedules } = useScheduleContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [service_options, setServiceOptions] = useState("");
  const [weight, setWeight] = useState("");
  const [laundry_services, setLaundryServices] = useState([]);
  const [payment, setPayment] = useState("");
  const [delivery_options, setDelivery] = useState("");
  const [total, setTotal] = useState(0);
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
   useEffect(() => {
    let newTotal = 0;

    newTotal += laundry_services.reduce((total, service) => {
      if (service === "Wash" || service === "Dry") {
        return total + 80; // Assign the value 80 for "Wash" and "Dry"
      } else if (service === "Fold") {
        return total + 30; // Assign the value 30 for "Fold"
      }
      return total;
    }, 0);

    if (delivery_options === "Deliver") newTotal += 80;

    setTotal(newTotal);
  }, [laundry_services, delivery_options]);

  const handleServiceOptionClick = (option) => {
    setServiceOptions(option);
  };

  const handleLaundryServiceClick = (option) => {
    if (option === "Wash") {
      // Ensure wash is selected before the others
      setLaundryServices([option]);
    } else if (option === "Dry") {
      if (laundry_services.includes("Wash") && !laundry_services.includes("Dry")) {
        // Add "Dry" only if "Wash" is included and "Dry" is not
        setLaundryServices([...laundry_services, option]);
      }
    } else if (option === "Fold") {
      if (laundry_services.includes("Wash") && laundry_services.includes("Dry") && !laundry_services.includes("Fold")) {
        // Add "Fold" only if "Wash" and "Dry" are included and "Fold" is not
        setLaundryServices([...laundry_services, option]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schedule = { name,
      address,
      mobile_number,
      service_options,
      weight,
      laundry_services,
      payment,
      delivery_options,
      total,
      day: selectedDay, 
      time: selectedTime };

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
      setName("");
      setAddress("");
      setMobileNumber("");
      setServiceOptions("");
      setWeight("");
      setLaundryServices([]);
      setPayment("");
      setDelivery("");
      setTotal(0);
      setError(null);
      setDay('');
      setTime('');
      dispatch({ type: 'CREATE_SCHEDULE', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add reservation</h3>

      <label>Name: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Address: </label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />

      <label>Mobile Number: </label>
      <input
        type="text"
        onChange={(e) => setMobileNumber(e.target.value)}
        value={mobile_number}
      />

      <label>Service Options: </label>
      <div>
        <button
          onClick={() => handleServiceOptionClick("Self Service")}
          className={service_options === "Self Service" ? "selected" : ""}
        >
          Self Service
        </button>
        <button
          onClick={() => handleServiceOptionClick("Full Service")}
          className={service_options === "Full Service" ? "selected" : ""}
        >
          Full Service
        </button>
      </div>

      <label>Weight: </label>
      <div>
        <button onClick={() => setWeight("8")} className={weight === "8" ? "selected" : ""}>
          8 kg
        </button>
        <button onClick={() => setWeight("12")} className={weight === "12" ? "selected" : ""}>
          12 kg
        </button>
      </div>

      <label>Laundry Services: </label>
      <div>
        <button onClick={() => handleLaundryServiceClick("Wash")} className={laundry_services.includes("Wash") ? "selected" : ""}>
          Wash
        </button>
        <button onClick={() => handleLaundryServiceClick("Dry")} className={laundry_services.includes("Dry") ? "selected" : ""}>
          Dry
        </button>
        <button onClick={() => handleLaundryServiceClick("Fold")} className={laundry_services.includes("Fold") ? "selected" : ""}>
          Fold
        </button>
      </div>

      <label>Mode of Payment: </label>
      <select onChange={(e) => setPayment(e.target.value)} value={payment}>
        <option value="">Select payment</option>
        <option value="Cash">Cash</option>
        <option value="Gcash">Gcash</option>
      </select>

      <label>Delivery Options: </label>
      <select onChange={(e) => setDelivery(e.target.value)} value={delivery_options}>
        <option value="">Select delivery</option>
        <option value="Pick Up">Pick Up</option>
        <option value="Deliver">Deliver</option>
      </select>

      <label>Total: </label>
      <input type="text" value={total} readOnly />


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
