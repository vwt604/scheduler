import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Combined useState calls. Where values/data is stored
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Changing local state
  const bookInterview = (id, interview) => {
    console.log("Booking...");

    // appointment object with values copied from existing appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // update pattern to replace the existing record with the matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Saves updated booking information
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      console.log("Successfully booked appointment");
      setState({
        ...state,
        appointments,
      });
    });
  };

  const cancelInterview = (id, interview) => {
    console.log("Deleting...");
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
      console.log("Successfully deleted");
      setState({
        ...state,
        appointments,
      });
    });
  };

  const setSpotsForDay = (targetDay, newSpots) => {
    //sets the target day's spots in memory
    setState((prev) => ({
      ...prev,
      days: prev.days.map(
        (day) => (day.name === targetDay ? { ...day, spots: newSpots } : day) //for each day of the week, if targetDay is selected,  update spot with newSpots
      ),
    }));
  };

  useEffect(() => {
    const spotsRemaining = () => {
      state.days.forEach((day) => {
        //for each day set in memory,
        const newSpotsRemaining = day.appointments
          .map((apptId) => state.appointments[apptId].interview) //looks into appointments stored in memory. forEach appt,
          .filter((item) => item === null).length; //filter num of appointments where interview = null (avalable spot)
        if (newSpotsRemaining !== day.spots) {
          //update spots if there's been a change to spots (newSpotsRemaining)
          setSpotsForDay(day.name, newSpotsRemaining); //update that day's spots with newSpotsRemaining
        }
      });
    };
    spotsRemaining();
  });

  // Fetch data from API
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

  // Updates the state with the new day
  const setDay = (day) => setState({ ...state, day });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
