import React from 'react'
import { Link } from 'react-router-dom';
import UseAuth from '../../custom_user/UseAuth';

const MyProfile = () => {
    const user = UseAuth();


    return <div className="col-lg-9 my-lg-0 my-1">
        <div id="main-content" className="bg-white border">

            <div className="card" style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <div className="d-flex justify-content-center card h-50" style={{ alignItems: "center", width: "200px", height: "200px", margin: "10px", textAlign: "center", justifyContent: "center" }} >
                    <img src={user.photoURL} className="img-fluid rounded-circle" alt="..." />

                </div>

                <div className="card-body">
                    <h3 className="card-title text-uppercase" style={{ fontSize: "45px", fontWeight: "600" }}>{user.displayName}</h3>
                    <p className="">Email: {user.email}</p>
                </div>

                <div className="card-body">
                    <Link to="/profiles/myprofile/updateprofile">
                        <div style={{ color: "blue", fontWeight: "400", cursor: "pointer" }}><i className="ri-edit-line"></i><u>edit profile</u></div>
                    </Link >
                </div>
            </div>



        </div>
    </div>
}

export default MyProfile