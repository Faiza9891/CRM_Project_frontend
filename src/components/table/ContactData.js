import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box, useTheme,useMediaQuery} from "@mui/material";
import FlexBetween from '../navbar/FlexBetween';
import { IconButton, Button } from "@mui/material";
import Header from "../header/Header";
import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ContactForm from '../inputs/ContactForm';
import axios from 'axios';
import ContactToolbar from '../../toolbar/ContactToolbar';


const ContactData = ({customers}) => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const [search ,setSearch] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [toggleContactCard,setToggleContactCard] = useState();
    const [contacts, setContacts] = useState([]);
    const [editingContactId, setEditingContactId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department,setDepartment] = useState('');
    const [jobTitle,setJobTitle] = useState('');
    const [notes,setNotes] = useState('');
    const [error,setError] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);
    const [customer, setCustomer] = useState('');
   
    useEffect(() => {
      fetchContacts();
    }, []);


  const handleToggle = () =>{
    setToggleContactCard(!toggleContactCard);
  }
  const filteredRows = contacts.filter((activity) => {
    return activity.name.toLowerCase().includes(search.toLowerCase());
  });
      
  const fetchContacts = async (page) => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/contacts'
          // ,{
            // params: { page}}
          );
          setContacts(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  

      const handleEditClick = (contact) => {
        setEditingContactId(contact._id);
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
        setDepartment(contact.department);
        setCustomer(contact.customerName);
        setJobTitle(contact.jobTitle);
        setNotes(contact.notes);
        handleToggle();
      };

      
      const deleteContact = async (contactId) => {
        try {
          await axios.delete(`http://localhost:5000/api/v1/contacts/${contactId}`);
         fetchContacts();
        } catch (error) {
          console.error(error);
        }
      };
      
      //deleteContact();
      const handleEditContact = async () => {
        try {
          const updatedContact = {name,email,phone,customer,department,jobTitle,notes};
          const response = await axios.put(`http://localhost:5000/api/v1/contacts/${editingContactId}`, updatedContact);
          setContacts(contacts.map((contact) => {
            if (contact._id === editingContactId) {
              return response.data;
            }
            return contact;
          }));
          clearForm();
          setEditingContactId(null);
        } catch (error) {
          console.error(error);
        }
      };
    

      const handleAddClick = async () => {
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
          if (!customer.trim()) {
            throw new Error('Customer is required');
          }
          const newContact = {name,email,phone,notes,
            customer: customer ? [{ _id: customer }] : [],
            department,jobTitle}
          const response = await axios.post('http://localhost:5000/api/v1/contacts', newContact,
          
          );
          setContacts([...contacts,response.data]);
          fetchContacts();
          setName('');
          setEmail('');
          setPhone('');
          setDepartment('');
          setJobTitle('');
          setCustomer('');
          setNotes('');
          clearForm();
        } catch (error) {
          console.error(error);
          setError(error.message)
        }
      };
      const handleCancelEdit = () => {
        clearForm();
        setEditingContactId(null);
      };
    
       const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setDepartment('');
        setJobTitle('');
        setCustomer('');
        setNotes('');
      };
      // console.log(contacts)
      
      
 const  columns=[
        { field: 'SNo', headerName: 'S.No', width: 150 },
        { field: 'customerName', headerName: 'Customer Name', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'jobTitle', headerName: 'Job Title', width: 200 },
        { field: 'department', headerName: 'Department', width: 200 },
        { field: 'notes', headerName: 'Notes', width: 300 },
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
            onClick={() => deleteContact(params.row._id)}
          />
            </IconButton>
          ),
        }
 ]
  
    return (

      <>
        <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="CONTACTS" />
          <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleToggle}
            
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
            // height="75vh"
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
          rows={filteredRows.map((contact, index) => ({
            _id: contact._id,
            SNo: index + 1,
            customerName:contact.customer[0].name,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            jobTitle: contact.jobTitle,
            department: contact.department,
            notes: contact.notes
          }))}
          columns={columns}
          components={{ Toolbar: ContactToolbar }}
          componentsProps={{
            toolbar: { filterValue, setFilterValue,setSearch },
          }}
        />
          </Box>
          </Box>
        </Box>
        {toggleContactCard ? <ContactForm
          customers={customers}
          handleAddClick={handleAddClick}
          name ={name}
          setName ={setName} 
          email ={email}
         setEmail = {setEmail}
          phone ={phone}
         setPhone = {setPhone}
         department={department}
         setDepartment={setDepartment}
         customer={customer}
         setCustomer={setCustomer}
         notes={notes}
         setNotes={setNotes}
         jobTitle={jobTitle}
         setJobTitle={setJobTitle}
          editingContactId={editingContactId}
          handleCancelEdit={handleCancelEdit}
          setToggleContactCard={setToggleContactCard}
          handleEditContact={handleEditContact}
          contacts={contacts}
          error={error}
          /> : null }
       </>
      );
    };
    

export default ContactData