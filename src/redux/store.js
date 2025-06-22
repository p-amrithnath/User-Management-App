import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import employeeReducer from './features/employeesSlice'
import profileReducer from './features/profileSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { employeeApi } from '../services/employee'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    employees: employeeReducer,
    profile : profileReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

setupListeners(store.dispatch)
export default store;


