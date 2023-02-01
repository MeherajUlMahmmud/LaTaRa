import React, { useState } from 'react'
import CommonSection from '../../components/Common/CommonSection';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import './addproducts.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase.config';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import AdminHeader from '../components/Header/AHeader';


const AddProducts = () => {

  const [data, setData] = useState({});
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('data', data)


  const handleImage = async (e) => {
    const file = e.target.files[0];
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, `products_images/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setLoading(progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is Pause");
          break;
        case "running":
          console.log("Upload is Running");
          break;
        default:
          break;
      }
    }, (error) => {
      console.log('error', error)
    },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
        })
      }
    )
  }
  const handleInput = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);

    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });

  }
  const modify = { ...data, "imgUrl": fileUrl }
  console.log('modify Data is ', modify)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // store user data in firestore database 
      await addDoc(collection(db, "products"), {
        ...modify,
        timeStamp: serverTimestamp(),
      });
      setLoading(false);
      toast.success('Products add Successfully!');
      navigate(-1);
    }
    catch (error) {
      setLoading(false);
      toast.error('something went Wrong');
    }
  }

  return <div>
    <div style={{ height: "" }}>
      <AdminHeader category="Page" title="Add Products" />
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
            <h3 className="fw-bold mb-4">Add Products</h3>

            <Form className="auth__form" onSubmit={handleSubmit}>
              <FormGroup className="form__group">
                <input type="text" placeholder="productName"
                  id="product" onChange={handleInput}
                  required
                />
              </FormGroup>

              <FormGroup className="form__group category">
                <label>Select Category : </label> &nbsp;
                <select id="category" onChange={handleInput} required>
                  <option value="sharee">Sharee</option>
                  <option value="gown">Gown</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="modest">Modest</option>
                </select>

              </FormGroup>

              <FormGroup className="form__group">
                <input type="number" placeholder="Price"
                  id="price" onChange={handleInput}
                  min="1"
                  required
                />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="number" placeholder="Available Quantity"
                  id="availableQuantity" onChange={handleInput}
                  min="1"
                  required
                />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="text" placeholder="Short-Description "
                  id="shortDesc" onChange={handleInput}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <textarea
                  id="description" placeholder="Description" onChange={handleInput}
                  rows="5" required />
                {/* <input type="text" placeholder ="Description" 
                  value={product} onChange={e=>setUserName(e.target.value)}
                  /> */}
              </FormGroup>


              <FormGroup className="form__group">
                <input type="file"
                  onChange={handleImage}
                  required
                />
              </FormGroup>

              <button type="submit" className='buy__btn  login__btn w-50'>Add Products</button>
            </Form>

          </Col>
          {/* } */}
        </Row>
      </Container>
    </section>
  </div>
}

export default AddProducts