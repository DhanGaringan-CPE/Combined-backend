import { createContext, useReducer } from 'react'

export const ScheduleContext = createContext()

export const ScheduleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCHEDULES':
      return { 
        schedules: action.payload 
      }
    case 'CREATE_SCHEDULE':
      return { 
        schedules: [action.payload, ...state.schedules] 
      }

    case 'DELETE_SCHEDULE':
        return{
            schedules: state.schedules.filter(w => w._id !== action.payload._id)
        }
    default:
      return state
  }
}

export const ScheduleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ScheduleReducer, { 
    schedules: null
  })
  
  return (
    <ScheduleContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ScheduleContext.Provider>
  )
}