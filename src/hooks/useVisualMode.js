import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
  }

  function back() {
    const stack = [...history];
    if (history.length > 1) {
      stack.pop();
      setHistory(stack);
      setMode(stack[stack.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
