import React, { useState, useEffect } from "react";

export default function useVisualMode (initial) {
  // Initial mode
  const [mode, setMode] = useState(initial);
  // Transition mode
  const transition = (newMode) => {
    setMode(newMode)
  }



  return { mode, transition }

 
}