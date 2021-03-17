/*

Application.js  is the parent component so props won't be passed here usually. 

State: someData, setSomeData
        userDatam setUserData


When we call the setDay action, it changes the day state. 
When we change the state, the Application renders and passes the new day to the DayList. 
The DayList renders and passes props to the DayListItem children causing the updates to the selected visual state.

*/

import React, { useState } from "react"; //useState hook
import "components/Application.scss";
import DayList from 'components/DayList.js';
import Appointment from "components/Appointment/index";


// Test data 
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

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

const [day, setDay] = useState("Monday");

const appointmentsArr = appointments.map(appointment => {
  return (
    <Appointment key={appointment.id} {...appointment} />
  );
});

appointmentsArr.push(<Appointment key="last" time="5pm" />)

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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArr}
      </section>
    </main>
  );
}


// const interviewerListItems = interviewers.map(interviewer => {
//   return (
//     <InterviewerListItem
//       key={interviewer.id}
//       name={interviewer.name}
//       id={interviewer.id}
//       avatar={interviewer.avatar}
//       selected={interviewer.id === currentInterviewer}
//       setInterviewer={setInterviewer}
//     />
//   );
// });

// return (
//   <section className="interviewers">
//     <h4 className="interviewers__header text--light">Interviewer</h4>
//     <ul className="interviewers__list">
//       {interviewerListItems}
//     </ul>
//   </section>
// )