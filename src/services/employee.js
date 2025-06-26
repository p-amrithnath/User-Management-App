import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = () => localStorage.getItem('jwtToken');

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8082',
    prepareHeaders: (headers, { endpoint }) => {
      const token = getToken();
      if (token && endpoint !== 'login') {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Employee'], 
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => '/users/all',
      providesTags: ['Employee'], 
    }),
    getEmployeeById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: '/users/add',
        method: 'POST',
        body: newEmployee,
      }),
      invalidatesTags: ['Employee'], 
    }),
    updateEmployee: builder.mutation({
      query: ({ id, updatedEmployee }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: updatedEmployee,
      }),
      invalidatesTags: ['Employee'], 
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'], 
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/authenticate',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useLoginMutation,
} = employeeApi;
