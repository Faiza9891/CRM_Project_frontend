import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme,useMediaQuery}  from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import FlexBetween from '../navbar/FlexBetween';
import {  IconButton,Button } from "@mui/material";
import Header from "../header/Header";
import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon, SignalCellularNullRounded } from '@mui/icons-material';
import InteractionForm from '../inputs/InteractionForm';
import InteractionToolbar from '../../toolbar/InteractionToolbar';

const InteractionData = ({customers}) => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
      const [search ,setSearch] = useState("");
const [filterValue, setFilterValue] = useState("");
    const [interactions, setInteractions] = useState([]);
    const [editingIntId,setEditingIntId] = useState(null);
    const [customer, setCustomer] = useState('');
    const [interactionType, setInteractionType] = useState('');
    const [dateTime, setDateTime] = useState(SignalCellularNullRounded);
    const [description, setDescription] = useState('');
    const [outcome, setOutcome] = useState('');
    const [toggleForm,setToggleForm] = useState();
    const [error,setError] = useState('');

    const toggleOpenCard = () => {
      setToggleForm(!toggleForm);
    }

    useEffect(() => {
      fetchInteractions();
    }, []);
   const filteredRows = interactions.filter((interact) => {
      return interact.interactionType.toLowerCase().includes(search.toLowerCase());
    });
      const fetchInteractions = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/interactions');
          setInteractions(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/v1/interactions/${id}`);
          setInteractions(interactions.filter((interaction) => interaction._id !== id));
        } catch (error) {
          console.error(error);
        }
      };
      
      const handleAddInteraction = async () => {
        try {
          if (!customer.trim()) {
            throw new Error('Customer is required');
          }
          if (!outcome.trim()) {
            throw new Error('Outcome is required');
          }
          if (!interactionType.trim()) {
            throw new Error('Interaction type is required');
          }
          const newInteraction = {
            customer: customer ? [{ _id: customer }] : [],
            interactionType, dateTime, description, outcome};
          const response = await axios.post('http://localhost:5000/api/v1/interactions', newInteraction);
          setInteractions([...interactions, response.data]);
          fetchInteractions();
          setCustomer('');
          setInteractionType('');
          setDateTime('');
          setDescription('');
          setOutcome('');
          clearForm();
        } catch (error) {
          console.error(error);
          setError(error.message)
        }
      };
      const handleEditInteraction = async () => {
        try {
          const updatedInteraction = {
            customer, interactionType, dateTime, description, outcome};
          const response = await axios.put(`http://localhost:5000/api/v1/interactions/${editingIntId}`,  updatedInteraction);
          setInteractions(interactions.map((ineraction) => {
            if (ineraction._id === editingIntId) {
              return response.data;
            }
            return ineraction;
          }));
          clearForm();
          setEditingIntId(null);
        } catch (error) {
          console.error(error);
        }
      };
     

      const handleEditClick = (int) => {
        setEditingIntId(int._id);
        setCustomer(int.customer);
        setInteractionType(int.interactionType);
        setDateTime(int.dateTime);
        setDescription(int.description);
        setOutcome(int.outcome);
        toggleOpenCard();
      };
    
    
      const handleCancelEdit = () => {
        clearForm();
        setEditingIntId(null);
      };
    
       const clearForm = () => {
        setCustomer('');
        setInteractionType('');
        setDateTime('');
        setDescription('');
        setOutcome('');
      };
      
    
    const columns = [
      { field: 'SNo', headerName: 'S.NO', width: 150 },
      { field: 'customerName', headerName: 'Customer Name', width: 150 },
      { field: 'interactionType', headerName: 'Interaction Type', width: 150 },
      { field: 'dateTime', headerName: 'Date/Time',  flex: 0.5 },
      { field: 'description', headerName: 'Description',  flex: 0.8 },
      { field: 'outcome', headerName: 'Outcome',  flex: 0.5 },
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
          onClick={() => handleDelete(params.row._id)}
        />
          </IconButton>
        ),
      }
    ];
    
    return (
      <>
        <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="INTERACTIONS"/>
          <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={toggleOpenCard}
          >
            ADD
          </Button>
        </Box>
        </FlexBetween>
        <Box
        // mt="20px"
        // display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        // gridAutoRows="160px"
        // gap="20px"
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
              margin: "0 auto", 
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
         rows={filteredRows.map((interaction, index) => ({
          SNo: index + 1,
          _id: interaction._id,
  customerName:interaction.customer[0].name,
  interactionType: interaction.interactionType,
  dateTime: interaction.dateTime,
  description: interaction.description,
  outcome: interaction.outcome,
        }))}
         columns={columns}
         components={{ Toolbar: InteractionToolbar }}
           componentsProps={{
      toolbar: { filterValue, setFilterValue,setSearch },
    }}
    />
          </Box>
          </Box>
        </Box>
        {toggleForm ? <InteractionForm
          customers={customers}
          setToggleForm={setToggleForm}
          handleAddInteraction={handleAddInteraction}
          handleCancelEdit={handleCancelEdit}
          editingIntId={editingIntId}
          customer={customer}
          setCustomer={setCustomer}
          setInteractionType={setInteractionType}
          setDateTime={setDateTime}
          setDescription={setDescription}
          setOutcome={setOutcome}
          interactionType={interactionType}
          dateTime={dateTime}
          description={description}
          outcome={outcome}
          handleEditInteraction={handleEditInteraction}
          error={error}
          /> : null }
        </>
    );
    
}

export default InteractionData