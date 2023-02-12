import React, { useEffect, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import AdminHeader from "../components/Header/AHeader";
import "./common.css";

const AdminOrder = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

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

    const handleMarkAsConfirmed = async (id) => {
        try {
            const orderData = await getDoc(doc(db, "Order", id));
            const orderDataObj = orderData.data();
            // console.log(orderDataObj.products);

            //loop through the products and update availableQuantity
            orderDataObj.products.forEach(async (product) => {
                const productData = await getDoc(
                    doc(db, "products", product.productId)
                );
                const productDataObj = productData.data();
                await updateDoc(doc(db, "products", product.productId), {
                    availableQuantity:
                        productDataObj.availableQuantity - product.quantity,
                });
            });

            await updateDoc(doc(db, "Order", id), {
                status: "confirmed",
            });
            toast.success("Successfully Item Update");

            // toast.success("Successfully Item Update");
        } catch (err) {
            console.log(err);
        }
    };

    const handleMarkAsShipped = async (id) => {
        try {
            await updateDoc(doc(db, "Order", id), {
                status: "shipped",
            });
            toast.success("Successfully Item Update");
        } catch (err) {
            console.log(err);
        }
    };

    const handleMarkAsDelivered = async (id) => {
        try {
            await updateDoc(doc(db, "Order", id), {
                status: "delivered",
            });
            toast.success("Successfully Item Update");
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            // await deleteDoc(doc(db, "Order", id));
            // setData(data.filter((item) => item.id !== id));
            toast.success("Successfully Item Delete");
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <div style={{ height: "100px" }}>
                    <AdminHeader category="Page" title="Order" />
                </div>
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
                        {data?.map((orderItem, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {orderItem.Email.length > 15 ? (
                                            <>
                                                <span>
                                                    {orderItem.Email.slice(
                                                        0,
                                                        15
                                                    )}
                                                </span>
                                                <br />{" "}
                                                <span>
                                                    {orderItem.Email.slice(15)}
                                                </span>
                                            </>
                                        ) : (
                                            orderItem.Email
                                        )}
                                    </td>
                                    <td>
                                        {orderItem.name.length > 15 ? (
                                            <>
                                                <span>
                                                    {orderItem.name.slice(
                                                        0,
                                                        15
                                                    )}
                                                </span>
                                                <br />{" "}
                                                <span>
                                                    {orderItem.name.slice(15)}
                                                </span>
                                            </>
                                        ) : (
                                            orderItem.name
                                        )}
                                    </td>
                                    <td>{orderItem.phone}</td>
                                    <td>
                                        Address:{" "}
                                        {orderItem.address.length > 15 ? (
                                            <>
                                                <span>
                                                    {orderItem.address.slice(
                                                        0,
                                                        15
                                                    )}
                                                </span>
                                                <br />{" "}
                                                <span>
                                                    {orderItem.address.slice(
                                                        15
                                                    )}
                                                </span>
                                            </>
                                        ) : (
                                            orderItem.address
                                        )}
                                        <br />
                                        City:{" "}
                                        {orderItem.city.length > 15 ? (
                                            <>
                                                <span>
                                                    {orderItem.city.slice(
                                                        0,
                                                        15
                                                    )}
                                                </span>
                                                <br />{" "}
                                                <span>
                                                    {orderItem.city.slice(15)}
                                                </span>
                                            </>
                                        ) : (
                                            orderItem.city
                                        )}
                                        <br />
                                        Postal Code:{" "}
                                        {orderItem.postal.length > 15 ? (
                                            <>
                                                <span>
                                                    {orderItem.postal.slice(
                                                        0,
                                                        15
                                                    )}
                                                </span>
                                                <br />{" "}
                                                <span>
                                                    {orderItem.postal.slice(15)}
                                                </span>
                                            </>
                                        ) : (
                                            orderItem.postal
                                        )}
                                    </td>
                                    <td>{orderItem.shipping}</td>
                                    <td
                                        style={{
                                            color: "#ed02c6",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {orderItem.subtotal} TK
                                    </td>
                                    <td>{orderItem.totalQuantity}</td>
                                    <td>
                                        {orderItem.Payment
                                            ? orderItem.Payment
                                            : "N/P"}
                                    </td>
                                    <td>
                                        {orderItem.Payment === "Cash" ? (
                                            <span>N/A</span>
                                        ) : (
                                            <span>
                                                {orderItem.transactionId}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {orderItem.status === "pending" ? (
                                            <span style={{ color: "blue" }}>
                                                Pending
                                            </span>
                                        ) : orderItem.status === "confirmed" ? (
                                            <span style={{ color: "green" }}>
                                                Confirmed
                                            </span>
                                        ) : orderItem.status === "shipped" ? (
                                            <span style={{ color: "red" }}>
                                                Shipped
                                            </span>
                                        ) : orderItem.status === "delivered" ? (
                                            <span style={{ color: "green" }}>
                                                Delivered
                                            </span>
                                        ) : (
                                            <span style={{ color: "red" }}>
                                                Unknown
                                            </span>
                                        )}
                                    </td>
                                    <td
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {orderItem.status === "pending" ? (
                                            <span className="ico_delete mb-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        handleMarkAsConfirmed(
                                                            orderItem.id
                                                        )
                                                    }
                                                >
                                                    Mark as Confirmed
                                                </button>
                                            </span>
                                        ) : orderItem.status === "confirmed" ? (
                                            <span className="ico_delete mb-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() =>
                                                        handleMarkAsShipped(
                                                            orderItem.id
                                                        )
                                                    }
                                                >
                                                    Mark as Shipped
                                                </button>
                                            </span>
                                        ) : orderItem.status === "shipped" ? (
                                            <span className="ico_delete mb-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={() =>
                                                        handleMarkAsDelivered(
                                                            orderItem.id
                                                        )
                                                    }
                                                >
                                                    Mark as Delivered
                                                </button>
                                            </span>
                                        ) : null}

                                        <span className="ico_delete mb-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setSelectedOrder(orderItem);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </span>
                                        <span className="ico_delete">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(orderItem.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {isModalOpen && (
                    <OrderDetailModel
                        handleClose={handleClose}
                        data={selectedOrder}
                    />
                )}
            </div>
        </>
    );
};

const OrderDetailModel = ({ handleClose, data }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                data.products.map((product) => {
                    const documentId = product.productId;
                    //set products to empty array
                    setProducts([]);

                    getProductsFromId(product.productId, product.quantity);
                });
                console.log(data.products);
            } catch (error) {
                setError(error);
            }
            // setLoading(false);
        };
        fetchProducts();
    }, []);

    // useEffect(() => {
    //     const unsub = onSnapshot(
    //         collection(db, "Order"),
    //         (snapShot) => {
    //             let list = [];
    //             snapShot.docs.forEach((doc) => {
    //                 list.push({ id: doc.id, ...doc.data() });
    //             });
    //             setData(list);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    //     return () => {
    //         unsub();
    //     };
    // }, []);
    const getProductsFromId = async (id, quantity) => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = { ...docSnap.data(), quantity: quantity };
            console.log("Document data:", data);
            setProducts((prev) => [...prev, data]);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    width: "70%",
                    // height: "80%",
                    padding: "20px",
                    overflow: "auto",
                }}
            >
                <div>
                    <h2>Order Details</h2>
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Order ID:{" "}
                                </span>
                                {data.id}
                            </h5>
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Order Status:{" "}
                                </span>
                                {data.status}
                            </h5>

                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Shipping:{" "}
                                </span>
                                {data.shipping}
                            </h5>
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Payment:{" "}
                                </span>
                                {data.Payment}
                            </h5>
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Transaction ID:{" "}
                                </span>
                                {data.transactionId
                                    ? data.transactionId
                                    : "N/A"}
                            </h5>
                        </div>
                        <div className="col-md-6">
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Customer Name:{" "}
                                </span>
                                {data.name}
                            </h5>
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Customer Email:{" "}
                                </span>
                                {data.Email}
                            </h5>
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Customer Phone:{" "}
                                </span>
                                {data.phone}
                            </h5>
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Customer Address:{" "}
                                </span>
                                {data.address}
                            </h5>

                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Customer City:{" "}
                                </span>
                                {data.city}
                            </h5>
                            <h5>
                                <span style={{ fontWeight: "bold" }}>
                                    Customer Postal Code:{" "}
                                </span>
                                {data.postal}
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Order Items</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product Price</th>
                                        <th>Product Quantity</th>
                                        <th>Product Total</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <div className="text-center">
                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="text-center">
                                        <h3 className="text-danger">{error}</h3>
                                    </div>
                                ) : (
                                    <tbody>
                                        {products.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.product}</td>
                                                    <td>{item.price} TK</td>
                                                    <td>{item.quantity}</td>
                                                    <td>
                                                        {parseFloat(
                                                            item.price
                                                        ) *
                                                            parseInt(
                                                                item.quantity
                                                            )}{" "}
                                                        TK
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-secondary" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default AdminOrder;
