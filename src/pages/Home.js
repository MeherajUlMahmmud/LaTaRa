import React, { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet';
import image from '../assets/home_image.png';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row, Col } from 'reactstrap';
import '../styles/home.css';
import Services from '../services/Services';
import ProductList from '../components/products/ProductList';
import {
  collection,
  onSnapshot
} from "firebase/firestore";
import { db } from '../firebase.config';

const Home = () => {
  const [data, setData] = useState([]);
  const [trending, setBestSales] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [modest, setModest] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
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
    const filteredProducts = data?.filter(
      (item) => item.category === "sharee"
    );
    const filteredbestSales = data?.filter(
      (item) => item.category === "gown"
    );
    const filteredModestDress = data?.filter(
      (item) => item.category === "modest"
    );
    const filteredUpcoming = data?.filter(
      (item) => item.category === "upcoming"
    );
    setBestSales(filteredProducts);
    setBestSalesProducts(filteredbestSales);
    setModest(filteredModestDress);
    setUpcoming(filteredUpcoming);
  }, [data])

  const year = new Date().getFullYear();

  return <Helmet title={"Home"}>
    <div style={{ background: "#F3F4FE78" }}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <p className='hero__subtitle'>Trending products in {year}</p>
                <br />
                <h2 >Give Your Fashion A New Style!</h2>
                <br />
                <p>Explore La Ta Ra Fashion and look through our page for a variety of Saree trends.
                  La Ta Ra fashion is the trendiest hand made saree brand from Bangladesh.
                  Our product line includes trendy jamdani saree, customize jamdani saree,
                  halfsilk saree, katan saree, cotton saree, silk sharee and more.</p><br />
                <Link to='/shop'>
                  <motion.button whileHover={{ scale: 1.1 }} className='shop_btn'>
                    SHOP NOW <i class="ri-arrow-right-line"></i>
                  </motion.button>
                </Link>
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={image} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className='trending__products'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Trending Sharee</h2>
              <br /><br /><br />
            </Col>
            {
              data?.length !== 0 ?
                <ProductList data={trending} />
                : " No Products Available "
            }
          </Row>
        </Container>
      </section>

      <section className='best__sales'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Gown</h2>
              <br /><br /><br />
            </Col>
            {
              data?.length !== 0 ?
                <ProductList data={bestSalesProducts} />
                : " No Products Available "
            }
          </Row>
        </Container>
      </section>

      <section className='best__sales'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Modest Dress</h2>
              <br /><br />
            </Col>
            {
              data?.length !== 0 ?
                <ProductList data={modest} />
                : " No Products Available "
            }
          </Row>

        </Container>
      </section>
      <section className='best__sales'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Upcoming Products...</h2>
              <br /><br />
            </Col>
            {
              data?.length !== 0 ?
                <ProductList data={upcoming} />
                : " No Products Available "
            }

          </Row>

        </Container>
      </section>
    </div>
  </Helmet>
}

export default Home