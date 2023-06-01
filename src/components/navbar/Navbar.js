import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider, TextField, Button, fabClasses } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './navbar.css'


const Navbar = () => {
   
    const [open, setOpen] = useState(false);
    const navigatecustomer = useNavigate();
    const navigateSubcustomer = useNavigate();
    const navigateDashboard = useNavigate();

    const handleCustomerList = () =>{
      navigatecustomer("/customer")
    }
    const handleSubCustomerList = () =>{
      navigateSubcustomer("/subcustomer")
    }
    const handleDashboard = () =>{
      navigateDashboard("/")
    }

    const handleToggleDrawer = () => {
      setOpen(!open);
    };
  
  return (
    <div>
    <div>
    <AppBar position="fixed" style={{background:"#0a1c33"}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CRM
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      anchor="left"
      open={open}
      onClose={handleToggleDrawer}
    >
      <div style={{ width: '250px'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
        <div></div>
          <IconButton edge="end" color="inherit" aria-label="close" onClick={handleToggleDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" onClick={handleDashboard}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Meeting Description" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Customer List" onClick={handleCustomerList}/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Subcustomer List" onClick={handleSubCustomerList}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Another action" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Something else here" />
          </ListItem>
        </List>
      </div>
    </Drawer>
    <main style={{ marginTop: '64px', padding: '16px' }}>
     
      <form>
      <div class="searchbar">
    <div class="searchbar-wrapper">
        <div class="searchbar-left">
            <div class="search-icon-wrapper">
                <span class="search-icon searchbar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                        </path>
                    </svg>
                </span>
            </div>
        </div>

        <div class="searchbar-center">
            <div class="searchbar-input-spacer"></div>

            <input type="text" class="searchbar-input" maxlength="2048" name="q" autocapitalize="off" autocomplete="off" title="Search" role="combobox" placeholder="Search"/>
        </div>

        <div class="searchbar-right">
            <svg class="voice-search" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#4285f4" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z">
                </path>
                <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
                <path fill="#fbbc05" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z">
                </path>
                <path fill="#ea4335" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z">
                </path>
            </svg>
        </div>
    </div>
</div>
      </form>
    </main>
  </div>
    
    
    </div>
  )
}

export default Navbar