import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard"
import Layout from './components/layout/layout';
import { themeSettings } from "./theme";
import CustomerData from './components/table/CustomerData';
import ContactData from './components/table/ContactData';
import ActivityData from './components/table/ActivityData';
import InteractionData from './components/table/InteractionData';
import OpportunityData from './components/table/OpportunityData';
import NotesData from './components/table/NotesData';
import Loader from './loader/Loader';



function App() {
const mode = useSelector((state) => state.global.mode);
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
const [customers, setCustomers] = useState([]);
const [contacts,setContacts] = useState([]);
const [loader,setLoader] = useState(false);

useEffect(() =>{
  setLoader(true);
  fetchCustomers();
  fetchContacts();
  setTimeout(() => {
    setLoader(false);
  }, 3000);
  console.log("loader is running")
},[])

const fetchCustomers = async (page) => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/customers',{
      params: {page}
    });
    setCustomers(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
const fetchContacts = async (page) => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/contacts',{
      params: { page}}
    );
    setContacts(response.data);
  } catch (error) {
    console.error(error);
  }
};



  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Routes>{
        loader ? (
        <Route path="/dashboard" element={<Loader/>}/>
        )
      :
      (
      <Route element={<Layout />}> 
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route path="/dashboard" element={<Dashboard 
        customers = {customers}
        />} />
          <Route path = '/customers'
          element={<CustomerData/>}
          />
         
            <Route  path = '/contacts' element={<ContactData customers={customers}/>} />  
            <Route  path = '/activities' element={<ActivityData customers={customers} />} />  
            <Route  path = '/interactions' element={<InteractionData customers={customers}/>} />  
            <Route  path = '/activities' element={<ActivityData customers={customers}  />} /> 
          <Route  path = '/opportunity' element={<OpportunityData customers={customers} contacts={contacts} setContacts={setContacts}  />} />  
            <Route  path = '/notes' element={<NotesData  customers={customers} contacts={contacts} setContacts={setContacts} />} /> 
          </Route>
          )}
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

