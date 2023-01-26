import React from 'react';
import './Aheader.css';
const AdminHeader = ({ category, title, link }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <p className="cat_sec">
          {category}/{title}
        </p>
      </div>

    </nav>
  )
}

export default AdminHeader