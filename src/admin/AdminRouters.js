import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './page/AdminLogin';
import AddProducts from './page/AddProducts';
import AdminHome from './page/AdminHome';
import User from './page/AdminUser';
import Order from './page/AdminOrder';
import ViewProducts from './page/ViewProducts';
import AdminProtectedRoute from './Admin_ProtectedRoute';
import EditProducts from './page/EditProduct';
import Message from './page/Message';
const AdminRoutes = () => {
  return <Routes>

    {/* <Route path='*' element={<Navigate to="adminlogin" />}/> */}
    <Route path='/' element={<AdminLogin />} />

    <Route path='adminhome' element={<AdminProtectedRoute> <AdminHome /> </AdminProtectedRoute>}>

      <Route path='/adminhome' element={<Navigate to="products" />} />
      <Route path='products' element={<AdminProtectedRoute><ViewProducts /></AdminProtectedRoute>}>

        <Route path='addproducts' element={<AdminProtectedRoute><AddProducts /></AdminProtectedRoute>} />
        <Route path='editproducts/:id' element={<AdminProtectedRoute><EditProducts /></AdminProtectedRoute>} />

      </Route>
      <Route path='user' element={<AdminProtectedRoute><User /></AdminProtectedRoute>} />
      <Route path='order' element={<AdminProtectedRoute><Order /></AdminProtectedRoute>} />
      <Route path='message' element={<AdminProtectedRoute><Message /></AdminProtectedRoute>} />
    </Route>


  </Routes>
};

export default AdminRoutes;