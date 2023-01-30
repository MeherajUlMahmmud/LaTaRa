import React from 'react'
import AUseAuth from './CustomUser/AUseAuth';
import { Navigate } from 'react-router-dom';

const Admin_ProtectedRoute = ({ children }) => {
    const currentUser = AUseAuth();
    return currentUser ? children : <Navigate to='adminlogin' />
}

export default Admin_ProtectedRoute