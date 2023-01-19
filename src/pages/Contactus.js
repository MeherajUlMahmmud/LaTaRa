import React,{useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import '../styles/contact_us.css'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import {
  collection, 
  addDoc ,
  serverTimestamp,
} from 'firebase/firestore'; 
import { db } from '../firebase.config'; 

const Contactus = () => {
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      // store user data in firestore database 
      await addDoc(collection(db,"message"),{
          ...data,
          timeStamp: serverTimestamp(),
      });         
      toast.success('Message Sent Successfully!'); 
      navigate('/home');
  }
  catch(error){
      toast.error('something went Wrong'); 
  }
  };


  const handleInputChange =(e)=>{
    console.log(e.target.id); 
    console.log(e.target.value); 

    const id = e.target.id; 
    const value = e.target.value; 

    setData({ ...data , [id]: value });   
    
}

  return <Helmet title={"ContactUs"}>

      <section className="contact__section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="wrapper">
              <div className="row no-gutters">
                <div className="col-md-6">
                  <div className="contact__wrap w-100 p-lg-5 p-4">
                    <h3 className="mb-4">Send us a message</h3>

                    <div className='col-md-12'>
                    <form
                      id="contactForm"
                      className="contactForm"
                      onSubmit={handleSubmit}
                    >
                   
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              id="name"
                              placeholder="Name"
                              onChange={handleInputChange}
                              className="input_box"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="email"
                              id="email"
                              placeholder="Email"
                              onChange={handleInputChange}
                              className="input_box"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              id="subject"
                              placeholder="Subject"
                              onChange={handleInputChange}
                              className="input_box"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form__group">
                            <textarea
                              type="text"
                              id="message"
                              placeholder="Message"
                              cols="30"
                              rows="6"
                              onChange={handleInputChange}
                             
                              className="input_box"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group" style={{textAlign:"center"}}>
                            <input
                              type="submit"
                              value="Send Message"
                              className="btn btn-primary"
                            />
                          </div>
                        </div>
                  
                    </form>
                    </div>

                  </div>
                    
                </div>
                <div className="col-md-6 d-flex align-items-stretch">
                  <div className="info-wrap w-100 p-lg-5 p-4 img" >
                    <h3>Contact us</h3>
                    <p className="mb-4">
                      We're open for any suggestion or you can also give your feedback.
                    </p>
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Address:</span> Basabo,Dhaka - Bangladesh
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Phone:</span>
                          <a href="tel://123456789">+88019-99999933</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Email:</span>
                          <a href="mailto:info@yoursite.com">
                            info@yoursite.com
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Website: Example@gmail.com</span>
                           
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </Helmet>
}

export default Contactus