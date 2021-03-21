import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  // Combined useState calls 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });
  
  // Changing local state
  const bookInterview = (id, interview) =>  {
    console.log('Deleting...')
    
    // appointment object with values copied from existing appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    // update pattern to replace the existing record with the matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    // Saves updated booking information
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        console.log('Successfully booked appointment')
        setState({
          ...state,
          appointments
        })
      })
  }
  
  const cancelInterview = (id, interview) => {
    console.log('Deleting...')
    const appointment = { 
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = { 
      ...state.appointments,
      [id]: appointment
    };
  
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        console.log('Successfully deleted')
          setState({
            ...state, 
            appointments
          })
      })
  }
  
  // Fetch data from API
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      });
    }, []);

  // Updates the state with the new day
  const setDay = day => setState({ ...state, day });

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

