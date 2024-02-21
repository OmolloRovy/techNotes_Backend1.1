
import { useNavigate } from 'react';
import { useSelector } from 'react-redux';
import { selectCustomerById } from './customersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import React from 'react'

const Customer = ({customerId}) => {
    const customer = useSelector((state) => selectCustomerById(state, customerId));
    const navigate = useNavigate()
    if (customer){
        const handleEdit = () => navigate(`/dash/customers/${customerId}`)
        const cellStatus = customer.active ? '' : 'table__cell--inactive'
        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{customer.name}</td>
                <td className={`table__cell ${cellStatus}`}>{customer.email}</td>
                <td className={`table__cell ${cellStatus}`}>{customer.address}</td>
                <td className={`table__cell ${cellStatus}`}>{customer.phone_number}</td>
                <td className={`table__cell ${cellStatus}`}>{customer.device_details}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    }else return null
}

export default Customer
// const Customer = () => {
//   const { customerId } = useParams();
//   const customer = useSelector((state) => selectCustomerById(state, customerId));
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (customer) {
//       setIsLoading(false);
//       return;
//     }

//     const fetchCustomer = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`/api/customers/${customerId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch customer');
//         }
//         const data = await response.json();
//         // You can call a redux action to update the customer state here
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCustomer();
//   }, [customer, customerId]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!customer) {
//     return <div>Customer not found</div>;
//   }

//   const created = new Date(customer.createdAt).toLocaleString('en-US', {
//     day: 'numeric',
//     month: 'long',
//   });

//   const updated = new Date(customer.updatedAt).toLocaleString('en-US', {
//     day: 'numeric',
//     month: 'long',
//   });

//   return (
//     <tr className="table__row">
//       <td className="table__cell customer__status">
//         {customer.status ? (
//           <span className="customer__status--active">Active</span>
//         ) : (
//           <span className="customer__status--inactive">Inactive</span>
//         )}
//       </td>
//       <td className="table__cell customer__created">{created}</td>
//       <td className="table__cell customer__updated">{updated}</td>
//       <td className="table__cell customer__name">{`${customer.firstName} ${customer.lastName}`}</td>
//       <td className="table__cell customer__email">{customer.email}</td>
//       <td className="table__cell">
//         <button className="icon-button table__button">
//           <FontAwesomeIcon icon={faPenToSquare} />
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default Customer;