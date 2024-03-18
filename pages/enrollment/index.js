import React from 'react'
import Layout from "../../components/global/layout";
import { Accordion } from "react-bootstrap";
import SectionTitle from "../../components/global/section-title";
import { IoIosArrowDown } from "react-icons/io";
import RegisterForm from "./RegisterForm.js"
import { useSearchParams } from 'next/navigation'
import { useState, useEffect} from "react" ;
import { API_URL } from "../../config";
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Attendee_Catagories from '../../components/Attendee_catagories';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


async function getEvent(event_id) { 
  console.log( "calling get event for event_id " + event_id  ); 
  const EVENT_URL = API_URL+"/api/events/"+event_id+"?populate=*";
 // const EVENT_URL = process.env.NEXT_PUBLIC_EVENT_URL + "/"+ event_id  + "?populate=*" ; 
  //const URL = `http://localhost:1337/api/events/${event_id}?populate=*` ; 
  console.log ( "new event URL is " + EVENT_URL ); 
  const res =  await fetch ( EVENT_URL) ; 
  //const res = await fetch ( `https://localhost:1337/api/mentor/${mentorId}?api_key=${process.env.API_KEY}`) ; 
  return  await res.json() ; 
}



export default function Enrollment() {
  const searchParams = useSearchParams();
  const [event_id, setEventId] = useState(null);
  const [event_name, setEventName] = useState(null);
  const [event, setEvent] = useState(null);
  const [numCat, setNumCat] = useState(null); // Using useState for numCat
  const [eventCat,setEventCat] = useState() ; 
  const [charges,setCharges] = useState() ; 
  const [attendeeCat,setAttendeeCat] = useState() ; 
  const [basePrice , setBasePrice] = useState(-1) ; 

  

 

  useEffect(() => {
    const eventId = searchParams.get("event_id");
    const eventName = searchParams.get("event_name");
    setEventId(eventId);
    setEventName(eventName);

    if (eventId) {
      getEvent(eventId).then((eventData) => {

        setEvent(eventData);
        console.log("Event details :", JSON.stringify(eventData.data));
        //numCat = eventData.data.attributes.attendee_catagories.length  ; 
        setNumCat(eventData.data.attributes.attendee_catagories.length); 
        setEventCat( eventData.data.attributes.event_catagories ) ; 
        setAttendeeCat(eventData.data.attributes.attendee_catagories)
        setCharges(eventData.data.attributes.charges);
        setBasePrice(eventData.data.attributes.price) ;
        console.log( "base price set to " + basePrice) ; 
        console.log( "base price set to " + basePrice) ; 

        console.log ( "charges=" , JSON.stringify(eventData.data.attributes.charges)); 
      }).catch(error => {
        console.error("Error fetching event:", error);
      });
    }
  }, [searchParams]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (basePrice !== -1) {
      setLoading(false);
    }
  }, [basePrice]);

  console.log( "base price set to " + basePrice) ; 
  if (!event_id || !event_name ) {
    return <div>Loading...</div>; // or any loading indicator
  }

  console.log("Event ID from query:", event_id , "attendee cat are " , numCat);
 
  //const noCat = event.attributes.attendee_catagories.length ; 
  //console.log ( "no of cat are ", noCat ) ; 
 

  
  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator until basePrice is set
  }
  


  return (

    <Layout title= "Event Enrollment">
    <div>
        <div className="faq section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <SectionTitle title="Event Registration" />
              <Accordion
                className="accordion-flush faq-accordion"
                defaultActiveKey="0"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {" "}
                    <span>Event Details</span> <IoIosArrowDown />{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                  <h2> Registering for Event : {event_name} </h2> 
                  {numCat > 1  ? (
                        <div className="popular">
                          <Attendee_Catagories attendee_catagories={attendeeCat}/> 
                        </div>
                      ) : (
                        "No catagories"
                      )}
                 
                   
                  
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {" "}
                    <span>Attendee Details</span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                  <RegisterForm event={event}  />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {" "}
                    <span>Price</span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                 

 
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </Layout> 

  )
}
