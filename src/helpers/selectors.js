export function getAppointmentsForDay(state, day) {
  const [filteredDay] = state.days.filter(
    (unFilteredDay) => unFilteredDay.name === day
  );

  if (!filteredDay || !state.days.length === 0) return [];

  const appointmentIds = filteredDay.appointments;
  const appointmentInfo = appointmentIds.map(
    (element) => state.appointments[element]
  );

  return appointmentInfo;
}

export function getInterview(state, interview) {
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
  ); 
  
  if (!filteredDay || !state.days.length === 0) return [];

  const interviewerIds = filteredDay.interviewers;
  const interviewersInfo = interviewerIds.map(
    (intId) => state.interviewers[intId]
  );

  return interviewersInfo;
}
