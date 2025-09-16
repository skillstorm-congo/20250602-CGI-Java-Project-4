import { createContext } from "react";
import type { timeOffType } from "../types/types";

// if you put a default value in the parentheses, it'll type the context to that type
// if you leave it blank and leave the createContext method untyped, it'll be able to hold anything!
// like this -- export const FavoriteContext = createContext();
// here, we're typing the function AND giving it a default value
// BE AWARE -- by typing it this way, 
// we'll have to come back to this file if we add things to the context in Frame.tsx
//export const SubmissionContext = createContext('default value')

//context for updating a time off record from time off view page
interface TimeOffTypeContext {
    updateTimeOff: timeOffType | undefined,
    setUpdateTimeOff: React.Dispatch<React.SetStateAction<timeOffType | undefined>>
}

export const UpdateTimeOffContext = createContext<TimeOffTypeContext | undefined>(undefined);

