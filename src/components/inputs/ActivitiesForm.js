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

const ActivitiesForm = ({
  customers,
    editingActivityId,
    handleAddClick,
    handleEditActivity,
    status,
    setStatus,
    customer,
    contact,
    activityType,
    dateTime,
    description,
    assignedUser,
    setContact,
    setCustomer,
    setActivityType,
    setDateTime,
    setDescription,
    setAssignedUser,
    customerOptions,
    setOpenForm,
    handleCancelEdit,
    error
}) => {
    const theme = useTheme();
    const options = [
      { value: "Task", label: "Task" },
      { value: "Appointment", label: "Appointment" },
      { value: "Folloe-Up", label: "Follow-Up" }
    ];
    const optionsStatus = [
      { value: "Not Started", label: "Not Started" },
      { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" },
    ];

    return (
  
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,backgroundColor: theme.palette.background.alt,padding:"2rem"}}>
        <ArrowBackIosIcon
     onClick={ () => setOpenForm(false)}
    style={{marginBottom:"2rem"}}
     />
     {editingActivityId ? <Header title="Edit Activities"/> :  <Header title="Add Activities" />}
        <form 
        onSubmit={editingActivityId ? handleEditActivity : handleAddClick}>
        <Box  display="flex"  flexDirection="row" alignItems="center">
          <TextField
          style={{margin: "1rem" ,display:"inline-block",width:"10vw"}}
            label="Activity Type"
            fullWidth
            select
            variant="filled"
            margin="normal"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          <TextField
          style={{ margin: '1rem'}}
          label="Assigned User"
          variant="filled"
          margin="normal"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
          />
          <TextField
          style={{ margin: '1rem',width:"10vw"}}
          select
          label="Status"
          variant="filled"
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          >
          {optionsStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          </Box>
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
         
            <div style={{ display: 'inline-block' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Date"
                  value={dateTime}
                  onChange={(newDate) => setDateTime(newDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
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
        <Box>
        {error && <div style={{color:"red"}}>Error: {error}</div>}
        
          <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            display:"inherit"
          }}
            type="submit"
            variant="contained"
          >
            {editingActivityId ? "Update" : "Submit"}
          </Button>
          {!editingActivityId && (
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

          {editingActivityId && (
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

export default ActivitiesForm