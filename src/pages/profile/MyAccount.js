import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux"; 
import UseAuth from '../../custom_user/UseAuth';
import { db } from '../../firebase.config';
import { 
    collection,
    onSnapshot,
    deleteDoc,
    doc
  } from "firebase/firestore"; 
import { toast } from 'react-toastify';


const MyAccount = () => {
    const totalQuantity = useSelector(state=>state.cart.totalQuantity)
    const user = UseAuth(); 
    const [orderdata,setOrder] = useState([]); 
    const [data,setData] = useState(); 
    
    useEffect(()=>{
        const unsub = onSnapshot(
          collection(db,"Order"), 
            (snapShot) =>{
                let list = []; 
                snapShot.docs.forEach((doc)=>{
                    list.push({id:doc.id, ...doc.data() }); 
                });
                setData(list); 
            }, 
            (error)=>{
                console.log(error); 
            }
          );  
        return ()=>{
          unsub(); 
        };  

      },[]);

      useEffect(()=>{
        const name = user.displayName
        const filterOrder = data?.filter(
            (item)=>item.name === name
        );
        setOrder(filterOrder); 

      },[data])
    
      console.log("Order is===>  : ",orderdata); 

    const handleDelete = async (id) => {
        try{
            await deleteDoc(doc(db,"Order",id)); 
            setData(data.filter((item)=>item.id !== id)); 
           
        }catch(err){
            console.log(err); 
        }
        finally{
            toast.error("Successfully Cancel Order"); 
        }
    }
  return <div class="col-lg-9 my-lg-0 my-1">
        <div id="main-content" class="bg-white border">
            <div class="d-flex flex-column">
                <div class="h5">Hello {user.displayName},</div>
                <div>Logged in as: {user.email} </div>
            </div>
            <div class="d-flex my-4 flex-wrap">
                <div class="box me-4 my-1 bg-light">
                    <img src="https://www.freepnglogos.com/uploads/box-png/cardboard-box-brown-vector-graphic-pixabay-2.png"
                        alt=""/>
                    <div class="d-flex align-items-center mt-2">
                        <div style={{paddingRight:"10px"}}class="tag">Orders placed &nbsp;</div>
                        <div class="ms-auto number"> {orderdata?.length} </div>
                    </div>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="box me-4 my-1 bg-light">
                    <img src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-campus-recreation-university-nebraska-lincoln-30.png"
                        alt=""/>
                    <div class="d-flex align-items-center mt-2">
                        <div style={{paddingRight:"10px"}} class="tag">Items in Cart</div>
                        <div class="ms-auto number">{totalQuantity}</div>
                    </div>
                </div>
                
            </div>
            <div class="text-uppercase">My recent orders</div>
            {
                orderdata?.map((item,id)=>(
                    <div class="order my-3 bg-light" key={id}>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="d-flex flex-column justify-content-between order-summary">
                                    <div class="d-flex align-items-center">
                                        <div class="text-uppercase">Order #{item.id} </div> &nbsp;
                                        <div class="blue-label ms-auto text-uppercase">{(item.Payment === "Bkash") ? "Paid" : (item.Payment === "Cash") ? "COD" : "UnPaid"}</div>
                                    </div>
                                    <div class="fs-8">Products Quantity # <b>{item.totalQuantity}</b></div>
                                    <div class="fs-8">Date : {item.timeStamp?.toDate().toDateString()} 
                                    <br/>Time : {item.timeStamp?.toDate().toLocaleTimeString()} <br/>
                                    </div>
                                    <div class="rating d-flex align-items-center pt-1">
                                        <img src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png"
                                        alt=""/>&nbsp;&nbsp;
                                        <h5>Total Amount : Tk {item.subtotal} </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="d-sm-flex align-items-sm-start justify-content-sm-between">
                                    <div class="status">Status : {(item.Payment === "Bkash") ? "Delivered" : (item.Payment === "Cash") ? "Shipped" : "Pending"}</div>
                                   
                                </div>
                                <div style={{width:"100%",background:"black",height:"1px",margin:"5px"}}></div>
                                <button class="btn btn-primary text-uppercase" style={{marginLeft:"10px",float:"right"}} onClick={()=>handleDelete(item.id)}>Cancel Order</button>
                               
                            </div>
                        </div>
                    </div>

                ))
            }
        </div>
    </div>
       
}

export default MyAccount