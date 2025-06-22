import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://gorest.co.in/public/v2/" }),
  endpoints: (builder) => ({
    getEmployeeById: builder.query({
      query: (id) => `users/${id}`,
    }),

    getAllEmployees: builder.query({
      query: () => "users",
    }),
  }),
});

export const { useGetEmployeeByIdQuery, useGetAllEmployeesQuery } = employeeApi;
