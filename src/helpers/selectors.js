export function getAppointmentsForDay(state, day) {
  let results = [];
  for (const item of state.days) {
    if (item.name === day) {
      for (const x of item.appointments) {
        results.push(state.appointments[x]);
      }
    }
  }
  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, day) {
  const output = [];
  const days = [...state.days];
  const interviewers = { ...state.interviewers };
  const currentDay = days.filter((x) => x.name === day);
  let currentInterviewers;
  if (currentDay[0]) {
    currentInterviewers = currentDay[0].interviewers;
  }
  if (currentInterviewers) {
    currentInterviewers.map((i) => output.push(interviewers[i]));
  }
  return output;
}
