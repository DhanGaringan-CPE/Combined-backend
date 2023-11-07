import { useEffect, /* useState*/ } from "react"
import { useScheduleContext } from "../hooks/useScheduleContext"

// components
import ScheduleDetails from "../components/ScheduleDetails"
import ScheduleForm from "../components/ScheduleForm"

const Home = () => {
  const {schedules, dispatch} = useScheduleContext()
//    const [schedules, setSchedules] = useState(null)

  useEffect(() => {
    const fetchSchedules = async () => {
      const response = await fetch('/api/schedule')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_SCHEDULES', payload: json})

//        setSchedules(json)
      }
    }

    fetchSchedules()
  }, [dispatch])

  return (
    <div className="home">
      <div className="schedules">
        {schedules && schedules.map(schedule => (
          <ScheduleDetails schedule={schedule} key={schedule._id} />
        ))}
      </div>
      <ScheduleForm />
    </div>
  )
}

export default Home