import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box, useTheme,useMediaQuery} from "@mui/material";
import FlexBetween from '../navbar/FlexBetween';
import { IconButton, Button } from "@mui/material";
import Header from "../header/Header";
import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import ActivitiesForm from '../inputs/ActivitiesForm';
import ActivityToolbar from '../../toolbar/ActivitiesToolbar';

const ActivityData = ({customers,isloading}) => {

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [search ,setSearch] = useState("");
const [filterValue, setFilterValue] = useState("");
    const [activities, setActivities] = useState([]);
    const [openForm,setOpenForm] = useState();
    const [status,setStatus] = useState('')
    const [activityName,setActivityName] = useState('');
    const [dateTime,setDateTime] = useState('');
    const [activityType,setActivityType] = useState('');
    const [description,setDescription] = useState('');
    const [assignedUser,setAssignedUser] = useState('');
    const [customer, setCustomer] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);
    const [editingActivityId,setEditingActivityId] = useState(null);

    const toggleOpenForm = () =>{
      setOpenForm(!openForm);
    }
    
    const filteredRows = activities.filter((activity) => {
      return activity.activityType.toLowerCase().includes(search.toLowerCase());
    });
    
    useEffect(() => {
      fetchActivities();
    }, []);

  
      const fetchActivities = async (page) => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/activities'
          // , {
            // params: { page}}
            );
          setActivities(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const handleEditActivity = async () => {
        try {
          const updatedActivity = { 
            customer,
            contact,
            activityName,
            activityType,
            dateTime,
            description,
            assignedUser,
            status
          };
          await axios.put(`http://localhost:5000/api/v1/activities/${editingActivityId}`, updatedActivity);
          fetchActivities();
          clearForm();
          setEditingActivityId(null);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleEditClick = (activity) => {
        setEditingActivityId(activity._id);
        setCustomer(activity.customer);
        setContact(activity.contact);
        setActivityName(activity.activityName);
        setActivityType(activity.activityType);
        setDateTime(activity.dateTime);
        setDescription(activity.description);
        setAssignedUser(activity.assignedUser);
        setStatus(activity.status)
        toggleOpenForm();
      };



      const handleAddClick = async () => {
        try {
          if (!contact.trim()) {
            throw new Error('Contact is required');
          }
          if (!customer.trim()) {
            throw new Error('Customer is required');
          }
          if (!activityType.trim()) {
            throw new Error('ActivityType is required');
          }
          const newActivity = {
            customer: customer ? [{ _id: customer }] : [],
            contact: contact ? [{_id:contact}] : [],
            activityName,
            activityType,
            dateTime,
            description,
            assignedUser,
            status
          }
          const response = await axios.post('http://localhost:5000/api/v1/activities', newActivity);
          setActivities([...activities,response.data]);
          fetchActivities();
          setCustomer('');
          setContact('');
          setActivityName('');
          setActivityType('');
          setAssignedUser('');
          setDateTime('');
          setStatus('');
          setDescription('');
          clearForm();
        } catch (error) {
          console.error(error);
          setError(error.message);
        }
      };
      const handleCancelEdit = () => {
        clearForm();
        setEditingActivityId(null);
      };
      const clearForm = () => {
        setCustomer('');
        setContact('');
        setActivityName('');
        setActivityType('');
        setDateTime('');
        setDescription('');
        setAssignedUser('');
        setStatus('');
      };

      const handleDeleteActivity = async (activityId) => {
        try {
          await axios.delete(`http://localhost:5000/api/v1/activities/${activityId}`);
          fetchActivities();
        } catch (error) {
          console.error(error);
        }
      };
     
      
      const columns = [
        { field: 'SNo', headerName: 'S.NO', width: 50 },
        { field: 'customerName', headerName: 'Customer Name', width: 150 },
        { field: 'contactName', headerName: 'Contact Name', width: 100 },
        { field: 'activityType', headerName: 'Activity Type', width: 150 },
        { field: 'dateTime', headerName: 'Date/Time', width: 150 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'assignedUser', headerName: 'Assigned User', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
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
            onClick={() => handleDeleteActivity(params.row._id)}
          />
            </IconButton>
          ),
        }
      ];
      

  return (
    <>
  <Box m="1.5rem 2.5rem">
  <FlexBetween>
    <Header title="ACTIVITIES" />
    <Box>
    <Button
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.background.alt,
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
       
      }}
      onClick={toggleOpenForm}
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
      //height="75vh"
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
    rows={filteredRows.map((activity, index) => ({
      SNo: index + 1,
      _id: activity._id,
      customerName: activity.customer.length > 0 ? activity.customer[0].name : 'Unknown',
      contactName: activity.contact.length > 0 ? activity.contact[0].name : 'Unknown',
      activityType: activity.activityType,
      dateTime: activity.dateTime,
      description: activity.description,
      assignedUser: activity.assignedUser,
      status: activity.status,
    }))}
    columns={columns}
    components={{ Toolbar: ActivityToolbar }}
    componentsProps={{
      toolbar: { filterValue, setFilterValue,setSearch },
    }}
  />
  
    </Box>
    </Box>
  </Box>
  {openForm ? <ActivitiesForm
    setOpenForm={setOpenForm}
    editingActivityId={editingActivityId}
    handleAddClick={handleAddClick}
    handleEditActivity={handleEditActivity}
    customer={customer}
    contact={contact}
    activityType={activityType}
    dateTime={dateTime}
    description={description}
    assignedUser={assignedUser}
    setContact={setContact}
    setCustomer={setCustomer}
    setActivityType={setActivityType}
    setDateTime={setDateTime}
    setDescription={setDescription}
    setAssignedUser={setAssignedUser}
    handleCancelEdit={handleCancelEdit}
    customers={customers}
status={status}
setStatus={setStatus}
error={error}
    /> : null }
  </>
);
}

export default ActivityData