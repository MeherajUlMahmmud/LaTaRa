import React from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/Header/AHeader'
import './common.css';

import { useEffect, useState } from 'react';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
const AdminUser = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "users"),
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
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
            toast.success("Successfully Item Delete");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div style={{ height: "100px" }}>
                <AdminHeader category="Page" title="Users" />
            </div>
            <div>
                <table className="table" style={{ textAlign: "center" }}>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Profile</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Postal Code</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((datas, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><div style={{ margin: "5px", display: "inline-block", position: "relative", objectFit: "cover" }}><img src={datas.photoURL} alt="" height={"10px;"} /></div></td>
                                    <td>{datas.email}</td>
                                    <td>{datas.displayName}</td>
                                    <td>{datas.country}</td>
                                    <td>{datas.city}</td>
                                    <td>{datas.state}</td>
                                    <td>{datas.postal}</td>

                                    <td>
                                        <span className='ico_delete'><button type="button" className="btn btn-danger" onClick={() => handleDelete(datas.id)}>Delete</button></span>
                                    </td>
                                </tr>

                            )
                        })}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUser