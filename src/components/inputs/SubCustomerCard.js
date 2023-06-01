import React, { useState } from 'react'
import {ImCross} from 'react-icons/im'
import {
    Typography,
    TextField,
    Button,
    MenuItem
  } from '@mui/material';
  import './Addinput.css'

const Addcustomer = ({ handleAddCustomer, handleEditCustomer, handleCancelEdit, editingCustomerId, name, setName, email, setEmail, phone, setPhone, address, setAddress,status,setStatus}) => {
  const [closeCard,setCloseCard] = useState(false);
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];
  const toggleCloseCard = () =>{
    setCloseCard(!closeCard);
  }
  return (
    <>
    { closeCard ? null : (<div className='card_sec'>
<ImCross  onClick={toggleCloseCard}
fontSize={30}
style={{position:"absolute",right:"15px"}}
/>
    <Typography 
    variant="h5" gutterBottom>{editingCustomerId ? 'Edit Clients' : 'Add Clients'}</Typography>
    <form 
    onSubmit={editingCustomerId ? handleEditCustomer : handleAddCustomer}>
      <TextField
      style={{margin: "1rem",display:"block"}}
      fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
      style={{margin: "1rem" }}
      fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
      style={{margin: "1rem" ,display:"block"}}
      fullWidth
        label="Phone"
        variant="outlined"
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
      style={{margin: "1rem",display:"block"}}
      fullWidth
        label="Address"
        variant="outlined"
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
      style={{ margin: '1rem', display: 'block' }}
      fullWidth
      select
      label="Select Option"
      variant="outlined"
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

      <div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Imp Point Discusssed From Client Side - </label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
      <div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Imp Point Discussed From Our Side - </label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
      
      <Button
        type="submit"
        variant="contained"
        color={editingCustomerId ? "primary" : "success"}
      >
        {editingCustomerId ? "Update" : "Add"}
      </Button>
      {editingCustomerId && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>
      )}
    </form>
    
    
    </div>)}
    </>
  )
}

export default Addcustomer