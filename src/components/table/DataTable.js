import React,{useState} from 'react'
import {Table } from 'react-bootstrap';
import {
  Button
} from '@mui/material';

import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './DataTable.css'
import SubCustomerTable from './SubCustomerTable';
import SubCustomerCard from '../inputs/SubCustomerCard'

const DataTable = ({ customers, handleDeleteCustomer, handleEditClick }) => {
  const [opensubcustomer, setOpensubcustomer] = useState(false);

  const toggleSubcustomer = () =>{
    setOpensubcustomer(!opensubcustomer);
  }
 //   const[status,setStatus] = useState("Active");
//   const setStatusvalue = (e)=>{
//     setStatus(e.value)
//  }
 //status
//  const options = [
//   { value: "Active", label: "Active" },
//   { value: "InActive", label: "InActive" },
// ];

 
  return (
    <div className='table_content'>
  <Table  striped bordered hover >
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Time</th>
        <th>AddClients</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer._id}>
          <td>{customer._id}</td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>{customer.address}</td>
          <td>{customer.time}</td>
          <td>
          <Button
          variant="outlined"
          color="primary"
          onClick={toggleSubcustomer}
        >
        {customer.addSubCustomers}
        </Button></td>
          <td>{customer.status}</td>
          {/*<td><Select options={options} onChange={setStatusvalue} style={{ background: 'none', width: '100%' }} /></td>*/}
          <td>
            <EditOutlinedIcon onClick={() => handleEditClick(customer)} />
            <DeleteIcon
              color="action"
              style={{ fontSize: 25, color: '#E68364' }}
              onClick={() => handleDeleteCustomer(customer._id)}
            />
          </td>
        
        </tr>
      ))}
    </tbody>
  </Table>
  { opensubcustomer ? null : <SubCustomerCard
    customers = {customers}
     handleDeleteCustomer = {handleDeleteCustomer}
     handleEditClick = {handleEditClick}
    />}
    </div>
  )
}

export default DataTable