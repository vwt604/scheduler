import React, { useEffect, useState } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from 'components/DayList.js';
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {

  // Combined useState calls 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // Updates the state with appointments for the day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    )
  });


  // Updates the state with the new day
  const setDay = day => setState({ ...state, day });


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
        // console.log('INTERVIEWERS:', all[2].data);
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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}