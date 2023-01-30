import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/Common/CommonSection';

import '../styles/checkout.css';
import UseAuth from '../custom_user/UseAuth';

import { toast } from 'react-toastify';
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { cartActions } from '../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const Checkout = () => {

  const [shipping, setShipping] = useState('0');
  const [payment, setPayment] = useState('');
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const totalCost = Number(totalAmount + 60);
  const [checkout, setCheckout] = useState([]);
  const navigate = useNavigate();
  const user = UseAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate])

  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(cartActions.removeAllItem())
    console.log("Clear Cart ")
  }

  console.log("Payment is : ", payment);

  const ValidatePayment = (e) => {
    const pmt = e.target.value;

    console.log("Clicked")
    let checkboxes = document.getElementsByName("payment");
    let numberOfCheckedItems = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        numberOfCheckedItems++;
        setPayment(pmt);
      }
      if (numberOfCheckedItems > 1) {
        alert("You can Select Only One Payment Method !");
        // checkboxes = false; 
        checkboxes[i].checked = false;
        setPayment('')
      }

    }
  }
  const handleInput = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);

    const id = e.target.id;
    const value = e.target.value;

    setCheckout({ ...checkout, [id]: value });
  }

  const modify = { ...checkout, "totalQuantity": totalQty, "subtotal": shipping === '0' ? totalAmount : totalCost, "shipping": shipping ? "Yes" : "No", "Payment": payment, "name": user?.displayName, "Email": user?.email, "status": "pending" }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // store user data in firestore database 
      await addDoc(collection(db, "Order"), {
        ...modify,
        timeStamp: serverTimestamp(),
      });
      // await setDoc(doc(db,"Order",user.email),{
      //   ...modify,
      //   timeStamp: serverTimestamp(),

      // });
      toast.success('Order placed successfully!');
      navigate('/');
    }
    catch (error) {

      toast.error("Something was Wrong ", { error });
    }
    finally {
      removeItem();
    }
  }

  return <Helmet title={"Checkout"}>
    <CommonSection title={"Checkout"} />
    <section>
      <Container>
        <Form className='billing__form' onSubmit={handleSubmit}>
          <Row>
            <Col lg='8'>
              <h6>Billing Information</h6>

              <FormGroup className='form__group'>
                <input type="text" id="name" value={user?.displayName} disabled onChange={handleInput} required />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" id="email" placeholder='Enter your Email' value={user?.email} disabled />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="tel" id="phone" placeholder='Phone Number' onChange={handleInput}
                  pattern="[0-9]{11}"
                  required />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" id="address" placeholder='Street Address' onChange={handleInput} required />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='City' id="city" onChange={handleInput} required />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Postal Code' id="postal" onChange={handleInput} required />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Country' id="country" onChange={handleInput} required />
              </FormGroup>

            </Col>
            <Col lg='4'>
              <div className='checkout__cart'>
                <h6>Total Product : <span>{totalQty} items</span></h6>
                <h6>Subtotal : <span>{totalAmount}</span></h6>
                <h6>
                  <span>Shipping : <br />
                    <select className='mt-2 shipping' name='shipping' onChange={e => { setShipping(e.target.value) }}>
                      <option value='0'> 14 days Shipping</option>
                      <option value='60'> 7 days Shipping</option>
                    </select>
                  </span>

                  <span>Tk {shipping}</span>
                </h6>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <span>Payment Method:&nbsp;</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <input type="checkbox" name="payment" id="Cash" value="Cash" onClick={ValidatePayment} onChange={ValidatePayment} />&nbsp;Cash
                      </div>
                      <div>
                        <input type="checkbox" name="payment" id="Bkash" value="Bkash" onClick={ValidatePayment} onChange={ValidatePayment} />&nbsp;Bkash
                      </div>
                    </div>
                  </div>
                  <input type="text" id="transactionId" onChange={handleInput} style={{
                    display: payment === 'Bkash' ? 'block' : 'none',
                    width: '100%',
                    height: '40px',
                    marginTop: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    padding: '0 10px',
                    outline: 'none',
                  }} placeholder='Transaction ID' required={
                    payment === 'Bkash' ? true : false
                  } />
                </div>
                <h4>Total Cost :
                  {shipping === '0' ?
                    <span> TK {totalAmount}</span>
                    : <span> Tk {totalCost}  </span>
                  }
                </h4>



                <button className='buy__btn auth__btn w-100 mt-5' type="submit" >
                  Place an Order
                </button>

              </div>

            </Col>
          </Row>
        </Form>
      </Container>
    </section>


  </Helmet>
}

export default Checkout