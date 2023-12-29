import React,{useState} from 'react'
import {
    TextField,
    Button,
    MenuItem,
    Box,
    useTheme
  } from '@mui/material';
import Header from '../header/Header'
import FlexBetween from '../navbar/FlexBetween';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ContactForm = ({ error,handleAddClick,customers,handleEditContact,setToggleContactCard, name, setName, email, setEmail ,phone ,setPhone ,department ,setDepartment ,customer,setCustomer,notes ,setNotes ,jobTitle ,setJobTitle ,editingContactId ,handleCancelEdit}) => {
    const theme = useTheme();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const handleNameChange = (e) => {
      const value = e.target.value;
      setName(value);
  
      if (!value.trim()) {
        setNameError('Name is required');
      } else {
        setNameError('');
      }
    };
  
    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
  
      if (!value.trim()) {
        setEmailError('Email is required');
      } else if (!isValidEmail(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    };
  
    const handlePhoneChange = (e) => {
      const value = e.target.value;
      setPhone(value);
  
      if (!value.trim()) {
        setPhoneError('Phone is required');
      } else if (!isValidPhone(value)) {
        setPhoneError('Invalid phone format');
      } else {
        setPhoneError('');
      }
    };
  
    const isValidEmail = (email) => {
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const isValidPhone = (phone) => {
      // Basic phone format validation
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    };
   
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,backgroundColor: theme.palette.background.alt,padding:"2rem"}}>
    <ArrowBackIosIcon
 onClick={ () => setToggleContactCard(false)}
style={{marginBottom:"2rem"}}
 />
 {editingContactId ? <Header title="Edit Contact"/> :  <Header title="Add Contact" />}
    <form 
    onSubmit={editingContactId ? handleEditContact : handleAddClick}>

      <TextField
      id="filled-basic"
      style={{margin: "1rem"}}
    //   fullWidth
        label="Name"
        variant="filled"
        margin="normal"
        value={name}
        onChange={handleNameChange}
        error={!!nameError}
        helperText={nameError}
        // onChange={(e) => setName(e.target.value)}
      />
      <TextField
      style={{margin: "1rem" }}
        label="Email"
        variant="filled"
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        error={!!emailError}
        helperText={emailError}
        // onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
      style={{margin: "1rem"}}
        label="Phone"
        variant="filled"
        margin="normal"
        value={phone}
        onChange={handlePhoneChange}
        error={!!emailError}
        helperText={phoneError}
        // onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
      style={{margin: "1rem"}}
        label="JobTitle"
        variant="filled"
        margin="normal"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <TextField
      style={{ margin: '1rem'}}
      label="Department"
      variant="filled"
      margin="normal"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      />
      <TextField
      style={{ margin: '1rem', width: '15vw' }}
      select
      label="Select Customers"
      variant="filled"
      margin="normal"
      value={customer}
      onChange={(e) => {
        console.log('Selected value:', e.target.value);
        setCustomer(e.target.value)}}
    >
    <MenuItem value="">Select a customer</MenuItem>
    {customers
      .filter((customer, index, self) => self.findIndex(c => c.name === customer.name) === index)
      .map((customer) => (
        <MenuItem key={customer._id} value={customer._id}>
          {customer.name}
        </MenuItem>
      ))}
    </TextField>
      <TextField
      style={{ margin: '1rem',width:"40vw"}}
      fullWidth
      label="Notes"
      multiline
      rows={4}
      // label="Select Option"
      variant="filled"
      margin="normal"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      />
      <FlexBetween
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      >
      {error && <div style={{color:"red"}}>Error: {error}</div>}
    <Box>
    
      <Button
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.background.alt,
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
      }}
        type="submit"
        variant="contained"
      >
        {editingContactId ? "Update" : "Submit"}
      </Button>
      {!editingContactId && (
        <Button
        sx={{
          backgroundColor: "red",
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          margin: "10px",
          padding: "10px 20px",
        }}
          color="error"
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>
       
      )} 
      {editingContactId && (
        <Button
        sx={{
          backgroundColor: "red",
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          margin: "10px",
          padding: "10px 20px",
        }}
          color="error"
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>
       
      )} 
      </Box>
  
      </FlexBetween>
    </form>
    
    
    
    </div>
  )
}

export default ContactForm