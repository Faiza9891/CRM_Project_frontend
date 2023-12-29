import React from 'react'
import {  TextField,  Button,   MenuItem,  Box,  useTheme} from '@mui/material';
import Header from '../header/Header'
import FlexBetween from '../navbar/FlexBetween';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
    
 
     

const OpportunityForm = ({handleCancelEdit,
  error,
  customers,
  handleAddClick,
  handleEditOpp,
  customer,
  contact,
  opportunityName,
  salesStage,
  value,
  expectedCloseDate,
  assignedSalesRep,
  setCustomer,
  setContact,
  setOpportunityName,
  setSalesStage,
  setValue,
  setExpectedCloseDate,
  setAssignedSalesRep,
  setOpenForm,
  editingOpportunityId,
  contacts
}) => {


  const theme = useTheme();
  const handleStageChange = (event) => {
    setSalesStage(event.target.value);
  };

  return (
   
    <>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,backgroundColor: theme.palette.background.alt,padding:"2rem"}}>
    <ArrowBackIosIcon
    onClick={() => setOpenForm(false)}
   style={{marginBottom:"2rem"}}
    />
    {editingOpportunityId ? (
      <Header title="Edit Opportunities" />
    ) : (
      <Header title="Add Opportunities" />
    )}
    <form onSubmit={editingOpportunityId ? handleEditOpp : handleAddClick}>
    <Box display="flex"  flexDirection="row" alignItems="center">
    <TextField
    style={{ margin: '1rem' }}
    fullWidth
    select
    label="Select Customer"
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

  <TextField
    style={{ margin: '1rem' }}
    fullWidth
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
  // id="filled-basic"
  style={{ margin: "1rem" }}
  fullWidth
  variant="filled"
  margin="normal"
  label="Opportunity Name"
  value={opportunityName}
  onChange={(e) => setOpportunityName(e.target.value)}
/>
</Box>
      <Box display="flex"  flexDirection="row" alignItems="center">
        <TextField
          style={{ margin: "1rem" }}
          fullWidth
          variant="filled"
          margin="normal"
          label="Amount"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      <TextField
      style={{ margin: "1rem" }}
      fullWidth
      variant="filled"
      margin="normal"
      label="Assigned Sales Rep"
      value={assignedSalesRep}
      onChange={(e) => setAssignedSalesRep(e.target.value)}
    />
      </Box>
        <Box display="flex"  flexDirection="row" alignItems="center">
        <div style={{ display: 'flex' }}>
        <FormControl style={{ margin: '1rem' }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Sales Stage</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={salesStage}
            onChange={handleStageChange}
          >
            <FormControlLabel value="prospecting" control={<Radio />} label="Prospecting" />
            <FormControlLabel value="negotiation" control={<Radio />} label="Negotiation" />
            <FormControlLabel value="closed-Won" control={<Radio />} label="Closed-Won" />
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
          label="Expected Close Date"
            inputStyle={{ outline: 'white', boxShadow: 'none' }}
            PopperProps={{ style: { outline: 'white', boxShadow: 'none' } }}
            value={expectedCloseDate}
            onChange={(e) => setExpectedCloseDate(e)}
          />
        </DemoContainer>
      </LocalizationProvider>
        </div>
        </Box>
       
  
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
            {editingOpportunityId ? "Update" : "Submit"}
          </Button>
          {!editingOpportunityId && (
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
          {editingOpportunityId && (
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

export default OpportunityForm