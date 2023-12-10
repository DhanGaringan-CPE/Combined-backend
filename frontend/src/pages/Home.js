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

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('/api/orderDetails'); // Remove trailing slash
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: 'SET_ORDERDETAILS', payload: json });
        } else {
          console.error("Failed to fetch order details:", response.status);
        }
      } catch (error) {
        console.error("Error while fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [dispatch]); // Add 'dispatch' to the dependency array


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