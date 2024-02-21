import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { createSelector } from '@reduxjs/toolkit';

const customersAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1,
});

const initialState = customersAdapter.getInitialState();

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "/customer",
      validateStatus:(response,result)=>{
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor:5,
      transformResponse: (responseData) => {
        const loadedCustomers = responseData.map((customer) => {
          customer.id = customer._id;
          return customer;
        });
        return customersAdapter.setAll(initialState, loadedCustomers);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Customer", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Customer", id })),
            ]
          : [{ type: "Customer", id: "LIST" }],
    }),
    addNewCustomer: builder.mutation({
      query: (initialCustomer) => ({
        url: "/customer",
        method: "POST",
        body: initialCustomer,
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
    updateCustomer: builder.mutation({
      query: (initialCustomer) => ({
        url: "/customer",
        method: "PATCH",
        body: initialCustomer,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Customer", id: arg.id }],
    }),
    deleteCustomer: builder.mutation({
      query: ({ id }) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Customer", id: arg.id }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddNewCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
 
} = customersApiSlice;

// State selector
export const selectCustomersResult = customersApiSlice.endpoints.getCustomers.select();

// Normalized data selector (if using RTK Query)
const selectCustomersData = createSelector(
  selectCustomersResult,
  customerResult => customerResult.data


);

export const {
  selectById: selectCustomerById,
  selectAll: selectAllCustomers,
 selectIds: selectCustomerId
}= customersAdapter.getSelectors(state => selectCustomersData(state)?? initialState)
