import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';

const Signup = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/;
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [postal, setPostal] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // firebase  
  const signup = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("Username is required");
      return;
    } else if (!email) {
      toast.error("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Email is not valid. Must be @gmail.com or @yahoo.com or @hotmail.com");
      return;
    } else if (!password) {
      toast.error("Password is required");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("User : ", user);
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on((error) => {
        toast.error(error.message);
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {

              // update user profile 
              await updateProfile(user, {
                displayName: username,
                photoURL: downloadURL,
              });

              // store user data in firestore database 
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: username,
                email,
                photoURL: downloadURL,
                state: state,
                city: city,
                postal: postal,
                country: country,
              });
            });

        });
      setLoading(false);
      toast.success("Account Created");
      navigate('/login');
      console.log(user);
    }
    catch (error) {
      setLoading(false);
      toast.error('something went Wrong');
    }
  }

  return <Helmet title={"Signup"}>
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
                <p className="fw-bold fs-2">Create an Account</p>

                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Username"
                      value={username} onChange={e => setUserName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="email" placeholder="Enter your email"
                      value={email} onChange={e => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="password" placeholder="Enter your Password"
                      value={password} onChange={e => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="file"
                      onChange={e => setFile(e.target.files[0])}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Enter your Country"
                      value={country} onChange={e => setCountry(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Enter your City"
                      value={city} onChange={e => setCity(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Enter your Postal Code"
                      value={postal} onChange={e => setPostal(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Enter Your State"
                      value={state} onChange={e => setState(e.target.value)}
                    />
                  </FormGroup>

                  <button type="submit" className='buy__btn  login__btn w-100'>Create an Account</button>
                  <p>Already have an account? <Link to="/login">Signin</Link></p>
                  <div className='d-flex p-2' style={{ margin: "20px", justifyContent: "center" }}>
                    <GoogleButton />
                  </div>
                </Form>

              </Col>
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Signup