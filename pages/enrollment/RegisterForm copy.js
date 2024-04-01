'use client'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react" ;
import { API_URL } from "../../config";
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useRouter } from 'next/router';
import termsPage from './tos';


const makePayment = async (event) => {
  console.log("here...");
  //const router = useRouter();
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }
  console.log( "got event data" , event) ; 
  // Make API call to the serverless API
  const userData = {
    amount : event.target.form.price.value 
      };
  const razordata = await fetch("/api/razorpay", { method: "POST"  , 

  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
}
  
  ).then((t) =>
    t.json()
  );
  console.log( "JSON request is ",JSON.stringify(userData) )
  


  console.log ("data from razorpay is " + JSON.stringify(razordata)) ;
  var options = {
    key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
    name: event.target.form.fullName.value,
    currency: razordata.currency,
    amount: razordata.amount,
    order_id: razordata.id,
    description: event.target.form.enrollmentId.value ,
    image: "https://manuarora.in/logo.png",
    handler: function (response) {

      // Validate payment at server - using webhooks is a better idea.
      //setStatusMessage("Payment is successful. You are registered for the event ")
      updatePaymentStatus(event.target.form.enrollmentId.value, response.razorpay_payment_id, response.razorpay_order_id,response.razorpay_signature) ; 
  
      //pass event_name , enrollmentID , customer_name , event_catagory , email , subject 
      const emailSubject =  "You are in . Your registration for event - " + event.target.form.event_name.value + " is successful" ; 
      sendMail(event.target.form.event_name.value , event.target.form.enrollmentId.value , event.target.form.fullName.value  ,event.target.form.event_catagory.value , event.target.form.email.value , emailSubject ) ; 
      //sendMail(event_name , event.target.form.enrollmentId.value , event.target.form.fullName.value  ,event.target.form.event_catagory.value , event.target.form.email.value , emailSubject ) ; 
      console.log (response.razorpay_payment_id);
      console.log(response.razorpay_order_id);
      console.log(response.razorpay_signature);
      alert( "payment successful , registration complete. ")
      window.location.href = '/';
      //router.push('/');
      //resetForm();
    },
    prefill: {
      name: event.target.form.fullName.value,
      email: event.target.form.email.value,
      contact:event.target.form.mobile.value,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    // document.body.appendChild(script);

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

async function sendMail(event_name , enrollmentID , customer_name , event_catagory , email , subject ) {

const mailData =  {
  enrollmentID : enrollmentID , 
  customer_name : customer_name , 
  event_name : event_name ,
  event_catagory : event_catagory , 
  email : email  , 
  subject : subject 

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
  

async function updatePaymentStatus(enrollmentId, pgPaymentId , pgOrderId ,pgSignature ) {
  console.log ( "calling updateing payment api for reg ") ; 

  const result = await  axios.put(`${API_URL}/api/event-enrollments/`+enrollmentId, {
        data  : {  
                payment_order_id : pgOrderId , 
                payment_id : pgPaymentId , 
                payment_signature : pgSignature , 
                payment_status : "successful" 

              } 

     },   { headers: new Headers({'content-type': 'application/json'} ) }    
  ) 
  .then(response => {
  console.log( "return from payment update  id is  " + response.data.data.id) ; 
 
  //setEnrollmentId(response.data.data.id) ; 
  //console.log( "response in then is ", JSON.stringify(response)); 

   return ( response.data.data.id)  ; 
})
.catch(error => {
  console.log( "got some error ", JSON.stringify(error)) ; 
  return(0);

  }
  )
  console.log( "result is ", result ) ; 

  return(result); 
  
}
 


 async function registerForEvent(event , event_id )  {
  //console.log( "event has " + event_cat.length + " catoagories") ; 
  //var event_c = "no catagory" ;

  //if ( event_cat.length > 0 ) 
   // event_c = event.target.form.event_catagory.valuecd   ; 
  
  //console.log( "got form data" + JSON.stringify(event) ) ; 

  const result = await  axios.post(`${API_URL}/api/event-enrollments/`, {
        data  : {  full_name : event.target.fullName.value ,
                 email : event.target.email.value , 
                 mobile : event.target.mobile.value , 
                 attendee_catagory : "general" , 
                 event_catagory : event.target.event_catagory.value,
                 gender : event.target.gender.value , 
                 blood_group : event.target.blood_group.value , 
                 emergency_contact_name:  event.target.emergency_name.value ,
                 emergency_contact_number:  event.target.emergency_contact.value ,

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


function RegisterForm ({event}) {

  const [price,setPrice] = useState(event?.data?.attributes?.price) ; 
  const [event_name , setEventName] = useState(event?.data?.attributes?.name)
  const [enrollmentId,setEnrollmentId] = useState(0) ; 
  
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  
  const event_id = event?.data?.attributes?.id ; 

  const [statusMessage , setStatusMessage] = useState(""); 
  //console.log("got event as " + JSON.stringify(event.data)) ; 
  //const { push } = useRouter();
 

  const basePrice = event?.data?.attributes?.price ; 
  const event_cat = event?.data?.attributes?.event_catagories  ;
  const charges = event?.data?.attributes?.charges ; 
  
  //setPrice(basePrice) ;

  console.log ( "in register got the basepriceas " + basePrice)   ; 
  //const event  = getEvent(event_id) ; 
  
  const [validated, setValidated] = useState(false);
  //setPrice(basePrice) ; 
  //const eventData =  await getEvent(event_id); 
  //const eventCat = eventData.data.attributes.event_catagories ; 
  //console.log ( "event cat are ", JSON.stringify(eventCat)) ; 
  
  //function calculateCharges(catagories  , charges , event_catagory_selected ) { 
  
    function handleChange(event) { 
      console.log("new value is "  , event.target.value) ; 
      setPrice(calculateCharges(event.target.value , basePrice)); 
    
    }
  
  function calculateCharges( event_catagory_selected  ,basePrice) {   
    
    console.log( "looking for" + event_catagory_selected + "in " + JSON.stringify(event_cat) + "base price is " + basePrice) ; 
  
    for (var i = 0; i < event_cat.length; i++) {
      if (event_cat[i].event_catagory == event_catagory_selected ) {
        console.log ( "got price ", event_cat[i].price)
        if ( event_cat[i].price) 
        {
          console.log( "price is not null ") ; 
  
         }
         else console.log ( "price is null") ; 
      if ( event_cat[i].price )
          return event_cat[i].price ;
      else 
          return basePrice ;  
        //break;
      }
     
    }
    
  return basePrice; 
  }
  
  const [agree, setAgree] = useState(false);

  const [checked, setChecked] = useState(false); 
   function handleChange(e) {
      setChecked(e.target.checked);
   }


  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    //setAgree(!agree);
    console.log ( "agree is" , agree) ; 
    if (agree == true) {
      setStatusMessage ( "Agree the terms before saving") ; 
      setAgree(true);
      //setIsInputEnabled(false) ;     
    }
    else  { setStatusMessage ( "you are good ") ; setAgree(false) ; } 
    // Don't miss the exclamation mark
  }


  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const handleSubmit = e => {
    console.log( "in handleSubmit"); 
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      console.log ( "got some errors"); 
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      alert('Thank you for your feedback!')
    }
  }

  const findFormErrors = () => {
    const { email , mobile, fullName , gender , blood_group, event_catagory , emergency_name, emergency_contact  } = form
    const newErrors = {}
    // name errors
    if ( !fullName || fullName === '' ) newErrors.fullName = 'cannot be blank!'
    if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
    if ( !mobile || mobile === '' ) newErrors.mobile = 'cannot be blank!'
    if ( !gender || gender === '' ) newErrors.gender = 'cannot be blank!'
    if ( !blood_group || blodd_group === '' ) newErrors.blood_group = 'cannot be blank!'
    if ( !event_catagory || event_catagory === '' ) newErrors.event_catagory = 'cannot be blank!'
    if ( !emergency_name || emergency_name === '' ) newErrors.emergency_name = 'cannot be blank!'
    if ( !emergency_contact || emergency_contact === '' ) newErrors.emergency_contact = 'cannot be blank!'
  

    return newErrors
  }

  
  const handleSubmit2 =  async (data) => {
      console.log ( "Got in validation ") ; 

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isValidEmail = emailRegex.test(data.target.email.value);

      if ( !isValidEmail) {
        data.preventDefault();
        data.stopPropagation();
        setStatusMessage( "Email is not correct . " ) ; 
        setValidated(true); 
        return ; 

      }
      
      if  ( !checked ) 
      {
        data.preventDefault();
        data.stopPropagation();
        setStatusMessage( "Please agree on terms and conditions before proceeding" ) ; 
        setValidated(true); 
        return ; 
      }
  
      if ( data.target.emergency_contact.value == data.target.mobile.value) {
        setStatusMessage ( "Your mobile and emergency contact number cant be same "); 
        data.preventDefault();
        data.stopPropagation();
        console.log( "some validation issues  ")
        setValidated(true); 
        return ; 

      }
      if ( data.target.fullName.value == data.target.emergency_name.value) {
        setStatusMessage ( "Your name  and emergency contact name cant be same "); 
        data.preventDefault();
        data.stopPropagation();
        console.log( "some validation issues  ")
        setValidated(true); 
        return ; 

      }
      if ( isNaN(data.target.mobile.value) ||  ( data.target.mobile.value.length !=10 )) {
        setStatusMessage ( "Your mobile must be numeric and of 10 digits "); 
        data.preventDefault();
        data.stopPropagation();
        console.log( "some validation issues  ")
        setValidated(true); 
        return ; 

      }
      if ( isNaN(data.target.emergency_contact.value) || ( data.target.emergency_contact.value.length !=10 )) {
        setStatusMessage ( "Emergency Contact number must be numeric and of 10 digits "); 
        data.preventDefault();
        data.stopPropagation();
        console.log( "some validation issues  ")
        setValidated(true); 
        return ; 

      }

      const form = data.currentTarget;
      if (form.checkValidity() === false) {
        data.preventDefault();
        data.stopPropagation();
        setStatusMessage ( "All fields are mandatory"); 

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
          
          setPrice(calculateCharges(data.target.event_catagory.value,basePrice)) ;
  
          setIsInputEnabled(false) ; 
          //setPrice(price) ;
  
          //console.log( "price for the event" , price );

          if ( price > 0 )
            { setStatusMessage("Data saved , complete the payment ") ;
           // sendMail(event_name , data.target.enrollmentId.value , data.target.fullName.value  ,data.target.event_catagory.value , data.target.email.value , "Welcome" ) ; 
          }  
          else 
            setStatusMessage("Your registration is successful.") ; 
          
            return ;

   
      } catch (error ){ 
          console.error(error) ; 
      }
      
   
  
  
      
  
    };
  
  return (
<div> 

<Form style={{ width: '300px' }}>
        <Form.Group>  
                      <FloatingLabel
                        label="Event Name"
                        className="mb-3"
                      >
                      <Form.Control type="input" id="event_name" value={event_name} disabled/>
                      </FloatingLabel>
                      
                      </Form.Group>

        <Form.Group>  
        <FloatingLabel
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" id="email" placeholder="name@example.com" 
          onChange={ e => setField('email', e.target.value) }
          isInvalid={ !!errors.email }
          required disabled={!isInputEnabled}/>
          <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
        </FloatingLabel>
        </Form.Group>
    
        <FloatingLabel
          label="Mobile "
          className="mb-3"
        >
          <Form.Control type="input" id = "mobile" placeholder="enter your Mobile Number" required disabled={!isInputEnabled}
            onChange={ e => setField('mobile', e.target.value) }
            isInvalid={ !!errors.mobile }
          />
            <Form.Control.Feedback type='invalid'>{ errors.mobile }</Form.Control.Feedback>
        </FloatingLabel>
  
  
        <FloatingLabel label="Full Name"  className="mb-3">
          <Form.Control type="input" id="fullName" placeholder="Enter your full name"  required disabled={!isInputEnabled}
          onChange={ e => setField('fullName', e.target.value) }
          isInvalid={ !!errors.fullName }
          /> 
        <Form.Control.Feedback type='invalid'>{ errors.fullName}</Form.Control.Feedback>
        </FloatingLabel>
  
        
  
        <FloatingLabel label="Select Gender" className="mb-3">
        <Form.Select id="gender" aria-label="Gender" required disabled={!isInputEnabled}
         as='select' 
         onChange={ e => setField('gender', e.target.value) }
         isInvalid={ !!errors.gender }
        >
          <Form.Control.Feedback type='invalid'>{ errors.gender }</Form.Control.Feedback>
          <option></option>
          
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Other</option>
         
        </Form.Select>
      </FloatingLabel>
  
      <FloatingLabel label="Select Blood Group" className="mb-3">
        <Form.Select id="blood_group" aria-label="blood_group" required disabled={!isInputEnabled}
         as='select' 
         onChange={ e => setField('blood_group', e.target.value) }
         isInvalid={ !!errors.blood_group }
        >
          <option></option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B+">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O-">O+</option>
          <option value="O-">O-</option>


        </Form.Select>
        <Form.Control.Feedback type='invalid'>{ errors.blood_group }</Form.Control.Feedback>
      </FloatingLabel>

  
      {event_cat &&   (
      <FloatingLabel label="Select Event Catagory" className="mb-3" required >
        <Form.Select id="event_catagory" aria-label="Select Catagory" onChange={handleChange} required disabled={!isInputEnabled || event_cat.length==0 }
          as='select' 
       
          isInvalid={ !!errors.event_catagory}
        >
        <option></option>
        {event_cat && 
          event_cat.map(d => (<option value={d.event_catagory}>{d.event_catagory_desc}</option>))} 
  
        </Form.Select>
        <Form.Control.Feedback type='invalid'>{ errors.event_catagory}</Form.Control.Feedback>
      </FloatingLabel>
      )} 
      <FloatingLabel
          label="Emergency Contact Name"
          className="mb-3"
        >
          <Form.Control type="input" id="emergency_name" placeholder="enter emergency contact name" required disabled={!isInputEnabled} 
               onChange={ e => setField('fullName', e.target.value) }
               isInvalid={ !!errors.emergency_name }
          />
          <Form.Control.Feedback type='invalid'>{ errors.emergency_name}</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          label="Emergency Contact Number"
          className="mb-3"
        >
          <Form.Control type="input" id="emergency_contact" placeholder="enter your emergency contact number" required disabled={!isInputEnabled} 
               onChange={ e => setField('emergency_contact', e.target.value) }
               isInvalid={ !!errors.emergency_contact }
          />
          <Form.Control.Feedback type='invalid'>{ errors.emergency_contact}</Form.Control.Feedback>
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

                      <div>

                      <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="agree" onChange = {handleChange}/>
  <label class="form-check-label" for="agree">
    I agree to Terms and conditions ( To view Terms and conditions , click on Terms and conditions block below)  
  </label>
 
</div>
          
        </div>
 
  
                      <p> {statusMessage}</p> 
  
  
     
      <Button type="submit" onClick={ handleSubmit } disabled={!isInputEnabled} >Register</Button>{' '}
      
      <Button onClick={makePayment} disabled={isInputEnabled || price <= 0 } >Go For Payment</Button>{' '}

      </Form>
      </div>
    );
  }




export default RegisterForm;