import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/Navbar"
import { Routes,Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard"
import DataTable from './components/table/DataTable';
import Addcustomer from './components/inputs/Addcustomer';
import SubCustomerTable from './components/table/SubCustomerTable';



function App() {
  return (
    <>
<Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/customer' element={<DataTable/>}/>
        <Route path='/subcustomer' element={<SubCustomerTable/>}/>
      </Routes>
    </>
  );
}

export default App;

