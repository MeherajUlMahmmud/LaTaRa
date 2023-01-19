import { signOut } from 'firebase/auth';
import React from 'react'
import { Outlet,Link, NavLink,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase.config';

import '../styles/Ahome.css'; 

const navlink=[
  {
    path:'products', 
    navClass:'nav_link',
    className:'ri-store-2-line',
    display:'Product'
  },
  {
    path:'user', 
    navClass:'nav_link',
    className:'ri-shield-user-fill',
    display:'Users'
  },
  {
    path:'order', 
    navClass:'nav_link',
    className:'ri-shopping-bag-3-line',
    display:'Order'
  },
  {
    path:'message', 
    navClass:'nav_link',
    className:'ri-message-2-fill',
    display:'Message'
  },
  
]
const AdminHome = () => {
    const navigate = useNavigate();
    
    
        const logout =()=>{
          signOut(auth).then(()=>{
            toast.success("LoggedOut Successfully !"); 
            navigate('/home')
          }).catch(err=>{
            toast.error("Something is wrong!")
          })
        }
  return <div id="body-pd" className='abody'>
    <div className="aheader"  style={{background:"#e5e2fc"}}>
    <div class="header-toggle"></div>
        <div className="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt=""/> </div>
    </div>
    <div className="l-navbar" >
        <nav class="anav">
            <div> 
                <p className="nav_logo" style={{color:"white"}}> <i className="ri-stack-fill"></i>
                <span className="nav_logo-name">LATARA</span> </p>
                <div className="nav_list"> 
                      {
                        navlink.map((item,index)=>(
                          <NavLink to={item.path} > 
                            <div className={item.navClass} key={index}>
                              <i className={item.className} ></i>
                              <span className="nav_name">{item.display}</span>
                            </div>
                          </NavLink> 
                        ))
                      }
                </div>
            </div> 
            <div className="nav_link"  onClick={logout}> 
              <i class="ri-login-circle-line"></i>
              <span className="nav_name" style={{cursor:"pointer"}}>LogOut</span> 
            </div>
        </nav>
    </div>
    {/* Container  */}
    <div style={{margin:"20px",marginLeft:"60px"}}>
      <Outlet/>
    </div>
     
  
  </div>
}

export default AdminHome