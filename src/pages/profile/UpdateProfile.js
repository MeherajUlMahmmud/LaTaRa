import React,{useState} from 'react'
import Helmet from '../../components/Helmet/Helmet';
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'; 

import '../../styles/login.css'; 
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from '../../firebase.config';
import { ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'; 
import { storage } from '../../firebase.config';
import {setDoc,doc} from 'firebase/firestore'; 
import { db } from '../../firebase.config';
import { useNavigate } from 'react-router-dom'; 


const UpdateProfile = () => {
  const [username,setUserName]= useState(''); 
  const [email,setEmail]= useState(''); 
  const [password,setPassword] = useState(''); 
  const [file,setFile] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  // firebase  
  const signup = async(e)=>{
    e.preventDefault(); 
    setLoading(true); 
    try{
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("User : ", user); 
      const storageRef = ref(storage,`images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file); 
      
      uploadTask.on((error)=>{
        toast.error(error.message); 
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          async(downloadURL)=>{

          // update user profile 
          await updateProfile(user,{
            displayName: username, 
            photoURL: downloadURL,
          });

          // store user data in firestore database 
          await setDoc(doc(db,"users",user.uid),{
            uid: user.uid, 
            displayName: username, 
            email, 
            photoURL: downloadURL, 
        });
        });
        
      });
      setLoading(false); 
      toast.success("Account Created"); 
      navigate('/login'); 
      console.log(user); 
    }
    catch(error){
      setLoading(false); 
      toast.error('something went Wrong'); 
    }
  }

  return <div class="col-lg-9 my-lg-0 my-1" style={{marginLeft:"-30px"}}>
      <Container>
        <Row>
         {
          loading ? 
          <Col className='text-center' lg='12'>
            <h6 className='fw-bold'>Loading...</h6>
          </Col>
          :
          <Col lg="6" className="m-auto text-center">
            <p className="fw-bold fs-2">Update Profile</p>

            <Form className="auth__form" onSubmit={signup}>
              <FormGroup className="form__group">
                  <input type="text" placeholder ="Username" 
                  value={username} onChange={e=>setUserName(e.target.value)}
                  />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="email" placeholder ="Enter your email" 
                value={email} onChange={e=>setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="password" placeholder ="Enter your Password"
                value={password} onChange={e=>setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="file"
                onChange={e=>setFile(e.target.files[0])}
                />
              </FormGroup>

              <button type="submit" className='buy__btn  login__btn w-100'>Update</button> 
            </Form>
          </Col>
         }
        </Row>
      </Container>
  </div>
}

export default UpdateProfile