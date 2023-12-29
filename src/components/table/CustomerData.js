import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Box, useTheme ,useMediaQuery} from "@mui/material";
import Header from "../header/Header";
import FlexBetween from '../navbar/FlexBetween';
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button } from "@mui/material";
import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DataGridCustomToolbar from '../../toolbar/DataGridCustomToolbar';
import Addcustomer from '../inputs/Addcustomer';

const CustomerData = () => {

const theme = useTheme();
const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
const [search ,setSearch] = useState("");
const [filterValue, setFilterValue] = useState("");
const [customers, setCustomers] = useState([]);
const [openForm,setOpenForm] = useState();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [status, setStatus] = useState('');
const [gender, setGender] = useState('');
const [createdAt, setCreatedAt] = useState('');
const [organization,setOrganization] = useState('');
const [editingCustomerId, setEditingCustomerId] = useState(null);
const [error, setError] = useState('');
// const [currentPage, setCurrentPage] = useState(1);


  const filteredRows = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(search.toLowerCase());
  });
  useEffect(() => {
    fetchCustomers();
  }, []);
  
  const toggleOpenForm = () =>{
    setOpenForm(!openForm);
  }
  
  const fetchCustomers = async (page) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/customers'
      // ,{
      //   params: {page}}
        );
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const handleEditCustomer = async () => {
      try {
        const updatedCustomer = { name, 
          email, 
          phone,
           address,
           status,
           createdAt,organization,gender};
           await axios.put(`http://localhost:5000/api/v1/customers/${editingCustomerId}`,updatedCustomer);
        fetchCustomers();
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
      setStatus(customer.status);
      setOrganization(customer.organization);
      setCreatedAt(customer.createdAt);
      setGender(customer.gender);
      toggleOpenForm();
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
      setOrganization('');
      setCreatedAt('')
      setGender('');
    };
  
  
  

    const handleAddCustomer = async () => {
      try {
        if (!name.trim()) {
          throw new Error('Name is required');
        }
        if (!email.trim()) {
          throw new Error('Email is required');
        }
        if (!phone.trim()) {
          throw new Error('Phone is required');
        }
    
        const newCustomer = {
          name,
          email,
          phone,
          address,
          status,
          createdAt,
          organization,
          gender,
        };
    
        const response = await axios.post(
          'http://localhost:5000/api/v1/customers',
          newCustomer
        );
    
        setCustomers([...customers, response.data]);
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setStatus('');
        setOrganization('');
        setCreatedAt('');
        setGender('');
        clearForm();
        setOpenForm(false);
        setError(''); // Clear any previous errors
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    
  
   const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/customers/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  
  const columns = [
    {
      field: "SNo",
      headerName: "S.NO",
      flex: 0.3,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => params.value,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 0.8,
      renderCell: (params) => params.value,
    },
    {
      field: "Phone",
      headerName: "Phone",
      flex: 0.5,
      renderCell: (params) => params.value,
    },
    {
      field: "Gender",
      headerName: "Gender",
      flex: 0.5,
      renderCell: (params) => params.value,
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 0.5,
      renderCell: (params) => params.value,
    },
    {
      field: "CreatedAt",
      headerName: "CreatedAt",
      flex: 0.5,
      //renderCell: (params) => params.value,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => params.value,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          color="secondary"
        >
        <EditOutlinedIcon onClick={() => {
          handleEditClick(params.row);
        }
        } />
        <DeleteIcon
        color="action"
        style={{ fontSize: 25, color: '#E68364' }}
        onClick={() => handleDeleteCustomer(params.row._id)}
      />
        </IconButton>
      ),
    }
  ];

  return (
    <>
    <Box m="1.5rem 2.5rem"
    >
    <FlexBetween>
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box>
      <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={toggleOpenForm}
      >
        ADD
      </Button>
    </Box>
    </FlexBetween>
   
    <Box
    mt="20px"
    display="grid"
    gridTemplateColumns="repeat(12, 1fr)"
    gridAutoRows="160px"
    gap="20px"
    sx={{
      "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
    }}
  >
      <Box
      gridColumn="span 13"
      gridRow="span 3"
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
      
      <DataGrid
  getRowId={(row) => row._id}
  rows={filteredRows.map((customer, index) => ({
    SNo: index + 1,
    _id: customer._id,
    Name: customer.name,
    Email: customer.email,
    Phone: customer.phone,
    Gender: customer.gender,
    Address: customer.address,
    CreatedAt: customer.created_at,
    Status: customer.status,
    Actions: customer.actions,
  }))}
  columns={columns}
  components={{ Toolbar: DataGridCustomToolbar }}
  componentsProps={{
    toolbar: { filterValue, setFilterValue,setSearch },
  }}
/>
      </Box>
      </Box>
    </Box>
    {openForm ? <Addcustomer
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
      createdAt={createdAt}
      setCreatedAt={setCreatedAt}
      gender={gender}
      setGender={setGender}
      organization={organization}
      setOrganization={setOrganization}
      setOpenForm={setOpenForm}
      error={error}
      
      /> : null }
      </>
  );
};

export default CustomerData;