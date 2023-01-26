import React, { useRef, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { NavLink, useNavigate } from "react-router-dom";
import './Profile.css';
const navlink = [
  {
    path: 'myaccount',
    display: 'My Order',
    description: 'View & Manage orders and returns'
  },
  {
    path: 'myprofile',
    display: 'My Profile',
    description: 'Manage Your Profile '
  },
  {
    path: 'myaddress',
    display: 'My Address',
    description: 'View and Manage your Address '
  }
]
const ProfileSidebar = () => {

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-3 my-lg-0 my-md-1">
          <div id="sidebar" className="bg-purple">
            <div className="h4 text-white">Account</div>
            <ul>
              {

                navlink.map((item, index) => (
                  <li key={index}>
                    <div className="fas fa-box pt-2 me-3"></div>
                    <div className="d-flex flex-column" >
                      <NavLink to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? 'nav__active' : ''}>
                        <div className="link">{item.display}</div>
                        <div className="link-desc"> {item.description}</div>
                      </NavLink>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileSidebar