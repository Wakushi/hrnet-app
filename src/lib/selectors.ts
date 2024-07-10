import { RootState } from "../store"
import { Employee } from "./types"

export const getEmployeeList = (state: RootState): Employee[] =>
  state.employee.list
