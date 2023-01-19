import React,{useState,useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { GoogleButton } from 'react-google-button'; 
import UseAuth from '../custom_user/UseAuth';
import { 
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import '../styles/login.css'; 

const Login = () => {

  const [email,setEmail]= useState(''); 
  const [password,setPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 
  const user = UseAuth(); 

  const signIn = async(e)=>{
    e.preventDefault(); 
    setLoading(true); 
    try{
      const userCredential = await signInWithEmailAndPassword(auth,email,password)

      const user = userCredential.user 
      console.log(user); 
      setLoading(false) 
      toast.success("Successfully Logged in "); 
      navigate('/'); 
    }
    catch(error){
      setLoading(false); 
      toast.error(error.message); 
    }
  }
 
  const googleSignIn=()=>{
    const provider = new GoogleAuthProvider(); 
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, uid } = result.user.uid;
        navigate(
          "/",
          {
            replace: true,
            state: { uid, userName: displayName },
          }
        );
      })
      .catch(err => console.log(err));
   
  }
  const handleGoogleSignIn = async() =>{
    try{
      googleSignIn(); 
     
    
    }
    catch(error){
      console.log(error); 
      toast.error(error.message); 
    }
  }

  return <Helmet title={"Login"}>
    <section>
      <Container>
        <Row>
          {
            loading ? 
            <Col className='text-center' lg='12'>
              <h6 className='fw-bold'>Loading...</h6>
            </Col>
            : 
            <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Welcome to La Ta Ra</h3>
            <p className="fw-bold fs-2">Signin Your Account </p>

            <Form className="auth__form" onSubmit={signIn}>
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
              <FormGroup>
              <button type="submit" className='buy__btn  login__btn'>Login</button> 
              </FormGroup>

              <div className='d-flex p-2' style={{margin:"20px",justifyContent:"center"}}>
                <GoogleButton  onClick={handleGoogleSignIn}/>
              </div>
              
              
              <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
            </Form>

          </Col>
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Login