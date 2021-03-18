export function getAppointmentsForDay(state, day) {
  const [filteredDay] = state.days.filter(days => days.name === day);

  if (!filteredDay || !state.days.length === 0 ) return [];

  const appointments = filteredDay.appointments
  const appointmentInfo = appointments.map(element => state.appointments[element])

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
  console.log('interviewerInfo returns:', interviewInfo);

  return interviewInfo;
};