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
        <p><strong>Day: </strong>{schedule.day}</p>
        <p><strong>time: </strong>{schedule.time}</p>
        <p>{formatDistanceToNow(new Date(schedule.createdAt), { addSuffix: true })}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
  } 
  
  export default ScheduleDetails

// <h4 style={{ color: '#24b28a' }}>Reservation</h4>
