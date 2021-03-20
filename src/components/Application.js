import React, { useEffect, useState } from "react";
import axios from 'axios';
import DayList from 'components/DayList.js';
import "components/Application.scss";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {

  // Combined useState calls 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  // Changing local state
  const bookInterview = (id, interview) =>  {
    // console.log('this is from application.js book interview', id, interview)
    
    // appointment object with values copied from existing appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // console.log('TEST', appointment)
    // {id: 4, time: "3pm", interview: {…}}
    
    // update pattern to replace the existing record with the matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Saves updated booking information
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
          ...state,
          appointments
        })
      })
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err))
  }

  // Updates the state with interviewers for the day
  const interviewersForDay = [...getInterviewersForDay(state, state.day)];

  // Updates the state with the new day
  const setDay = day => setState({ ...state, day });

  // Updates the state with appointments for the day
  const appointments = getAppointmentsForDay(state, state.day);
  
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={bookInterview}
      />
    )
  });


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


    return (
      <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            day={state.day} 
            setDay={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

