import { useScheduleContext } from "../hooks/useScheduleContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ScheduleDetails = ({ schedule }) => {
const { dispatch } = useScheduleContext()


  const handleClick = async () => {
    const response = await fetch('/api/schedule/' + schedule._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_SCHEDULE', payload: json})

    }
  }

    return (
      <div className="schedule-detail">
        <h4>Reservation</h4>
        <p><strong>Name: </strong>{schedule.name}</p>
        <p><strong>Address: </strong>{schedule.address}</p>
        <p><strong>Mobile Number: </strong>{schedule.mobile_number}</p>
        <p><strong>Service Options: </strong>{schedule.service_options}</p>
        <p><strong>Weight (kg): </strong>{schedule.weight}</p>
        <p><strong>Laundry Services: </strong>{schedule.laundry_services}</p>
        <p><strong>Mode of Payment: </strong>{schedule.payment}</p>
        <p><strong>Delivery Options: </strong>{schedule.delivery_options}</p>
        <p><strong>Total: </strong>{schedule.total}</p>
        <p><strong>Day: </strong>{schedule.day}</p>
        <p><strong>time: </strong>{schedule.time}</p>
        <p>{formatDistanceToNow(new Date(schedule.createdAt), { addSuffix: true })}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
  } 
  
  export default ScheduleDetails

// <h4 style={{ color: '#24b28a' }}>Reservation</h4>
