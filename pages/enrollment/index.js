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
  try { 
  const res =  await fetch ( EVENT_URL) ; 
  if (!res.ok) {
    console.log( "call failed") ; 
    return "ERROR" ; 
  } 
  //const res = await fetch ( `https://localhost:1337/api/mentor/${mentorId}?api_key=${process.env.API_KEY}`) ; 
  console.log("call was success") ; 

  return  await res.json() ;
  }
  catch (error ){
    console.log( " Error is " + error ) ; 
    return "ERROR" ;  
  }  
}



export default function Enrollment() {
  const searchParams = useSearchParams();
  const [event_id, setEventId] = useState(null);
  const [event_name, setEventName] = useState(null);
  const [event, setEvent] = useState(null);
  const [location_address, setLocationAddress] = useState(null);
  const [location_GPS, setLocationGPS] = useState(null);
 const [numCat, setNumCat] = useState(null); // Using useState for numCat
  const [eventCat,setEventCat] = useState()  ; 
  const [charges,setCharges] = useState() ; 
  const [attendeeCat,setAttendeeCat] = useState() ; 
  const [basePrice , setBasePrice] = useState(-1) ; 
  const [terms, setTerms] = useState(""); 
  const [eventStatus, setStatus] = useState(""); 
  const [activeKey, setActiveKey] = useState('1'); // Initial active tab is Tab 1
  const [errorFlag , setErrorFlag] = useState(false) ; 
  const [selectedEventCat, setSelectedEventCat] = useState() ; 


  

 

  useEffect(() => {
    const eventId = searchParams.get("event_id");
    const event_cat  = searchParams.get("event_catagory")
    //const eventName = searchParams.get("event_name");
    console.log("event cat is ", event_cat) ; 

    setEventId(eventId);
    setSelectedEventCat(event_cat) ; 

   // setEventName(eventName);

    if (eventId) {
      getEvent(eventId).then((eventData) => {
        console.log( "event data is " + JSON.stringify(eventData)) ; 
        if (eventData == "ERROR") {
          console.log( "Error in fetching event data maybe an invalid event") ; 
          setErrorFlag(true )  ; 
          return "<div>Error in loading event datails , maybe an invalid event...</div>" ; // or any loading indicator
         
        }

        setEvent(eventData);
        setEventName(eventData.data.attributes.name);
        setLocationAddress(eventData.data.attributes.location_address ) ; 
        setLocationGPS(eventData.data.attributes.location_GPS) ; 

       // console.log("Event details :", JSON.stringify(eventData.data));
        //numCat = eventData.data.attributes.attendee_catagories.length  ; 
        setNumCat(eventData.data.attributes.attendee_catagories.length); 
        setEventCat( eventData.data.attributes.event_catagories ) ; 
        setAttendeeCat(eventData.data.attributes.attendee_catagories)
        setCharges(eventData.data.attributes.charges);
        setBasePrice(eventData.data.attributes.price) ;
        setTerms(eventData.data.attributes.terms) ;
        setStatus( eventData.data.attributes.status) ; 
        console.log( "event statatus is  " + eventStatus) ; 
        //console.log( "base price set to " + basePrice) ; 

        console.log ( "terms=" ); 
      }).catch(error => {
        console.error("Error fetching event:", error);
      });
    }
  }, [searchParams]);
  console.log("error flag is ", errorFlag) ;

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (basePrice !== -1) {
      setLoading(false);
    }
  }, [basePrice]);

  if (errorFlag) {
    console.log("error detected") ; 
    return <div>Error in Fetching event details or wrong event id . </div>; // or any loading indicator
  }

  console.log( "base price set to " + basePrice) ; 
  if (!event_id ) {
    return <div>Loading...</div>; // or any loading indicator
  }


  console.log("Event ID from query:", event_id , "attendee cat are " , numCat);
 
  //const noCat = event.attributes.attendee_catagories.length ; 
  //console.log ( "no of cat are ", noCat ) ; 
 

  
  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator until basePrice is set
  }

 if ( eventStatus!= 'Active') {
  return <div> <center>This event is not accepting registrations , anymore. </center></div>
 }




  return (

    <Layout title= "Event Enrollment">
    <div>
                   
                  <RegisterForm event={event} selectedEventCat={selectedEventCat} />
               
        </div>
  
      
    </Layout> 

  )
}
