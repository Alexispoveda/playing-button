import { useState, useEffect, useMemo } from 'react'
import alarmLogo from '/alarm.svg'
import './App.css'

const App = () => {

  const INITIAL_TIME = import.meta.env.VITE_INITIAL_TIME || 15;

  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [timerRunning, setTimerRunning] = useState(false);

  const audio = useMemo(() => new Audio("/alarm.wav"), []);

  useEffect(() => {
    if (timerRunning && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

    return () => {
      clearInterval(interval)
      audio.pause();
    };
    } else if (seconds === 0) {
      audio.play();
    }
  }, [timerRunning, seconds, audio]);

  const handleButtonClick = () => {
    if (timerRunning) {
      setSeconds(INITIAL_TIME);
      audio.pause();
    } else {
      setTimerRunning(true);
    }
  };

  return (
    <>
      <div>
        <a href="https://alexispoveda.com" target="_blank">
          <img src={alarmLogo} className="logo alarm" alt="Alarm image" />
        </a>
      </div>
      <h1>Timer</h1>
      <div className="card">
        <button onClick={handleButtonClick}>
          {timerRunning ? "Reset Timer" : "Start Timer"}
        </button>
        <p>
          Time Remaining: {seconds} seconds
        </p>
      </div>
    </>
  )
}

export default App
