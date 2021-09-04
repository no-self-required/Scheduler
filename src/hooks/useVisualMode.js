import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    const stack = [...history];

    if (replace) {
      stack.pop();
    }
    setHistory([...history, newMode]);
    setMode(newMode);
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
