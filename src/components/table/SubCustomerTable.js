import React from 'react'
import {Table } from 'react-bootstrap';
// import {
//   Button
// } from '@mui/material';

import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon } from '@mui/icons-material';

const SubCustomerTable = ({customers, handleDeleteCustomer, handleEditClick }) => {
  return (
    <div>
    <Table  striped bordered hover >
    <thead>
      <tr>
      Customer of {customers.name}
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Time</th>
        <th>AddSubcustomers</th>
        <th>Status</th>
        <th>Actions</th>
        <th>Day</th>
      </tr>
    </thead>
    <tbody>
      {customers.SubCustomers.map((subcustomer) => (
        <tr>
          <td>{subcustomer.name}</td>
          <td>{subcustomer.email}</td>
          <td>{subcustomer.phone}</td>
          <td>{subcustomer.address}</td>
          <td>{subcustomer.time}</td>
          <td>{subcustomer.status}</td>
          {/*<td><Select options={options} onChange={setStatusvalue} style={{ background: 'none', width: '100%' }} /></td>*/}
          <td>
            <EditOutlinedIcon onClick={() => handleEditClick(subcustomer)} />
            <DeleteIcon
              color="action"
              style={{ fontSize: 25, color: '#E68364' }}
              onClick={() => handleDeleteCustomer(subcustomer._id)}
            />
          </td>
        
        </tr>
      ))}
    </tbody>
  </Table>
    
    </div>
  )
}

export default SubCustomerTable