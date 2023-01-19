import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'; 
import { Link,useParams } from 'react-router-dom'; 
import './addproducts.css'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

import { ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'; 
import { storage } from '../../firebase.config'; 
import {
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore'; 
import { db } from '../../firebase.config'; 
import AdminHeader from '../components/Header/AHeader';


const EditProducts = () => {

  const [data,setData]= useState([]); 
  const [product,setProduct] = useState([]); 
  const [fileUrl,setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 
  const {id} = useParams(); 

  console.log('data', data)
  
  useEffect(()=>{
    async function getProduct(){

        const docRef = doc(db,"products", id); 
        try{
            const docSnap = await getDoc(docRef);
            let list = []; 
            list.push({...docSnap.data()}) 
            setProduct(list);
           
        }
        catch(error){
            console.log(error); 
        }

    }
    getProduct();    
},[id]);
    
    const handleImage=async (e)=>{
        const file = e.target.files[0]; 
        const name = new Date().getTime() + file.name ; 
         const storageRef = ref(storage,`products_images/${name}`); 
         const uploadTask = uploadBytesResumable(storageRef,file); 
         uploadTask.on("state_changed", (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
            setLoading(progress); 
            switch(snapshot.state){
                case "paused": 
                    console.log("Upload is Pause"); 
                    break; 
                case "running": 
                    console.log("Upload is Running"); 
                    break; 
                default: 
                    break; 
            }
         },(error)=>{
            console.log('error', error)
         }, 
         ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setFileUrl(downloadURL); 
            })
         }
         )
    }
    const handleInput =(e)=>{
        console.log(e.target.id); 
        console.log(e.target.value); 

        const id = e.target.id; 
        const value = e.target.value; 

        setData({ ...data , [id]: value });   
        
    }
    const modify = {...data,"imgUrl": fileUrl}
    console.log('modify Data is ', modify)

    const handleUpdate = async (e)=>{
        e.preventDefault();
        try{
          const updatedata = doc(db,"products",id)
          updateDoc(updatedata,{
              ...modify,
          });
          toast.success('Products Update Successfully!'); 
       
            // store user data in firestore database 
            // await addDoc(collection(db,"products"),{
            //     ...modify,
            //     timeStamp: serverTimestamp(),
            // });
            // setLoading(false);            
            navigate(-1);
        }
        catch(error){
            setLoading(false); 
            toast.error('something went Wrong'); 
        }
    }

  return <div>
     <div style={{height:""}}>
            <AdminHeader category="Page" title="Edit Products" />  
        </div>
    <section>
      <Container>
        <Row>
          {/* {
            loading ? 
            <Col className='text-center' lg='12'>
              <h6 className='fw-bold'>Loading...</h6>
            </Col>
            :  */}
            <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Edit Products</h3>

            <Form className="auth__form" onSubmit={handleUpdate}>
              {product?.map((item,index)=>( 
              
              <div key={index}>
                <FormGroup className="form__group">
                    <input type="text" placeholder ="productName" 
                    id="product" onChange={handleInput}
                    defaultValue={item.product}
                    required
                    />
                </FormGroup>

                <FormGroup className="form__group category">
                  <label>Select Category : </label> &nbsp;
                  <select id="category" onChange={handleInput} required>
                    <option defaultValue>{item.category}</option>
                      <option value="sharee">Sharee</option>
                      <option value="gown">Grown</option>
                      <option value="upcoming">Upcoming</option> 
                      <option value="modest">Modest</option>
                  </select>
                    
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="number" placeholder ="Price" 
                    id="price" onChange={handleInput}
                    defaultValue={item.price}
                    required
                    />
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder ="Short-Description " 
                    id="shortDesc" onChange={handleInput}
                    defaultValue={item.shortDesc}
                    required
                    />
                </FormGroup>
                <FormGroup className="form__group">
                  <textarea 
                  id="description" placeholder ="Description" onChange={handleInput}
                  rows="5" 
                  defaultValue={item.description}
                 />
                    {/* <input type="text" placeholder ="Description" 
                    value={product} onChange={e=>setUserName(e.target.value)}
                    /> */}
                </FormGroup>

              
                <FormGroup className="form__group">
                  <span style={{width:"100px",height:"100px",marginLeft:"50px",marginBottom:"50px",marginTop:"50px",borderRadius:"35px"}}> <img src={item?.imgUrl} alt=""/></span>
                  <input type="file"
                  onChange={handleImage}
                  // defaultValue={<img src={product.imgUrl} alt=""/>}
                
                  />
                </FormGroup>

                <button type="submit" className='buy__btn  login__btn w-50'>Update Products</button> 
              </div>
              
              ))}
            </Form>

          </Col>
          {/* } */}
        </Row>
      </Container>
    </section>
  </div>
}

export default EditProducts