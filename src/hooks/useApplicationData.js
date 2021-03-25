import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  };

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  };

  const setSpotsForDay = (targetDay, newSpots) => {
    setState((prev) => ({
      ...prev,
      days: prev.days.map(
        (day) => (day.name === targetDay ? { ...day, spots: newSpots } : day) 
      ),
    }));
  };

  useEffect(() => {
    const spotsRemaining = () => {
      state.days.forEach((day) => {
        
        const newSpotsRemaining = day.appointments
          .map((apptId) => state.appointments[apptId].interview)
          .filter((item) => item === null).length; 
        
          if (newSpotsRemaining !== day.spots) {
          setSpotsForDay(day.name, newSpotsRemaining);
        }
      });
    };
    spotsRemaining();
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
