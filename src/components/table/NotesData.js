import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme,useMediaQuery} from "@mui/material";
import FlexBetween from '../navbar/FlexBetween';
import { IconButton, Button } from "@mui/material";
import Header from "../header/Header";
import { EditOutlined as EditOutlinedIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import NotesToolbar from '../../toolbar/NotesToolbar';
import NotesForm from '../inputs/NotesForm';

const NoteGrid = ({customers,contacts}) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [search ,setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [customer,setCustomer] = useState('');
  const [contact,setContact] = useState('');
  const [text,setText] = useState('');
  const [date,setDate] = useState('');
  const [editingNotesId,setEditingNotesId] = useState(null);
  const [openCard,setOpenCard] = useState();
  const [error,setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);
  const filteredRows = notes.filter((note) => {
    const text = typeof note.text === 'string' ? note.text : '';
    return text.toLowerCase().includes(search.toLowerCase());
  });
  

const toggleCard = () =>{
  setOpenCard(!openCard);
}

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/notes');
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  
  const handleEditNotes = async () => {
      try {
        const updatedNotes = { customer,contact, text, date};
        const response = await axios.put(`http://localhost:5000/api/v1/notes/${editingNotesId}`, updatedNotes);
        setNotes(notes.map((note) => {
          if (note._id === editingNotesId) {
            return response.data;
          }
          return note;
        }));
        clearForm();
        setEditingNotesId(null);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleEditClick = (note) => {
      setEditingNotesId(note._id);
      setCustomer(note.customer);
      setContact(note.contact);
      setText(note.text);
      setDate(note.date);
      toggleCard();
    };
  
  
    const handleCancelEdit = () => {
      clearForm();
      setEditingNotesId(null);
    };
  
     const clearForm = () => {
      setText('');
      setCustomer('');
      setContact('');
      setText('');
      setDate('');
    };
  
  
  
  
   const handleAddNotes = async () => {
    try {
      const newNotes = { 
        customer: customer ? [{ _id: customer }] : [],
        contact: contact ? [{_id:contact}] : [],
        text,date};
      const response = await axios.post('http://localhost:5000/api/v1/notes', newNotes);
      setNotes([...notes, response.data]);
      setText('');
      setCustomer('');
      setContact('');
      setDate('');
      clearForm();
    } catch (error) {
      console.error(error);
      setError(error.message)
    }
  };
  
   const handleDeleteNotes = async (noteId) => {
    try {
       await axios.delete(`http://localhost:5000/api/v1/notes/${noteId}`);
       fetchNotes();
      console.log('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
 


  const columns = [
    { field: 'customerName', headerName: 'Customer Name', width: 200 },
    { field: 'contactName', headerName: 'Contact Name', width: 200 },
    { field: 'text', headerName: 'Text', width: 200 },
    { field: 'dateTime', headerName: 'Date/Time', width: 200 },
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
        onClick={() => handleDeleteNotes(params.row._id)}
      />
        </IconButton>
      ),
    }
  ];

  return (
<>
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="NOTES" />
      <Box>
      <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={toggleCard}
        
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
        mt="50px"
        width="95vh"
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
      rows={filteredRows.map((notes, index) => ({
        SNo: index + 1,
        _id: notes._id,
        customerName: notes.customer.length > 0 ? notes.customer[0].name : 'Unknown',
        contactName: notes.contact.length > 0 ? notes.contact[0].name : 'Unknown',
      text: notes.text,
      dateTime: notes.dateTime,
            }))} 
            getRowId={(row) => row._id}
            columns={columns} 
      components={{ Toolbar: NotesToolbar }}
      componentsProps={{
        toolbar: { filterValue, setFilterValue,setSearch },
      }}
      />
      </Box>
      </Box>
    </Box>
    {openCard ? <NotesForm 
      handleAddNotes={handleAddNotes}
      handleCancelEdit={handleCancelEdit}
      handleEditNotes={handleEditNotes}
      editingNotesId={editingNotesId}
      customer={customer}
      contacts={contacts}
      text={text}
      date={date}
      setCustomer={setCustomer}
      setContact={setContact}
      setText={setText}
      setDate={setDate}
      setOpenCard={setOpenCard}
      customers={customers}
      error={error}
      />: null }
    </>
  );
};

export default NoteGrid;
