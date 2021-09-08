import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState((prev) => {
        const days = updateSpots(appointments, prev);
        return {
          ...prev,
          appointments,
          days,
        };
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => {
        const days = updateSpots(appointments, prev);
        return {
          ...prev,
          appointments,
          days,
        };
      });
    });
  }

  //1. Update spots when we book or cancel an interview
  //  - Values of spots is stored in: day object
  //  - Calculate number of spots depending on how many null interview slots.

  //2. Update state with new number of spots when the update is confirmed on the server side
  //3. Step 2. Should be done in the bookInterview and cancelInterview functions and applied in the .then part of the AJAX request

  function updateSpots(appointments, state) {
    //unpack days array
    let days = [...state.days];

    //Loop through every day object
    for (const day of days) {
      //set spots counter
      let spots = 0;
      //set a variable to all ids inside appointments array
      const appIDs = day.appointments;

      //Loop through all ids of appointments array
      for (const id of appIDs) {
        //if interview key of appointments[id] is null, add 1 to spots.
        if (appointments[id].interview === null) {
          spots++;
        }
      }
      //update spots value in days object for each day
      days[day.id - 1].spots = spots;
    }

    return days;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

export default useApplicationData;
