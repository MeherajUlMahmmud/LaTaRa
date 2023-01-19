import React,{useState} from 'react'
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'; 
import { useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 

import { toast } from 'react-toastify';
import { auth } from '../../firebase.config';

import '../styles/AdminLogin.css'; 

const AdminLogin = () => {

  const [email,setEmail]= useState(''); 
  const [password,setPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const signIn = async(e)=>{
    e.preventDefault(); 
    setLoading(true); 
    try{
      const userCredential = await signInWithEmailAndPassword(auth,email,password)

      const user = userCredential.user 
      console.log(user); 
      setLoading(false) 
      toast.success("Successfully Logged in "); 
      navigate('adminhome/products'); 
    }
    catch(error){
      setLoading(false); 
      toast.error(error.message); 
    }
  }
 
  return <Container>
    <div style={{marginTop:"100px"}}>
      <Row>
          {
            loading ? 
            <Col className='text-center' lg='12'>
              <h6 className='fw-bold'>Loading...</h6>
            </Col>
            : 
            <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Admin Login</h3>
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
            </Form>

          </Col>
          }
      </Row>
    </div>
       
      </Container>
}

export default AdminLogin