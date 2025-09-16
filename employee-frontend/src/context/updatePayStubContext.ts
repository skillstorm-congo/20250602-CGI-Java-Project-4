import { createContext } from "react";

// if you put a default value in the parentheses, it'll type the context to that type
// if you leave it blank and leave the createContext method untyped, it'll be able to hold anything!
// like this -- export const FavoriteContext = createContext();
// here, we're typing the function AND giving it a default value
// BE AWARE -- by typing it this way, 
// we'll have to come back to this file if we add things to the context in Frame.tsx
//export const SubmissionContext = createContext('default value')

//createContext<[string, (favorite: string) => void]>(['', () => {}]);

//context for updating a time off record from time off view page
export const updatePayStubContext = createContext('default value')
