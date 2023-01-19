import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Link } from "react-router-dom"; 
import image from '../assets/final.jpg'; 
import '../styles/aboutus.css'; 

const Aboutus = () => {
  return <Helmet title={"AboutUs"}>
    <section className="about-section">
        <div className="container">
            <div className="row">                
                <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                    <div className="inner-column">
                        <div className="sec-title">
                            <span className="title">About La Ta Ra Fashion</span>
                            <h2>We Dreamed your Stylish Fashion </h2>
                        </div>
                        <div className="text">
                          <p>
                            Explore La Ta Ra Fashion and look through our page for a variety of Saree trends.
                            La Ta Ra fashion is the trendiest hand made saree brand from Bangladesh.
                            Our product line includes trendy jamdani saree, customize jamdani saree, 
                            halfsilk saree, katan saree, cotton saree.
                          </p>
                        </div>
                        <div className='text'>
                          <p>
                              Our journey has started just as a little Facebook page in 2019, 
                              in that time Facebook online shopping was not very popular concept here in Bangladesh.
                              We had to work very hard to get where we are now today. We had lots of ups and downs 
                              in this timeline of our business but now we have achieved Alhamdulillah and a lot more
                              to go.We can proudly say that it would have never been possible without our customer's 
                              appreciation and support, each and every customer who spent a penny in our products has
                              a great role in our success. LA TA RA has its unique ability to capture our customer's 
                              heart through our communication, presentation and unearthly beautiful collections. 
                              We always put our customer's choice first while choosing our products. 
                              We bring items focusing on our customer's preferences rather attracting customers for 
                              our products that is why we have become our customers first choice in case of online 
                              purchasing from Facebook in Bangladesh. And we have such good people working in our team 
                              who are more like a family to us than employees so that we are able to provide the best to
                              our customers. We not only sell women cloths here we also made a big community here where 
                              our customers come and enjoy. As we post regular updates of our collections on our page about
                              our collections, we come live on a regular basis our customers have become habituated to see 
                              our lives and our collections, they wait for us to come live, to show new collections, they comment
                              on our posts and lives, give reactions to the feedback who purchased from our lives. 
                              LA TA RA is not only a cloth selling page its a community of women in Bangladesh who love to wear
                              Sharee, see new collections, have ideas how to style and wear them, give feedback, see others 
                              feedback and interact with other people who buy from us. LA TA RA is most trustworthy, because 
                              we are giving our customers services that require no advance payment. We deliver our goods first 
                              then customers pay the prices. So that our customer doesn’t have to worry about paying in advance or 
                              getting a false product afterwards, that is why our services got huge popularity in our community.
                             
                          </p>
                        </div>
                      
                        <div className="btn-box">
                            <Link to="/contactus" class="theme-btn btn-style-one">Contact Us</Link>
                        </div>
                    </div>
                </div>

                {/* Image Column  */}
                <div className="image-column col-lg-6 col-md-12 col-sm-12">
                    <div className="inner-column wow fadeInLeft">
                      <div className="author-desc">
                        <h2>LA TA RA Fashion</h2>
                        <span>Style your Dream</span>
                      </div>
                        <figure className="image-1">
                          <Link to="/"  className="lightbox-image" data-fancybox="images">
                            <img title="La Ta Ra " src={image} alt="" />
                          </Link>
                        </figure>
                      
                     
                    </div>
                </div>
              
            </div>
           <div className="sec-title">
                <span class="title">Our Future Goal</span>
                <h2>We want to lead in innovation in Modern Fashion</h2>
            </div>
            <div className="text">
                LA TA RA is open to all new ideas and constructive criticism but we never allow any hate speech or 
                false allegations against anyone in our community. We share a ton of feedback of our products and these 
                feedback speaks volume about our products, quality and services.
                We never needed to say much about ourselves, our customer's feedback says it all.
            </div>
            <div className='text'>
              <h3>In the end, I would say keep visiting our website and enjoy the quality content.</h3>
            </div>
        </div>
    </section>
  </Helmet>
}

export default Aboutus