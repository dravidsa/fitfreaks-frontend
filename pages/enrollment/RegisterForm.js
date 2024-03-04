'use client'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react" ;
import { API_URL } from "../../config";
import Col from 'react-bootstrap/Col';
import axios from "axios";




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
  



 async function registerForEvent(event , event_id )  {


  
  console.log ( "calling axios api for reg ") ; 

    const result =   await axios.post("http://localhost:1637/api/event-enrollments/", {
        data  : {  full_name : event.target.fullName.value ,
                 email : event.target.email.value , 
                 mobile : event.target.mobile.value , 
                 attendee_catagory : "general" , 
                 event_catagory : event.target.event_catagory.value ,
                 gender : event.target.gender.value , 
                 address:  event.target.address.value ,
                 event_id : event_id
              } 

     },   { headers: new Headers({'content-type': 'application/json'} ) }    
  ) 
  .then(response => {
  console.log( "enrollment id is  " + response.data.data.id) ; 
  //setEnrollmentId(response.data.data.id) ; 
  //console.log( "response in then is ", JSON.stringify(response)); 

   return ( response.data.data.id)  ; 
})
.catch(error => {
  console.log( "got some error ", JSON.stringify(error)) ; 
  return(0); 

}
)
  
  ;


  console.log( "result is ", result ) ; 

  return(result); 
  
}



 function RegisterForm({event_id, event_cat, charges}) {

const [price,setPrice] = useState(0) ; 
const [enrollmentId,setEnrollmentId] = useState(0) ; 

const [isInputEnabled, setIsInputEnabled] = useState(true);


console.log ( "in register the  event is " +event_id +  'name is ' + JSON.stringify(event_cat) + "chagres are " + charges)   ; 
//const event  = getEvent(event_id) ; 

const [validated, setValidated] = useState(false);
//const eventData =  await getEvent(event_id); 
//const eventCat = eventData.data.attributes.event_catagories ; 
//console.log ( "event cat are ", JSON.stringify(eventCat)) ; 

//function calculateCharges(catagories  , charges , event_catagory_selected ) { 

  function handleChange(event) { 
    console.log("new value is "  , event.target.value) ; 
    setPrice(calculateCharges(event.target.value)); 
  
  }

function calculateCharges( event_catagory_selected ) {   
  
  console.log( "looking for" + event_catagory_selected + "in " + JSON.stringify(event_cat)) ; 

  for (var i = 0; i < event_cat.length; i++) {
    if (event_cat[i].event_catagory == event_catagory_selected ) {
      console.log ( "got price ", event_cat[i].price)
        return event_cat[i].price ; 
      //break;
    }
   
  }
  
return 0 ; 
}


const handleSubmit =  async (data) => {
    console.log ( "Got in validation ") ; 

    const form = data.currentTarget;
    if (form.checkValidity() === false) {
      data.preventDefault();
      data.stopPropagation();
      console.log( "some validation issues  ")
      setValidated(true); 
      return ; 
    }

    try { 
        console.log ( "going to call azios api now "); 
        data.preventDefault();
      data.stopPropagation();
       
        const id =  await registerForEvent(data , event_id )  ; 
        setEnrollmentId(id) ;  

        console.log ( "done registration successfully" + id ) ; 
        
        setPrice(calculateCharges(data.target.event_catagory.value)) ; 
        setIsInputEnabled(false) ; 
        //setPrice(price) ;

        //console.log( "price for the event" , price );
       
        
        return ;
 
    } catch (error ){ 
        console.error(error) ; 
    }
    
 


    

  };

return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

      <Form.Group>  
      <FloatingLabel
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" id="email" placeholder="name@example.com"  required disabled={!isInputEnabled}/>
      </FloatingLabel>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>



      <FloatingLabel
        label="Mobile "
        className="mb-3"
      >
        <Form.Control type="input" id = "mobile" placeholder="enter your Mobile Number" required disabled={!isInputEnabled}/>
      </FloatingLabel>


      <FloatingLabel label="Full Name"  className="mb-3">
        <Form.Control type="input" id="fullName" placeholder="Enter your full name"  required disabled={!isInputEnabled} />
      </FloatingLabel>

      <FloatingLabel
        label="Address"
        className="mb-3"
      >
        <Form.Control type="input" id="address" placeholder="enter your home address" required disabled={!isInputEnabled} />
      </FloatingLabel>

      <FloatingLabel label="Select Gender" className="mb-3">
      <Form.Select id="gender" aria-label="Gender" required disabled={!isInputEnabled}>
        <option></option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
       
      </Form.Select>
    </FloatingLabel>

    

    <FloatingLabel label="Select Event Catagory" className="mb-3" required >
      <Form.Select id="event_catagory" aria-label="Select Catagory" onChange={handleChange} required disabled={!isInputEnabled}>
      <option></option>
      {event_cat && 
        event_cat.map(d => (<option value={d.event_catagory}>{d.event_catagory_desc}</option>))} 

      </Form.Select>
   
    </FloatingLabel>

    <Form.Group>  
                    <FloatingLabel
                      label="Enrollment Id"
                      className="mb-3"
                    >
                    <Form.Control type="input" id="enrollmentId" value={enrollmentId} disabled/>
                    </FloatingLabel>
                    
                    </Form.Group>

    <Form.Group>  
                    <FloatingLabel
                      label="Event Price"
                      className="mb-3"
                    >
                    <Form.Control type="input" id="price" value={price} disabled/>
                    </FloatingLabel>
                    
                    </Form.Group>

    


    <Button type="submit" disabled={!isInputEnabled} >Register</Button>{' '}
    <Button disabled={isInputEnabled} >Go For Payment</Button>{' '}
    </Form>

    </>
  );
}



export default RegisterForm;