import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../table/DataTable'
import Addcustomer from '../inputs/Addcustomer';
import ActiveStatusChart from '../charts/ActiveStatusChart';
import ChartOne from '../charts/ChartOne';
import ChartSecond from '../charts/ChartSecond';
import './Dashboard.css'


  
export default function DashBoard() {

const [customers, setCustomers] = useState([]);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [status, setStatus] = useState('');
const [editingCustomerId, setEditingCustomerId] = useState(null);

const [open, setOpen] = useState(false);

const toggleOpen = () =>{
  setOpen(!open);
}
useEffect(() => {
  fetchCustomers();
}, []);

const fetchCustomers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/customers');
    setCustomers(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

};
const handleEditCustomer = async () => {
    try {
      const updatedCustomer = { name, email, phone, address,status };
      const response = await axios.put(`http://localhost:5000/api/v1/customer/${editingCustomerId}`, updatedCustomer);
      setCustomers(customers.map((customer) => {
        if (customer._id === editingCustomerId) {
          return response.data;
        }
        return customer;
      }));
      clearForm();
      setEditingCustomerId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomerId(customer._id);
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setAddress(customer.address);
    setStatus(customer.status)
    setOpen(!open);
  };

  const handleCancelEdit = () => {
    clearForm();
    setEditingCustomerId(null);
  };

   const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setStatus('');
  };


 const handleAddCustomer = async () => {
  try {
    const newCustomer = { name, email, phone, address,status };
    const response = await axios.post('http://localhost:5000/api/v1/customer', newCustomer);
    setCustomers([...customers, response.data]);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setStatus('');
  } catch (error) {
    console.error(error);
  }
};

 const handleDeleteCustomer = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/customer/${id}`);
    setCustomers(customers.filter((customer) => customer._id !== id));
  } catch (error) {
    console.error(error);
  }
};

  return (
    
   <div>
   <button data-label="ADD" className="rainbow-hover" onClick={toggleOpen}>
  <span className="sp">ADD</span>
</button>

   <div className='charts_sec'>
   <ActiveStatusChart  status={status} setStatus={setStatus} customers={customers}/>
   <ChartOne/>
   <ChartSecond/>
   </div>
   
   <DataTable
   customers = {customers}
   handleDeleteCustomer = {handleDeleteCustomer} 
   handleEditClick = {handleEditClick}
   
   />
   {open ? <Addcustomer
    handleAddCustomer = {handleAddCustomer}
    handleEditCustomer = {handleEditCustomer}
        handleCancelEdit = {handleCancelEdit}
        editingCustomerId = {editingCustomerId}
        name ={name}
         setName ={setName} 
         email ={email}
        setEmail = {setEmail}
         phone ={phone}
        setPhone = {setPhone}
        address = {address}
         setAddress = {setAddress}
         status={status}
         setStatus={setStatus}
    /> : null}
   </div>
);
};