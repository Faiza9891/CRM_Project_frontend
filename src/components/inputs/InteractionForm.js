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
// import { LocalizationProvider, DatePicker } from '@material-ui/pickers';
// import AdapterDayjs from '@material-ui/pickers/adapter/dayjs';


const InteractionForm = ({setToggleForm, 
  error,
  customers,
    handleEditInteraction,
    handleAddInteraction,
    handleCancelEdit,
    editingIntId,
    customer,
    interactionType,
    dateTime,
    description,
    outcome,
    setCustomer,
    setInteractionType,
    setDateTime,
    setDescription,
    setOutcome,
    customerOptions
}) => {
    const theme = useTheme();
    const options = [
      { value: "Phone", label: "Phone" },
      { value: "Call", label: "Call" },
      { value: "Email", label: "Email" },
      { value: "Meeting", label: "Meeting" },
    ];
    const optionsStatus = [
      { value: "Resolved", label: "Resolved" },
      { value: "Pending", label: "Pending" },
    ];
  return (

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,backgroundColor: theme.palette.background.alt,padding:"2rem"}}>
      <ArrowBackIosIcon
   onClick={ () => setToggleForm(false)}
  style={{marginBottom:"2rem"}}
   />
   {editingIntId ? <Header title="Edit Interaction"/> :  <Header title="Add Interaction" />}
      <form 
      onSubmit={editingIntId ? handleEditInteraction : handleAddInteraction}>
        <TextField
        style={{margin: "1rem",width:"10vw" }}
          label="Interaction Type"
          select
          variant="filled"
          margin="normal"
          value={interactionType}
          onChange={(e) => setInteractionType(e.target.value)}
        >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
        <TextField
        style={{ margin: '1rem',width:"10vw"}}
        label="Outcome"
        select
        variant="filled"
        margin="normal"
        value={outcome}
        onChange={(e) => setOutcome(e.target.value)}
        >
        {optionsStatus.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
        <Box  display="flex"  flexDirection="row" alignItems="center">
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
          <DatePicker 
          label="Date"
          error={false}
          format="DD/MM/YY"
          value={dateTime}
          onChange={(e) => setDateTime(e)}
          />
          </DemoContainer>
        </LocalizationProvider>
        </Box>
          <TextField
          style={{margin: "1rem"}}
            label="Description"
            fullWidth
            variant="filled"
            multiline
            rows={5}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          {editingIntId ? "Update" : "Submit"}
        </Button>
        {!editingIntId && (
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
        {editingIntId && (
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

export default InteractionForm