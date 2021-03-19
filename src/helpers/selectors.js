export function getAppointmentsForDay(state, day) {
  const [filteredDay] = state.days.filter(days => days.name === day);
  if (!filteredDay || !state.days.length === 0 ) return [];
  // console.log([filteredDay])
  // [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]

  const appointmentIds = filteredDay.appointments
  console.log('appointmentsIds returns', appointmentIds)
  const appointmentInfo = appointmentIds.map(element => state.appointments[element])

  console.log('Appt infor returns', appointmentInfo)
  return appointmentInfo;
};


export function getInterview(state, interview) {
  // console.log('Interview passes in':, interview);
  // console.log('State passes in:', state.interviewers)

  if (!interview) return null;
    
  const interviewer = state.interviewers[interview.interviewer]

  const interviewInfo = {
    student: interview.student,
    interviewer: interviewer
  }

  return interviewInfo;
};


export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(filteredDay => filteredDay.name === day)[0];
  if (!filteredDay || !state.days.length === 0 ) return [];

  const interviewersIds = filteredDay.interviewers;
  console.log('interviewersIds returns', interviewersIds);
  const interviewersInfo = interviewersIds.map(intId => state.interviewers[intId]);

  console.log('interviewers info returns', interviewersInfo)
  return interviewersInfo;
};

