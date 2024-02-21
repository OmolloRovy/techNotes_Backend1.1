
import React from 'react'
import Customer from './Customer'
import { useGetCustomersQuery } from './customersApiSlice'
 
const CustomerList = () => {
  const {
    data: customers,
    isLoading,
    isSuccsess,
    isError,
    error
  }=useGetCustomersQuery()

  const CustomerList = () => { 
    const { data, isLoading, isSuccess, isError } = useGetCustomersQuery();
  
    let content;
  
    if (isLoading) {
      content = <p>Loading...</p>;
    }
  
    if (isError) {
      content = <p className="errmsg">Error fetching customers list.</p>;
    }
    if (isSuccess) {
      const { ids } = customers;
  
      const tableContent = ids?.length
      ? ids.map(customerId => <Customer key={customerId} userId={customerId} />)
      : null

  content = (
      <table className="table table--users">
          <thead className="table__thead">
              <tr>
                  <th scope="col" className="table__th user__username">Username</th>
                  <th scope="col" className="table__th user__username"> Name</th>
                  <th scope="col" className="table__th user__username">Email</th>
                  <th scope="col" className="table__th user__username">Address</th>
                  <th scope="col" className="table__th user__username">Phone Number</th>
                  <th scope="col" className="table__th user__username">Device Details</th>
                  <th scope="col" className="table__th user__edit">Edit</th>
              </tr>
          </thead>
          <tbody>
              {tableContent}
          </tbody>
      </table>
  )
    }
  
    return content;
  };
 
}

export default CustomerList
