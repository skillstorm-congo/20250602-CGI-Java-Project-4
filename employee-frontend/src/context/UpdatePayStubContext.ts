import { createContext } from "react";
import type { payStubType } from "../types/types";

// if you put a default value in the parentheses, it'll type the context to that type
// if you leave it blank and leave the createContext method untyped, it'll be able to hold anything!
// like this -- export const FavoriteContext = createContext();
// here, we're typing the function AND giving it a default value
// BE AWARE -- by typing it this way, 
// we'll have to come back to this file if we add things to the context in Frame.tsx
//export const SubmissionContext = createContext('default value')

//context for updating a time off record from time off view page
interface PayStubTypeContext {
    updatePayStub: payStubType | undefined,
    setUpdatePayStub: React.Dispatch<React.SetStateAction<payStubType | undefined>>
}

export const UpdatePayStubContext = createContext<PayStubTypeContext | undefined>(undefined)


