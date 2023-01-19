import React, { useRef, useEffect } from 'react'
import { Container, Row } from 'reactstrap';
import { NavLink, useNavigate } from "react-router-dom";
import './header.css';
import logo from "../../assets/Logo.png";
import profile from "../../assets/profile.png";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../custom_user/UseAuth";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const navlink = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'aboutus',
    display: 'About Us'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'contactus',
    display: 'Contact Us'
  }
]
const Header = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = useAuth();



  const stickyHeaderFunc = () => {

    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      }
      else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  const navigateToCart = () => {
    navigate("/cart");
  }

  const logout = () => {
    signOut(auth).then(() => {
      toast.success("Logged Out Successfully !");
      navigate('/home')
    }).catch(err => {
      toast.error("Something is wrong!")
    })
  }


  return <header className='header' ref={headerRef}>
    <Container>
      <Row>
        <div className='nav_wrapper'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className='navigation' ref={menuRef} onClick={menuToggle}>
            <ul className='menu'>
              {
                navlink.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink to={item.path} className={(navClass) =>
                      navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='nav__icons'>
            <span className='cart__icon' onClick={navigateToCart} >
              <i class="ri-shopping-bag-line"></i>
              <span className='badge'>{totalQuantity}</span>
            </span>

            <div className="profile">
              {
                currentUser ?
                  <Link to="/profiles/myaccount">
                    <motion.img
                      whileTap={{ scale: 1.2 }}
                      src={currentUser.photoURL}
                      alt="profile"
                    />
                  </Link>
                  :
                  <Link to="/login">
                    Login
                  </Link>
                // <motion.img
                //   whileTap={{ scale: 1.2 }}
                //   src={profile}
                //   alt="profile"
                // />
              }

            </div>


            <div className='profile__actions'>
              {
                currentUser ?
                  <div style={{ borderRadius: "5px", cursor: "pointer", background: "#2096F3", height: "30px", padding: "5px" }} onClick={logout}>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", textAlign: "center" }}>Logout</h4>
                  </div>
                  :
                  <div style={{ borderRadius: "5px", cursor: "pointer", background: "#4bbd80", height: "30px", padding: "5px" }} >
                    <h5 style={{ fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
                      <Link to='/login' >Login</Link>
                    </h5>
                  </div>
              }
            </div>

            <div className='mobile__menu'>
              <span onClick={menuToggle} className='cart__icon'><i class="ri-menu-line"></i></span>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  </header>
}

export default Header