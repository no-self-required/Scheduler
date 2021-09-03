export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let results = []
  for (const item of state.days) {   
    if (item.name === day) {
      for (const x of item.appointments) {
        results.push(state.appointments[x])
      }
    }
  }
  return results
}

