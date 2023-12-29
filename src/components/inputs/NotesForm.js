import React from 'react'
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


const NotesForm = ({ handleAddNotes,
    customers,
    handleCancelEdit,
    handleEditNotes,
    editingNotesId,
    customer,
    contact,
    text,
    date,
    setCustomer,
    setContact,
    setText,
    contacts,
    setDate,
    setOpenCard,
}) => {
    const theme = useTheme();
  return (
    
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,backgroundColor: theme.palette.background.alt,padding:"2rem"}}>
      <ArrowBackIosIcon
   onClick={ () => setOpenCard(false)}
  style={{marginBottom:"2rem"}}
   />
   {editingNotesId ? <Header title="Edit Note"/> :  <Header title="Add Note" />}
      <form 
      onSubmit={editingNotesId ? handleEditNotes : handleAddNotes}>
      <Box display="flex"  flexDirection="row" alignItems="center">
      <TextField
      style={{ margin: '1rem' ,width:"10vw"}}
      select
      label="Select Contacts"
      variant="filled"
      margin="normal"
      value={contact}
      onChange={(e) => setContact(e.target.value)}
    >
    <MenuItem value="">Select a contacts</MenuItem>
            {contacts
              .filter((contact, index, self) => self.findIndex(c => c.name === contact.name) === index)
              .map((contact) => (
                <MenuItem key={contact._id} value={contact._id}>
                  {contact.name}
                </MenuItem>
              ))}
    </TextField>
    <TextField
    style={{ margin: '1rem' ,width:"10vw"}}
    select
    label="Select Customers"
    variant="filled"
    margin="normal"
    value={customer}
    onChange={(e) => setCustomer(e.target.value)}
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
  <LocalizationProvider dateAdapter={AdapterDayjs}
        
  >
  <DemoContainer components={['DatePicker']}>
    <DatePicker
      label="Date"
      inputStyle={{ outline: 'white', boxShadow: 'none' }}
      PopperProps={{ style: { outline: 'white', boxShadow: 'none' } }}
      value={date}
      onChange={(e) => setDate(e)}
    />
  </DemoContainer>
</LocalizationProvider>
</Box>
      <TextField
      style={{margin: "1rem" }}
        label="Commit"
        fullWidth
        variant="filled"
        margin="normal"
        multiline
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
        <FlexBetween
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        >
      <Box>
      
        <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          margin:"2rem"
        }}
          type="submit"
          variant="contained"
        >
          {editingNotesId ? "Update" : "Submit"}
        </Button>
        {!editingNotesId && (
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
        {editingNotesId && (
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

export default NotesForm