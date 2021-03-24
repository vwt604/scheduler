export function getAppointmentsForDay(state, day) {
  const [filteredDay] = state.days.filter(
    (unFilteredDay) => unFilteredDay.name === day
  );
  if (!filteredDay || !state.days.length === 0) return [];
  // console.log([filteredDay])
  // [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]

  const appointmentIds = filteredDay.appointments;
  const appointmentInfo = appointmentIds.map(
    (element) => state.appointments[element]
  );

  // console.log('This is from selectors.js. Appt infor returns', appointmentInfo)
  return appointmentInfo;
}

export function getInterview(state, interview) {
  // console.log('Interview passes in':, interview);
  // console.log('State passes in:', state.interviewers)

  if (!interview) return null;

  const interviewer = state.interviewers[interview.interviewer];

  const interviewInfo = {
    student: interview.student,
    interviewer: interviewer,
  };
  return interviewInfo;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(
    (unFilteredDay) => unFilteredDay.name === day
  ); //find returns the first value. vs filter returns array
  if (!filteredDay || !state.days.length === 0) return [];

  const interviewerIds = filteredDay.interviewers;
  const interviewersInfo = interviewerIds.map(
    (intId) => state.interviewers[intId]
  );

  // console.log('This is from selectors.js. interviewers info returns', interviewersInfo)
  return interviewersInfo;
}
