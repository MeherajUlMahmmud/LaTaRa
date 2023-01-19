
import {  BrowserRouter, Route,Routes } from 'react-router-dom'; 
import './App.css';
import Layout from './components/Layout/Layout';
import AdminLayout from './admin/components/Admin_Layout/Admin_Layout';

const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        {/* Customer  */}
        <Route path='*' element={<Layout/>}/> 
        {/* Admin Part */}
        <Route  path='/admin/*' element={<AdminLayout/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
