import React from "react";
import { minutesToDuration } from "../utils/duration";

export default function Focus({focusDurationMins}) {

    // What props are needed here? Access to what components?
    // Need to lift up state to Pomodoro (parent comp)
    // Use Math.min() and Math.max() rather than if statements for duration limits
    



    return (
        <>
            Focus Duration: {minutesToDuration(focusDurationMins)}
        </>
    )
}