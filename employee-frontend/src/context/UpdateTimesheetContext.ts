import { createContext } from "react";
import type { UpdateHoursType } from "../types/types";

//context for updating a record from timesheet viewable page
interface UpdateHoursTypeContext {
    updateHours: UpdateHoursType | undefined,
    setUpdateHours: React.Dispatch<React.SetStateAction<UpdateHoursType | undefined>>
}

export const UpdateHoursTypeContext = createContext<UpdateHoursTypeContext | undefined>(undefined);