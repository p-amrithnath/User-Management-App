import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import employeeReducer from './features/employeesSlice'
import profileReducer from './features/profileSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    employees: employeeReducer,
    profile : profileReducer,
  },
})

