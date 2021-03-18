import React, { useEffect, useState } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from 'components/DayList.js';
import Appointment from "components/Appointment/index";


// Test data 

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Amy Mansell",
      interviewer: {
        id: 2,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }, 
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Joe Doe",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }, 
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Karen Jones",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];


export default function Application(props) {

  // Combined useState calls 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // Creating object with keys of state
  // const state = { day: "Monday", days: [] };
  // setState({ ...state, day: "Tuesday" });

  // Updates the state with the new day
  const setDay = day => setState({ ...state, day });

  // Updates day state
  const setDays = days => setState(prev => ({ ...prev, days }));

  // Fetch day data from API
  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(res => {setDays([...res.data])})
  }, []); 


  const appointmentsArr = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });

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
        {appointmentsArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}