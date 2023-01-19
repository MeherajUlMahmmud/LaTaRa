import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
// import products from '../../assets/data/Product'; 
import { motion } from "framer-motion";
import Helmet from '../Helmet/Helmet';
import CommonSection from '../Common/CommonSection';
import '../../styles/productdetails.css';
import { useNavigate } from 'react-router-dom';
// import ProductsList from './ProductList'; 
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import useAuth from "../../custom_user/UseAuth";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  awaitDoc
} from "firebase/firestore";
import { db } from '../../firebase.config';


const ProductDetails = () => {
  const { id } = useParams()
  const currentUser = useAuth();

  const [data, setData] = useState([]);
  const [getProduct, setProducts] = useState([]);
  console.log('getProduct', getProduct)
  const [tab, setTab] = useState('desc');
  const [rating, setRating] = useState(null);
  console.log("Rating is :", rating);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [review, setReview] = useState([]);


  // const products = data?.find(item=>item.id === id);
  const {
    imgUrl,
    product,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = getProduct;

  // const relatedProducts = data?.filter((item)=> item.category === category); 

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log("List are ", list)
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {

      const docRef = doc(db, "products", id);
      try {
        const docSnap = await getDoc(docRef);
        let list = [];
        list.push({ ...docSnap.data() })
        setProducts(list);
      }
      catch (error) {
        console.log(error);
      }

    }
    getProducts();
  }, [id]);

  const handleInput = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);

    const id = e.target.id;
    const value = e.target.value;

    setReview({ ...review, [id]: value });
  }

  const modify = { ...review, "rating": rating }

  console.log("Modify Data is : ", modify);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // store user data in firestore database 
      // await addDoc(collection(db,"products"),{
      //     ...modify,
      //     timeStamp: serverTimestamp(),
      // });
      const generalRef = collection(db, `products/${currentUser.displayName}/reviews`);
      const reviews = await addDoc(generalRef, {
        ...modify,
        timeStamp: serverTimestamp(),
      });

      toast.success('Thanks for giving us the review!');
      navigate(`{/shop/${id}}`);
    }
    catch (error) {

      toast.error("Something is Wrong ", { error });
    }
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      imgUrl: imgUrl,
      product,
      price,
    }));
    toast.success('Product added Successfully!');
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [getProduct])

  return <Helmet title={product}>
    <CommonSection title={product} />
    {
      getProduct?.map((item, index) => (
        <>
          <section className='pt-0' key={index}>
            <Container>

              <Row>
                <Col lg='6'>
                  <img src={item.imgUrl} alt="" style={{ height: "450px", width: "450px", borderRadius: "15px" }} />
                </Col>
                <Col lg='6'>
                  <div className='product__details'>
                    <h2>{item.product}</h2>
                    <div className='product__rating d-flex align-items-center gap-5 mb-3'>
                      <div>
                        <span><i class="ri-star-s-fill"></i></span>
                        <span><i class="ri-star-s-fill"></i></span>
                        <span><i class="ri-star-s-fill"></i></span>
                        <span><i class="ri-star-s-fill"></i></span>
                        <span><i class="ri-star-half-s-line"></i></span>
                      </div>&nbsp;
                      <p>(<span>{item.avgRating}</span> &nbsp;ratings)</p>
                    </div>
                  </div>
                  <div className="">
                    <span className='product__price'>Tk {item.price}</span> &nbsp;&nbsp; &nbsp;
                    <span style={{
                      textTransform: 'capitalize'
                    }}>Category: {item.category}</span>

                  </div>
                  <p className='mt-3'>{item.shortDesc}</p>
                  <motion.button whileTap={{ scale: 1.2 }} className='buy__btn' onClick={addToCart}>Add To Cart</motion.button>
                </Col>
              </Row>
            </Container>
          </section>

          <section>
            <Container>
              <Row>
                <Col lg='12'>
                  <div className='tab__wrapper d-flex align-items-center gap-5 .px-2'>
                    <h6 className={`${tab === 'desc' ? 'active__tab' : ""}`}
                      onClick={() => setTab('desc')}
                    >Description</h6>
                    <h6 className={`${tab === 'rev' ? 'active__tab' : ""}`}
                      onClick={() => setTab('rev')}
                    >Reviews ({reviews})</h6>
                  </div>
                  {
                    tab === 'desc' ?
                      <div className='tab__content mt-5'>
                        <p>{item.description}</p>
                      </div>
                      :
                      <div className='product__review mt-5'>
                        <div className='review__wrapper'>
                          <ul>


                            <li key={index} className='mb-4'>
                              <h6>{currentUser ? currentUser.displayName : "User"}</h6>
                              <span>{item.rating} (rating) </span>
                              <p>{item.text}</p>
                            </li>


                          </ul>
                          <div className='review__form'>
                            <h4>Leave Your Experience </h4>
                            <form action="" onSubmit={handleSubmit}>
                              <div className='form__group'>
                                <input type="text" id="name" placeholder='Enter Name' required
                                  onChange={handleInput} />
                              </div>
                              <div className="form__group d-flex align-items-center ">
                                <motion.span whileTap={{ scale: 1.3 }}>
                                  <input type="radio" id="1" onChange={(e) => { setRating(e.target.id) }} />1<i class="ri-star-s-fill"></i>
                                </motion.span>&nbsp;&nbsp;
                                <motion.span whileTap={{ scale: 1.3 }}><input type="radio" id="2" onChange={(e) => { setRating(e.target.id) }} />2<i class="ri-star-s-fill"></i></motion.span>&nbsp;&nbsp;
                                <motion.span whileTap={{ scale: 1.3 }}><input type="radio" id="3" onChange={(e) => { setRating(e.target.id) }} />3<i class="ri-star-s-fill"></i></motion.span>&nbsp;&nbsp;
                                <motion.span whileTap={{ scale: 1.3 }}><input type="radio" id="4" onChange={(e) => { setRating(e.target.id) }} />4<i class="ri-star-s-fill"></i></motion.span>&nbsp;&nbsp;
                                <motion.span whileTap={{ scale: 1.3 }}> <input type="radio" id="5" onChange={(e) => { setRating(e.target.id) }} />5<i class="ri-star-s-fill"></i></motion.span>&nbsp;&nbsp;
                              </div>
                              <div className='form__group'>
                                <textarea id="message"
                                  onChange={handleInput}
                                  rows={4} placeholder='Review Message...' required />
                              </div>
                              <motion.button whileTap={{ scale: 1.2 }} className='buy__btn' type='submit'>Submit</motion.button>
                            </form>
                          </div>
                        </div>
                      </div>
                  }


                </Col>
                <Col lg='12' className='mt-5'>
                  <h2 className="related__title">You might also like our other products as well. Keep visiting us.</h2>
                </Col>
                {/* <ProductsList data={relatedProducts}/>  */}
              </Row>
            </Container>
          </section>
        </>
      ))
    }


  </Helmet>
}

export default ProductDetails