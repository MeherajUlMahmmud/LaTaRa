import React from 'react'
import AdminHeader from '../components/Header/AHeader'
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
const AdminOrder = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "Order"),
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
            await deleteDoc(doc(db, "Order", id));
            setData(data.filter((item) => item.id !== id));
            toast.success("Successfully Item Delete");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div style={{ height: "100px" }}>
                <AdminHeader category="Page" title="Order" />
            </div>
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Shipping</th>
                            <th scope="col">Total</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Condition</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((datas, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{datas.Email}</td>
                                    <td>{datas.name}</td>
                                    <td>{datas.phone}</td>
                                    <td>{datas.address},{datas.city},{datas.postal}</td>
                                    <td>{datas.shipping}</td>
                                    <td style={{ color: "#ed02c6", fontSize: "14px" }}>{datas.subtotal} TK</td>
                                    <td>{datas.totalQuantity}</td>
                                    <td>{datas.Payment ? datas.Payment : "N/P"}</td>
                                    <td>{(datas.Payment === "Cash") ?
                                        <span style={{ color: "blue" }}>Shipped</span>
                                        :
                                        (datas.Payment === "Bkash")
                                            ? <span style={{ color: "green" }}>Delivered</span>
                                            :
                                            <span style={{ color: "red" }}>Pending</span>}</td>
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

export default AdminOrder