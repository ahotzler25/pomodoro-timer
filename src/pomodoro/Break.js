import React from "react";
import { minutesToDuration } from "../utils/duration";

export default function Break({breakDurationMins}) {


    
    return (
        <>
            Break Duration: {minutesToDuration(breakDurationMins)}
        </>
    )
}