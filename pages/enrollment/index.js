import React from 'react'
import Layout from "../../components/global/layout";
import { Accordion } from "react-bootstrap";
import SectionTitle from "../../components/global/section-title";
import { IoIosArrowDown } from "react-icons/io";
import RegisterForm from "./RegisterForm.js"
import { useSearchParams } from 'next/navigation'

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

const searchParams = useSearchParams()
 
const event_id  = searchParams.get('event_id')
const event_name = searchParams.get('event_name') ; 
console.log ( " got event_id from query " + event_id ) ; 
  return (
    <Layout title= "Event Enrollment">
    <div>
        <div className="faq section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <SectionTitle title="Even Registration" />
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
                   
                  
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {" "}
                    <span>Attendee Details</span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                  <RegisterForm event_id={event_id}/>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {" "}
                    <span>Price</span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
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
