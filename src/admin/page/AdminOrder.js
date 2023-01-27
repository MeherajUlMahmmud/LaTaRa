import React, { useEffect, useState } from 'react';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import AdminHeader from '../components/Header/AHeader'
import './common.css';

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

    const handleMarkAsConfirmed = async (id) => { };

    const handleMarkAsShipped = async (id) => { };

    const handleMarkAsDelivered = async (id) => { };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "Order", id));
            setData(data.filter((item) => item.id !== id));
            toast.success("Successfully Item Delete");
        } catch (err) {
            console.log(err);
        }
    };

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
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((datas, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{
                                        datas.Email.length > 15
                                            ? <><span>{datas.Email.slice(0, 15)}</span><br /> <span>{datas.Email.slice(15)}</span></>
                                            : datas.Email
                                    }</td>
                                    <td>{
                                        datas.name.length > 15
                                            ? <><span>{datas.name.slice(0, 15)}</span><br /> <span>{datas.name.slice(15)}</span></>
                                            : datas.name
                                    }</td>
                                    <td>{datas.phone}</td>
                                    <td>
                                        Address: {
                                            datas.address.length > 15
                                                ? <><span>{datas.address.slice(0, 15)}</span><br /> <span>{datas.address.slice(15)}</span></>
                                                : datas.address
                                        }
                                        <br />
                                        City: {
                                            datas.city.length > 15
                                                ? <><span>{datas.city.slice(0, 15)}</span><br /> <span>{datas.city.slice(15)}</span></>
                                                : datas.city
                                        }
                                        <br />
                                        Postal Code: {
                                            datas.postal.length > 15
                                                ? <><span>{datas.postal.slice(0, 15)}</span><br /> <span>{datas.postal.slice(15)}</span></>
                                                : datas.postal
                                        }
                                    </td>
                                    <td>{datas.shipping}</td>
                                    <td style={{ color: "#ed02c6", fontSize: "14px" }}>{datas.subtotal} TK</td>
                                    <td>{datas.totalQuantity}</td>
                                    <td>{datas.Payment ? datas.Payment : "N/P"}</td>
                                    <td>{datas.Payment === "Cash"
                                        ? <span>N/A</span>
                                        : <span>{datas.transactionId}</span>}
                                    </td>
                                    <td>{datas.status === "pending" ?
                                        <span style={{ color: "blue" }}>Pending</span>
                                        : datas.status === "confirmed"
                                            ? <span style={{ color: "green" }}>Confirmed</span>
                                            : datas.status === "shipped"
                                                ? <span style={{ color: "red" }}>Shipped</span>
                                                : datas.status === "delivered"
                                                    ? <span style={{ color: "green" }}>Delivered</span>
                                                    : <span style={{ color: "red" }}>Unknown</span>}
                                    </td>
                                    <td style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                        {datas.status === "pending" ?
                                            <span className='ico_delete mb-2'>
                                                <button type="button" className="btn btn-info" onClick={() => handleMarkAsConfirmed(datas.id)}>Mark as Confirmed</button>
                                            </span>
                                            : datas.status === "confirmed"
                                                ? <span className='ico_delete mb-2'>
                                                    <button type="button" className="btn btn-secondary" onClick={() => handleMarkAsShipped(datas.id)}>Mark as Shipped</button>
                                                </span>
                                                : datas.status === "shipped"
                                                    ? <span className='ico_delete mb-2'>
                                                        <button type="button" className="btn btn-success" onClick={() => handleMarkAsDelivered(datas.id)}>Mark as Delivered</button>
                                                    </span>
                                                    : null}

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