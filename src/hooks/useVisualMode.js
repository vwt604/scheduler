import React, { useState, useEffect } from "react";

export default function useVisualMode (initial) {
  // Initial mode
  const [mode, setMode] = useState(initial);
  // Tracks history of modes
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
		if (replace) {  // Replaces the current mode in the history with a new one
			setHistory(prev => [...prev.slice(0, -1), newMode]);
			setMode(newMode);
		} else {
			setHistory(prev => [...prev, newMode]);
			setMode(newMode);
		}
	};

	const back = () => {
		if (history.length > 1) { // Back limit. Constraint from going back past initial 
			history.pop();
			setHistory(prev => [...prev]);
			setMode(history[history.length - 1]);
		}
	};


  return { mode, transition, back }

 
}