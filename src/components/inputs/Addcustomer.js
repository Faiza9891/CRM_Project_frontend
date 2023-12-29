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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const Addcustomer = ({ error,handleAddCustomer, handleEditCustomer, handleCancelEdit, editingCustomerId, name, setName, email, setEmail, phone, setPhone, address, setAddress,status,setStatus,createdAt,setCreatedAt,gender,setGender,setOpenForm}) => {
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const theme = useTheme();
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Perform form submission logic
  //   if (
  //     name.trim() &&
  //     isValidEmail(email) &&
  //     phone.trim() &&
  //     isValidPhone(phone)
  //   ) {
  //     // Valid form submission
  //     if (editingCustomerId) {
  //       handleEditCustomer();
  //     } else {
  //       handleAddCustomer();
  //     }
  //   } else {
  //     // Invalid form submission
  //     console.log('Form submission failed');
  //   }
  // };

  return (
    <>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,backgroundColor: theme.palette.background.alt,padding:"2rem"}}>
 <ArrowBackIosIcon
 onClick = {() => setOpenForm(false)}
style={{marginBottom:"2rem"}}
 />
 {editingCustomerId ? <Header title="Edit Customer"/> :  <Header title="Add Customer" />}
    <form 
    onSubmit={editingCustomerId ? handleEditCustomer : handleAddCustomer}>
<Box  display="flex"  flexDirection="row" alignItems="center">
      <TextField
      id="filled-basic"
      style={{margin: "1rem",display:"block"}}
      fullWidth
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
      fullWidth
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
      style={{margin: "1rem" ,display:"block"}}
      fullWidth
        label="Phone"
        variant="filled"
        margin="normal"
        value={phone}
        onChange={handlePhoneChange}
        error={!!emailError}
        helperText={phoneError}
        // onChange={(e) => setPhone(e.target.value)}
      />
      </Box>
      <Box  display="flex"  flexDirection="row" alignItems="center">
      <TextField
      style={{margin: "1rem",display:"block"}}
      fullWidth
        label="Address"
        variant="filled"
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
      style={{ margin: '1rem', display: 'block' }}
      fullWidth
      select
      label="Select Status"
      variant="filled"
      margin="normal"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      </TextField>
      </Box>
      <div style={{ display: 'flex' }}>
      <FormControl style={{ margin: '1rem' }}>
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={gender}
          onChange={handleGenderChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Date Of Registration"
            inputStyle={{ outline: 'white', boxShadow: 'none' }}
            PopperProps={{ style: { outline: 'white', boxShadow: 'none' } }}
            value={createdAt}
            onChange={(e) => setCreatedAt(e)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
    <FlexBetween
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }}
    >
    <Box 
    >
    {error && <div style={{color:"red"}}>Error: {error}</div>}
      <Button
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.background.alt,
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        margin:"1rem",
      }}
        type="submit"
        variant="contained"
      >
        {editingCustomerId ? "Update" : "Submit"}
        
      </Button>
      {!editingCustomerId && (
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
      {editingCustomerId && (
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
    </>
  )
}

export default Addcustomer