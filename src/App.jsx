import {useState} from 'react';
import {Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import EmployeeTable from './pages/List';
import Details from './pages/Details';
function App() {

  return (

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/employees" element={<EmployeeTable />} />
        <Route path="/employees/details" element={<Details />} />
      </Routes>

  );
}

export default App;