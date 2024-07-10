import { createSlice } from "@reduxjs/toolkit"
import { Employee } from "../../lib/types"
import { v4 as uuidv4 } from "uuid"

type EmployeeState = {
  list: Employee[]
}

const employeeState: EmployeeState = {
  list: [],
}

const employeeSlice = createSlice({
  name: "employee",
  initialState: employeeState,
  reducers: {
    addEmployee: (state, action) => {
      state.list.push({ ...action.payload, id: uuidv4() })
    },
  },
})

export const { addEmployee } = employeeSlice.actions
export default employeeSlice.reducer
