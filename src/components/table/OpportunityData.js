import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme,useMediaQuery} from "@mui/material";
import FlexBetween from '../navbar/FlexBetween';
import { IconButton, Button } from "@mui/material";
import Header from "../header/Header";
import OpportunityToolbar from '../../toolbar/OpportunityToolbar'
import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import OpportunityForm from '../inputs/OpportunityForm.js';

const OpportunityData = ({customers,contacts}) => {

const theme = useTheme();
const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
const [search ,setSearch] = useState("");
const [filterValue, setFilterValue] = useState("");
const [opportunities, setOpportunities] = useState([]);
const [editingOpportunityId, setEditingOpportunityId] = useState('');
const [opportunityName, setOpportunityName] = useState('');
const [customer,setCustomer] = useState('');
const [contact,setContact] = useState('');
const [salesStage, setSalesStage] = useState('');
const [value, setValue] = useState('');
const [expectedCloseDate, setExpectedCloseDate] = useState('');
const [assignedSalesRep, setAssignedSalesRep] = useState('');
const [OpenForm,setOpenForm] = useState();
const [error,setError] = useState('')


useEffect(() => {
  fetchOpportunities();
}, []);
const filteredRows = opportunities.filter((activity) => {
  return activity.salesStage.toLowerCase().includes(search.toLowerCase());
});

const toggleOpp = () => {
  setOpenForm(!OpenForm);
}

const fetchOpportunities = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/opportunities');
    setOpportunities(response.data);
  } catch (error) {
    console.error(error);
  }
};
 

  const handleEditClick = (opportunity) => {
    setEditingOpportunityId(opportunity.id);
    setOpportunityName(opportunity.opportunityName);
    setSalesStage(opportunity.salesStage);
    setValue(opportunity.value);
    setExpectedCloseDate(opportunity.expectedCloseDate);
    setAssignedSalesRep(opportunity.assignedSalesRep);
    setContact(opportunity.contact);
    setCustomer(opportunity.customer);
    toggleOpp();
    
  };

 const handleEditOpp = async () => {
 
    try {
      const updatedOpportunity = {
        contact,
        customer,
        opportunityName,
        salesStage,
        value,
        expectedCloseDate,
        assignedSalesRep,
      };

     const response =  await axios.put(`http://localhost:5000/api/v1/opportunities/${editingOpportunityId}`, updatedOpportunity);
     setOpportunities(opportunities.map((opp) => {
      if (opp._id === editingOpportunityId) {
        return response.data;
      }
      return opp;
    }));
    clearForm();
    setEditingOpportunityId(null);
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteClick = async (Id) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/opportunities/${Id}`);
    fetchOpportunities(); 
  } catch (error) {
    console.error(error);
  }
};


 const handleAddClick = async () => {
    try {
      if (!contact.trim()) {
        throw new Error('Contact is required');
      }
      if (!customer.trim()) {
        throw new Error('Customer is required');
      }
      if (!salesStage.trim()) {
        throw new Error('salesStage is required');
      }
      if (!value.trim()) {
        throw new Error('Amount is required');
      }
      const newOpportunity = {
        customer: customer ? [{ _id: customer }] : [],
        contact: contact ? [{_id:contact}] : [],
        opportunityName,
        salesStage,
        value,
        expectedCloseDate,
        assignedSalesRep,
      };

      await axios.post('http://localhost:5000/api/v1/opportunities', newOpportunity);
      fetchOpportunities();
      setContact();
      setCustomer();
      setOpportunityName('');
      setSalesStage('');
      setValue('');
      setExpectedCloseDate('');
      setAssignedSalesRep('');
    } catch (error) {
      console.error(error);
      setError(error.message)
    }
  };
  const handleCancelEdit = () => {
    clearForm();
    setEditingOpportunityId(null);
  };

   const clearForm = () => {
    setContact('');
    setContact('');
    setAssignedSalesRep('');
    setExpectedCloseDate('');
  setOpportunityName('');
    setSalesStage('');
    setValue('');
  };


  

  const columns = [
    { field: 'SNo', headerName: 'S.No', width: 50 },
    { field: 'customerName', headerName: 'Customer', width: 200 },
    { field: 'contactName', headerName: 'Contact', width: 200 },
    { field: 'opportunityName', headerName: 'Opportunity Name', width: 300 },
    { field: 'salesStage', headerName: 'Sales Stage', width: 200 },
    { field: 'value', headerName: 'Value', width: 150 },
    { field: 'expectedCloseDate', headerName: 'Expected Close Date', width: 200 },
    { field: 'assignedSalesRep', headerName: 'Assigned Sales Rep', width: 200 },
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
        onClick={() => handleDeleteClick(params.row._id)}
      />
        </IconButton>
      ),
    }
  ];

  return (
    <>
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="OPPORTUNITY" />
      <Box>
      <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={toggleOpp}
        
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
       rows={ filteredRows.map((opp, index) => ({
        SNo: index + 1,
        _id:opp._id,
        customerName: opp.customer.length > 0 ? opp.customer[0].name : 'Unknown',
        contactName: opp.contact.length > 0 ? opp.contact[0].name : 'Unknown',
opportunityName: opp.opportunityName,
salesStage:opp.salesStage,
value:opp.value,
expectedCloseDate:opp.expectedCloseDate,
assignedSalesRep:opp.assignedSalesRep
      }))}
      getRowId={(row) => row._id}
      columns={columns}
      components={{ Toolbar: OpportunityToolbar }}
      componentsProps={{
        toolbar: { filterValue, setFilterValue,setSearch },
      }}
      />
      </Box>
      </Box>
    </Box>
   
    {OpenForm ? <OpportunityForm
      handleCancelEdit={handleCancelEdit}
      handleAddClick={handleAddClick}
      handleEditOpp={handleEditOpp}
      customer={customer}
      contact={contact}
      opportunityName={opportunityName}
      salesStage={salesStage}
      value={value}
      expectedCloseDate={expectedCloseDate}
      assignedSalesRep={assignedSalesRep}
      setCustomer={setCustomer}
      setContact={setContact}
      setOpportunityName={setOpportunityName}
      setSalesStage={setSalesStage}
      setValue={setValue}
      setExpectedCloseDate={setExpectedCloseDate}
      setAssignedSalesRep={setAssignedSalesRep}
      setOpenForm={setOpenForm}
      editingOpportunityId={editingOpportunityId}
      customers={customers}
      contacts={contacts}
      error={error}
       /> : null}
    </>
    
  );
};

export default OpportunityData;
