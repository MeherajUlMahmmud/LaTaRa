import React, { useState, useEffect } from 'react'
import CommonSection from '../components/Common/CommonSection';
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import ProductsLists from '../components/products/ProductList';
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from '../firebase.config';


const Shop = () => {
  const [productsData, setProductsData] = useState([]);

  const [data, setData] = useState([]);

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

  const handleFilter = (e) => {
    const filterValue = e.target.value
    if (filterValue === 'sharee') {
      const filteredProducts = data?.filter(
        (item) => item.category === 'sharee'
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === 'modest') {
      const filteredProducts = data?.filter(
        (item) => item.category === 'modest'
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === 'gown') {
      const filteredProducts = data?.filter(
        (item) => item.category === 'gown'
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === 'upcoming') {
      const filteredProducts = data?.filter(
        (item) => item.category === 'upcoming'
      );
      setProductsData(filteredProducts);
    }
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = data?.filter(item => item.product.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }

  return <Helmet title={"Shop"}>
    <CommonSection title={'Products'} />

    <section>
      <Container>
        <Row>
          <Col lg="3" md="6" >
            <div className='filter__widget'>
              <select onChange={handleFilter}>
                <option >Filter by Category </option>

                <option value="sharee">sharee</option>
                <option value="gown">Gown</option>
                <option value="modest">Modest Dress </option>
                <option value="upcoming">upcoming..</option>
              </select>
            </div>
          </Col>
          <Col lg="3" md="6"  >
            <div className='filter__widget'>
              <select>
                <option>Sort By</option>

                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </Col>
          <Col lg='6' md='12'>
            <div className='search__box'>
              <input type='text' placeholder="Search here..." onChange={handleSearch} />
              <span><i className="ri-search-line"></i></span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section className='pt-0'>
      {
        productsData.length === 0 ?
          <Container>
            <Row>
              <ProductsLists data={data} />
            </Row>
          </Container>
          :
          <Container>
            <Row>
              <ProductsLists data={productsData} />
            </Row>
          </Container>

      }


    </section>
  </Helmet>
}

export default Shop