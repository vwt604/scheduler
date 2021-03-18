export function getAppointmentsForDay(state, day) {
  const [filteredDay] = state.days.filter(days => days.name === day);

  if (!filteredDay || !state.days.length === 0 ) return [];

  const appointments = filteredDay.appointments
  const appointmentInfo = appointments.map(element => state.appointments[element])

  return appointmentInfo;
};