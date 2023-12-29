import React from 'react';
import FlexBetween from "../navbar/FlexBetween";
import Header from "../header/Header";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "../navbar/StatBox";
import ActiveStatusChart from '../charts/ActiveStatusChart'

const Dashboard = ({ customers }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const columns = [
    {
      field: "SNo",
      headerName: "S.No",
      flex: 0.5,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 0.8,
      // sortable: true,
      //renderCell: (params) => params.value.length,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
      sortable: false,
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 0.8,
      sortable: false,
    },
    {
      field: "Phone",
      headerName: "Phone",
      flex: 1,
      sortable: false,
    },
    {
      field: "CreatedAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
     // renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  const totalCustomers = customers && customers.length; 
  const activeCustomers = customers && customers.filter(customer => customer.status === 'Active').length;
  const inactiveCustomers = totalCustomers - activeCustomers;
  
  const activePercentage = (activeCustomers / totalCustomers) * 100;
  const inactivePercentage = (inactiveCustomers / totalCustomers) * 100;


const currentDate = new Date(); // Get the current date
const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); 

const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); 

const customersAddedToday = customers && customers.filter(customer => {
  const customerDate = new Date(customer.created_at); // Assuming your customer object has a "createdAt" field with the date of creation
  return customerDate >= today; // Filter customers created today
}).length;

const customersAddedLastWeek = customers && customers.filter(customer => {
  const customerDate = new Date(customer.created_at);
  return customerDate >= lastWeek && customerDate < today; // Filter customers created in the last week
}).length;

const customersAddedLastMonth = customers && customers.filter(customer => {
  const customerDate = new Date(customer.created_at);
  return customerDate >= lastMonth && customerDate < today; // Filter customers created in the last month
}).length;



  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Customers Info" />
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
      gridColumn="span 3"
      gridRow="span 2"
      backgroundColor={theme.palette.background.alt}
      p="1rem"
      borderRadius="0.55rem"
    >
      <ActiveStatusChart  activeCustomers={activeCustomers} inactiveCustomers={inactiveCustomers} view="sales" isDashboard={true} />
    </Box>
      <StatBox
      title="Total Customers"
      value={customers && customers.length}
      //increase="+14%"
      icon={
        <PeopleAltIcon
          sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
        />
      }

    />
    <StatBox
    title="Active Customers"
    value={activeCustomers}
    increase={`${activePercentage.toFixed(2)}%`}
    icon={
      <PeopleAltIcon
        sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
      />
    }
  />
    <StatBox
      title="InActive Customers"
      value={inactiveCustomers}
      increase={`${inactivePercentage.toFixed(2)}%`}
      icon={
        <PeopleAltIcon
          sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
        />
      }
    />
    <StatBox
    title="Customers Added Today"
    value={customersAddedToday}
    description="Since midnight"
    icon={
      <PeopleAltIcon
        sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
      />
    }
  />
      <StatBox
        title="Customers Added Last Week"
        value={customersAddedLastWeek}
        description="Past 7 days"
        icon={
          <PeopleAltIcon
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
      
      <StatBox
        title="Customers Added Last Month"
        value={customersAddedLastMonth}
        description="Past 30 days"
        icon={
          <PeopleAltIcon
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
       
       
        {/* ROW 2 */}
        <Box
          gridColumn="span 13"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: theme.palette.primary[600],
              borderRadius: "1rem",
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
              backgroundColor: theme.palette.background.alt,
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
            //loading={isLoading || !customers}
            getRowId={(row) => row._id}
            rows={customers.map((customer,index) => ({
              SNo: index + 1,
              _id: customer._id,             
              // Organization: customer.organization,             
              Name: customer.name,
              Email: customer.email,
              Address: customer.address,
              Phone: customer.phone,
              CreatedAt: customer.created_at,
              Status: customer.status,
            })) || []}
            columns={columns}
          />
        </Box>
       
      </Box>
    </Box>
  );
};

export default Dashboard;