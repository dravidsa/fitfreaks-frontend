import React from "react";
import Layout from "../components/global/layout";
import { Accordion } from "react-bootstrap";
import SectionTitle from "../components/global/section-title";
import { IoIosArrowDown } from "react-icons/io";
import { CONTACT_FORM } from "../config";
import { API_URL } from "../config";

async function sendMail(event_name , enrollmentID , customer_name , event_catagory , email , subject , template , query ) {

  const mailData =  {
    enrollmentID : enrollmentID , 
    customer_name : customer_name , 
    event_name : event_name ,
    event_catagory : event_catagory , 
    email : email  , 
    subject : subject ,
    template: template , 
    query : query 
  
  }
  
  const data = await fetch("/api/sendMail", { method: "POST"  , 
  
    headers: {
      'Content-Type': 'application/text',
    },
    body: JSON.stringify(mailData )  ,
  }
    
    ).then((t) =>
      t.json()
    );
    
    //console.log( "JSON request is ",JSON.stringify(userData) )
  
  } 
  
  const handleSubmit  = async (data) => {
  console.log( "in submit data is " + JSON.stringify(data)) ; 
  }


const Contact = ({contactData}) => {
  const address = contactData.data.attributes.contact_address ; 
  const contact_number = contactData.data.attributes.contact_number ; 
  const contact_email = contactData.data.attributes.contact_email ; 
  const contact_name = contactData.data.attributes.contact_name ; 

  console.log( "address is " + JSON.stringify(contactData)  + "-"+ address)  ;
  console.log( "address is " + JSON.stringify(contactData)  + "-"+ address)  ;

  return (
    <Layout title="Contact">



      <div className="contact section-padding-b">
        <div
          className="contact-image"
          style={{ backgroundImage: "url(/images/contact.jpg)" }}
        >
          <div className="row">
            <div className="mx-auto text-center">
              <h2>Contact-Us</h2>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <p >Office Address: {address}</p>
              <p class="text-2xl">
                Contact Number : {contact_name},{contact_number}
              </p>
              <p>
                Email : {contact_email}
              </p>
             
              </div>
              
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <form  method="post" className="contact-form" onSubmit={handleSubmit}>
                <h3>Send us a message</h3>
                <p>
            
                </p>
                <div className="row my-3">
                  <div className="col-md-6 mb-3">
                    <input name="name" type="text" placeholder="Name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    {" "}
                    <input name="phone" type="text" placeholder="Phone" />
                  </div>
                  <div className="col-12 mb-3">
                    {" "}
                    <input name="email" type="email" placeholder="Email" />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      id=""
                      rows="5"
                      placeholder="Message"
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="button">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="faq section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <SectionTitle title="Frequently Asked Questions" />
              <Accordion
                className="accordion-flush faq-accordion"
                defaultActiveKey="0"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {" "}
                    <span>Why FitFreaks.in ? </span> <IoIosArrowDown />{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    Its a single platform for fitness enthusiasts , coaches , event planners and merchants so its one stop shop for fitness eco-system ? 
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {" "}
                    <span>How to publish my event on Fitfreaks.in ? </span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                    For now , please send all information about your event 1 month in advance and we will get it published on our site . You can use us for complete lifycle of the event or just for advertising , is upto you. 
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {" "}
                    <span>Do I need to pay the platform to publish my event/ Group ?</span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                   If your event if free , you dont need to pay . If your event is paid and if you want us to collect fee then we will charges 5% platform fees. 
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/contact-us`);
  const contactData = await res.json();
  console.log ( "got his contact data " + JSON.stringify(contactData));  

  return {
    props: { contactData },
    revalidate: 1,
  };
}

