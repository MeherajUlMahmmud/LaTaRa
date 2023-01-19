import React,{useState,useEffect} from 'react'
import './address.css'; 
import { db } from '../../firebase.config';
import { 
    collection,
    onSnapshot,
  } from "firebase/firestore"; 
import { toast } from 'react-toastify';
const MyAddress = () => {
    const {data,setData} = useState([]);
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

  return <div className="col-lg-9 my-lg-0 my-1">
    <div className="row mt-3 mx-3" style={{marginTop:"25px"}}>
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
                

                <form className="mb-0">

                <div className="row mb-4">
                    <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form9Example1" className="form-control input-custom" value={data?.country}/>
                        <label className="form-label" for="form9Example1">Country</label>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form9Example2" className="form-control input-custom" />
                        <label className="form-label" for="form9Example2">Last name</label>
                    </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form9Example3" className="form-control input-custom" />
                        <label className="form-label" for="form9Example3">City</label>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form9Example4" className="form-control input-custom" />
                        <label className="form-label" for="form9Example4">Zip</label>
                    </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form9Example6" className="form-control input-custom" />
                        <label className="form-label" for="form9Example6">Address</label>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-outline">
                        <input type="email" id="typeEmail" className="form-control input-custom" />
                        <label className="form-label" for="typeEmail">Email</label>
                    </div>
                    </div>
                </div>

                <div className="float-end ">
                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-rounded"
                    style={{backgroundColor: "#0062CC"}}>Place order</button>
                </div>

                </form>
            </div>
            </div>
        </div>
    </div>
</div>
}

export default MyAddress