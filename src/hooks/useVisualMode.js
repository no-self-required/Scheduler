import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Update mode state with newMode. Update history state with prev state and newMode
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }

  //Set mode to history prev state
  function back() {
    if (history.length > 1) {
      history.pop(); //remove last item from history stack
      setMode(history[history.length - 1]); //setMode with last item in history stack
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
