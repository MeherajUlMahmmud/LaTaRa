import React,{useState,useEffect} from 'react'
import './address.css'; 
import { db } from '../../firebase.config';
import { 
    collection,
    onSnapshot,
  } from "firebase/firestore"; 
  import UseAuth from '../../custom_user/UseAuth';

const MyAddress = () => {
    const [data,setData] = useState();
    const [address,setAddress] = useState(); 
    
    const user = UseAuth(); 
    const uid = user.uid; 

    useEffect(()=>{
        const unsub = onSnapshot(
          collection(db,"users"), 
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
        
        console.log("Id is : ", uid); 
        const filterOrder = data?.filter(
            (item)=>item.uid === uid
        );
        setAddress(filterOrder); 

      },[data,uid])
      console.log("Data is : ",data); 
      console.log("Address is : ",address); 

  return <div className="col-lg-9 my-lg-0 my-1">
    <div className="row mt-3 mx-3" style={{}}>
        <div className="col-md-3">
            <div style={{marginTop: "50px", marginLeft: "10px",}} className="text-center">
                <span style={{fontSize:"80px",color:"blue"}}><i id="animationDemo" data-mdb-animation="slide-right" data-mdb-toggle="animation"
                    data-mdb-animation-reset="true" data-mdb-animation-start="onScroll"
                    data-mdb-animation-on-scroll="repeat" class="ri-truck-line "></i>
                </span> 
                <h3 className="mt-3 text-blue">My Address</h3>
            </div>
        </div>
        <div className="col-md-9 justify-content-center">
            <div className="card card-custom pb-4">
            <div className="card-body mt-0 mx-5">
                

            { address?.map((item,id)=>(
                <div style={{height:"250px"}}>
          
                    <div className="row mb-4" key={id}>
                        <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form9Example1">Country : <h4>{item?.country}</h4></label>
                        </div>
                        </div>
                        <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form9Example2">City : <h4>{item?.city}</h4></label>
                        </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form9Example3">State : <h4>{item?.state}</h4></label>
                        </div>
                        </div>
                        <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form9Example4">Postal Code: <h4>{item?.postal}</h4></label>
                        </div>
                        </div>
                    </div>
                </div>
                
            ))}
               
            </div>
            </div>
        </div>
    </div>
</div>
}

export default MyAddress