import React from "react";
import Layout from "../../components/global/layout";
import { FaUserCircle } from "react-icons/fa";
import { ImLocation2, ImTicket, ImCalendar, ImPriceTags, ImClock } from "react-icons/im";
import { API_URL } from "../../config";
import InnerPageLayout from "../../components/inner-page-layout";
import Link from "next/link";
import SectionTitle from "../../components/global/section-title";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import md from 'markdown-it';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect} from "react" ;
import DOMPurify from 'dompurify';



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

const CatagoryList = () => {
    const searchParams = useSearchParams();
    const [event_id, setEventId] = useState(null);
    const [event, setEvent] = useState(null);
    const [numCat, setNumCat] = useState(null); // Using useState for numCat
    const [eventCat,setEventCat] = useState()  ; 
    const [enrollment_url , setEnrollmentUrl] = useState() ; 
  
 
    var eventId ; 
    //    var enrollment_url  ; 

    useEffect(() => {
        eventId = searchParams.get("event_id");
        //const eventName = searchParams.get("event_name");
        //enrollment_url = "/enrollment?event_id=" + eventId ; 
        setEnrollmentUrl("/enrollment?event_id=" + eventId  + "&event_catagory=" ); 
        console.log( "enrollment URL is " ,enrollment_url)
        setEventId(eventId); 

    if (eventId) {
        getEvent(eventId).then((eventData) => {
  
          setEvent(eventData);
         
  
         // console.log("Event details :", JSON.stringify(eventData.data));
          //numCat = eventData.data.attributes.attendee_catagories.length  ; 
          setNumCat(eventData.data.attributes.attendee_catagories.length); 
          setEventCat( eventData.data.attributes.event_catagories ) ; 
          console.log( "event cat are " + JSON.stringify(eventCat)) ; 
        }
    );
    }
    }, [searchParams]);

    const [loading, setLoading] = useState(true);
    
   

     
    
    return (
        <div>
              <Layout title={"Catagory"}>
              <InnerPageLayout title={"Select Catagory"} />
            { eventCat?.map((event_cat) => (
         
        
          
              <div className="singlePage section-padding">
              <Card>
                <Card.Header as="h5">{event_cat.event_catagory}</Card.Header>
                <Card.Body>
                <Card.Title>Rs. {event_cat.price}</Card.Title>
                
                <Card.Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event_cat.event_catagory_desc) }} />
                
                <Link className="button w-4`0 mt-4" target="_self"  href = {enrollment_url + event_cat.event_catagory}
                    >
                    Book
                  </Link>
     
                </Card.Body>
                </Card>
            </div>
            ))}

            </Layout>
        </div>
    )

}
    export default CatagoryList ;