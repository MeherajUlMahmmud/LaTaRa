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
const Message = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "message"),
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
            await deleteDoc(doc(db, "message", id));
            setData(data.filter((item) => item.id !== id));
            toast.success("Successfully Item Delete");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div style={{ height: "100px" }}>
                <AdminHeader category="Page" title="Message" />
            </div>
            <div>
                <table className="table" style={{ textAlign: "center" }}>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Message</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((datas, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{datas.name}</td>
                                    <td>{datas.email}</td>
                                    <td>{datas.subject}</td>
                                    <td>{datas.message}</td>
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

export default Message;