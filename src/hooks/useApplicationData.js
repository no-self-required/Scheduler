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

  function updateSpots(appointments, state) {
    //Create a days array copy
    let days = [...state.days];

    //Loop through every day object and initialize spots to 0
    for (const day of days) {
      let spots = 0;

      //Loop through all ids of appointments array; if interview key of appointments[id] is null, add 1 to spots.
      for (const id of day.appointments) {
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
