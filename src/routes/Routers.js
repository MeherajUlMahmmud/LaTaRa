import React from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'; 
import Home from '../pages/Home';
import Aboutus from '../pages/Aboutus';
import Cart from '../pages/Cart'; 
import ProductDetails from '../components/products/ProductDetails'; 
import Checkout from '../pages/Checkout';
import Shop from '../pages/Shop';
import Contactus from '../pages/Contactus';
import Login from '../pages/Login'; 
import Signup from '../pages/Signup'; 

import ProtectedRoute from './ProtectedRoute'; 
import ProfileSidebar from '../pages/profile/ProfileSidebar';
import MyAccount from '../pages/profile/MyAccount';
import MyProfile from '../pages/profile/MyProfile';
import MyAddress from '../pages/profile/MyAddress';
import UpdateProfile from '../pages/profile/UpdateProfile';

const Routers = () => {
  return<Routes>
   
        <Route path='/' element={<Navigate to="home" />}/>
        <Route path='home' element={<Home />}/>
        <Route path='aboutus' element={<Aboutus />}/>
        <Route path='cart' element={<Cart />}/>
        <Route path='checkout' element={<ProtectedRoute> <Checkout /> </ProtectedRoute>}/>

        <Route path='profiles' element={<ProtectedRoute> <ProfileSidebar /> </ProtectedRoute>}>
            {/* <Route path='/account' element={<Navigate to ="myaccount" />} /> */}
            <Route path='profiles' element={<Navigate to="myaccount" />}/>
            <Route path='myaccount' element={<ProtectedRoute> <MyAccount /> </ProtectedRoute>}/>
            <Route path='myprofile' element={<ProtectedRoute> <MyProfile /> </ProtectedRoute>}/>
            <Route path="/profiles/myprofile/updateprofile" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
            <Route path='myaddress' element={<ProtectedRoute> <MyAddress /> </ProtectedRoute>}/>
        </Route>

        <Route path='shop' element={<Shop />}/>
        <Route path='shop/:id' element={<ProductDetails />}/>
        <Route path='contactus' element={<Contactus />}/>
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Signup />}/>

    </Routes>
   
};

export default Routers;