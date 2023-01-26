import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './common.css';

import { useEffect, useState } from 'react';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';

const ViewProducts = () => {
    const [data, setData] = useState([]);
    let navigate = useNavigate();

    const navigatetoAdd = () => {
        navigate('addproducts');
    }

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "products"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        };


    }, []);
    console.log(data);
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id));
            setData(data.filter((item) => item.id !== id));
            toast.success("Successfully Item Delete");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div style={{ height: "100px" }}>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <p className="cat_sec">
                            Page/Products
                        </p>

                        {/* <Link to={"addproducts"}> */}
                        <button className="btn btn-primary" type="button" onClick={() => navigatetoAdd()}>
                            + Add
                        </button>
                        {/* </Link>   */}
                    </div>

                </nav>
            </div>
            <div>
                <table className="table" style={{ textAlign: "center" }}>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">ShortDesc.</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((datas, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><div style={{ margin: "5px", display: "inline-block", position: "relative", objectFit: "cover" }}><img src={datas.imgUrl} alt="" height={"10px;"} /></div></td>
                                    <td>{datas.product}</td>
                                    <td>{datas.category}</td>
                                    <td>{datas.description}</td>
                                    <td>{datas.shortDesc}</td>
                                    <td><span style={{ color: "blue", fontSize: "15px" }}>TK {datas.price}</span></td>

                                    <td>
                                        <Link to={`editproducts/${datas.id}`}>
                                            <span className='ico_edit'><i className="ri-edit-line"></i></span>
                                        </Link>
                                        <span className='ico_del' onClick={() => handleDelete(datas.id)}><i className="ri-delete-bin-line"></i>
                                        </span>
                                    </td>
                                </tr>

                            )
                        })}


                    </tbody>
                </table>
            </div>
            <Outlet />
        </div>
    )
}

export default ViewProducts