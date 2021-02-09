import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Focus from "./Focus";
import Break from "./Break";
import { minutesToDuration, secondsToDuration } from "../utils/duration";


function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDurationMins, setFocusDurationMins] = useState(25);
  const [breakDurationMins, setBreakDurationMins] = useState(5);
  const [initialPlay, setInitialPlay] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [activeSession, setActiveSession] = useState(false);
  const [durationMins, setDurationMins] = useState(25);
  const [durationSecs, setDurationSecs] = useState(0);
  const [initialDuration, setInitialDuration] = useState(25);
  const [initialBreakDuration, setInitialBreakDuration] = useState(5);
  const [timerProgress, setTimerProgress] = useState(0);

// initialPlay is first time you start a session
// activeSession is the same session but at a different state
  
// DECREASE DURATION
const decreaseFocusDurationByFiveMinutes = () => {  
  if (focusDurationMins > 5 && !isTimerRunning && initialPlay) {
    setFocusDurationMins(focusDurationMins - 5);
  };
};

// INCREASE DURATION
const increaseFocusDurationByFiveMinutes = () => {
  if (focusDurationMins < 60 && !isTimerRunning && initialPlay) {
    setFocusDurationMins(focusDurationMins + 5);
  }
};


// DECREASE BREAK
// REFACTOR WITH Math.Min() and Math.Max() after functional
const decreaseBreakDurationByOneMinute = () => {

    if (breakDurationMins > 1 && !isTimerRunning && initialPlay) {
      setBreakDurationMins(breakDurationMins - 1);
  };  
};

  // INCREASE BREAK
  const increaseBreakDurationByOneMinute = () => {
    if (breakDurationMins < 15 && !isTimerRunning && initialPlay) {
      setBreakDurationMins(breakDurationMins + 1);
    };
  };

  // PAY ATTENTION TO PARAMETER NAMES
  // CALLED IN RETURN STATEMENT
  function percentage(currentMinutes, currentSeconds, initialMinutes) {
    return (
      100 - ((currentMinutes * 60 + currentSeconds) / (initialMinutes * 60)) * 100
    );
  };


  function timerExpired() {
    if (!onBreak) {
      new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-27787/zapsplat_bell_medium_large_soft_hit_chime_001_29436.mp3?_=1').play();
      setOnBreak(true);
      setTimerProgress(0);
      setDurationSecs(0); // Rework state names?
      setDurationMins(initialBreakDuration);
    } else {
      new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-two/household_alarm_clock_beep_tone.mp3?_=1').play();
      setOnBreak(false);
      setTimerProgress(0);
      setDurationSecs(0);
      setDurationMins(initialDuration);
    }
  }

  // STOP BUTTON
  const stopSessionButton = () => {
    setInitialPlay(true);
    setIsTimerRunning(false);
    setOnBreak(false);
    setActiveSession(false);

    setTimerProgress(0);
    setDurationSecs(0);
    setDurationMins(focusDurationMins);
    setInitialDuration(focusDurationMins);
    setInitialBreakDuration(breakDurationMins);
  }

  // PLAY/PAUSE FUNCTION
  function playPause() {
    if (initialPlay) {
      setInitialDuration(focusDurationMins) //focusDurationMins
      setInitialBreakDuration(breakDurationMins) // breakDurationMins
      setDurationMins(focusDurationMins) // focusDurationMins
      setInitialPlay(false);
    }
    setActiveSession(true);
    setIsTimerRunning((prevState) => !prevState);
  };

  useInterval(
    () => {
      //While timer runs
      setDurationSecs((second) => {
        second === 0 ? (second = 59) : (second -= 1); //seconds count down, cycles over minute
        if (second === 59)
          setDurationMins((minutes) => (minutes = durationMins - 1));
        return second;
      });
      if (onBreak) {
        setTimerProgress(
          (currentProgress) =>
            (currentProgress = percentage(
              durationMins,
              durationSecs,
              initialBreakDuration
            ))
        );
      } else {
        setTimerProgress(
          (currentProgress) =>
            (currentProgress = percentage(
              durationMins,
              durationSecs,
              initialDuration
            ))
        );
      }
      if (durationMins === 0 && durationSecs === 1) {
        timerExpired();
      }
    },

    isTimerRunning ? 1000 : null
  );



  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              <Focus focusDurationMins={focusDurationMins} />

            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocusDurationByFiveMinutes}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocusDurationByFiveMinutes}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">

                {/* TODO: Update this text to display the current break session duration */}
                <Break breakDurationMins={breakDurationMins}/>
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreakDurationByOneMinute}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreakDurationByOneMinute}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopSessionButton}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div style={activeSession ? {display: "block"} : { display: "none"}}>
          <div className="row mb-2">
            <div className="col">
              {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            
              
              <h2 data-testid="session-title">
                {!onBreak ? "Focusing" : "On Break"} for{" "}
                {!onBreak 
                  ? minutesToDuration(initialDuration) 
                  : minutesToDuration(initialBreakDuration)}{" "} minutes
              </h2>
            
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(durationMins * 60 + durationSecs)} remaining
            </p>
            {!isTimerRunning ? <h2>PAUSED</h2> : null}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={timerProgress} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${timerProgress}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Pomodoro;
