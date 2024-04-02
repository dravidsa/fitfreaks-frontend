'use client'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react" ;
import { API_URL } from "../../config";
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useRouter } from 'next/router';

 //const termsLink = "<a href='#' onClick=${handleLinkClick}>Click here for terms and conditions</a>"; 
 

  

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
 console.log( "registering for event-" + event_id  +'b'+  event.target.blood_group.value + 'e' + event.target.emergency_contact.value +'c' + event.target.emergency_name.value)  ; 

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
                 event_name : event.target.event_name.value ,

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



function RegisterForm ({event ,openTab3}) {

  const [price,setPrice] = useState(event?.data?.attributes?.price) ; 
  const [event_name , setEventName] = useState(event?.data?.attributes?.name)
  const [event_id , setEventId ] = useState(event?.data?.attributes?.id ); 
  const [enrollmentId,setEnrollmentId] = useState(0) ; 
  
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  
  //const event_id = event?.data?.attributes?.id ; 

  const [statusMessage , setStatusMessage] = useState(""); 
  //console.log("got event as " + JSON.stringify(event.data)) ; 
  //const { push } = useRouter();
 

  const basePrice = event?.data?.attributes?.price ; 
  const event_cat = event?.data?.attributes?.event_catagories  ;
  const charges = event?.data?.attributes?.charges ; 

  //console.log( "got event as " + JSON.stringify(event)) ; 
  //setPrice(basePrice) ;

  //console.log ( "in register got the basepriceas " + basePrice)   ; 
  //const event  = getEvent(event_id) ; 
  
  const [validated, setValidated] = useState(false);
  //setPrice(basePrice) ; 
  //const eventData =  await getEvent(event_id); 
  //const eventCat = eventData.data.attributes.event_catagories ; 
  //console.log ( "event cat are ", JSON.stringify(eventCat)) ; 
  
  //function calculateCharges(catagories  , charges , event_catagory_selected ) { 

    const termsLink = '<a href="#" onClick={handleLinkClick}>Click here for terms and conditions</a>';

    const handleLinkClick = () => {
      // Simulate clicking a URL
      openTab3(); // Call the callback function to open Tab 3
    };
    

    function handleEventCatChange(event) { 
      //console.log("new value is "  , event.target.value) ; 
      setField('event_catagory', event.target.value ) ; 
      setPrice(calculateCharges(event.target.value , basePrice)); 
    
    }
  
  function calculateCharges( event_catagory_selected  ,basePrice) {   
    
    //console.log( "looking for" + event_catagory_selected + "in " + JSON.stringify(event_cat) + "base price is " + basePrice) ; 
  
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

  const [isChecked, setIsChecked] = useState(false)
   

   const checkHandler = () => {
    //console.log( "in handler the value of checked is " + agree)  ; 
    setIsChecked(!isChecked);
    //setField("agree", isChecked);
  }

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    //setAgree(!agree);
    //console.log ( "agree is" , agree) ; 
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
    //console.log( "field is " + field + "value is " + value) ; 
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

  const handleSubmit  = async (data) => {
    data.preventDefault()
    //console.log ( "got this as data "+ JSON.stringify( data)) ; 
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      console.log( "still some errors" + JSON.stringify(newErrors) );
      setErrors(newErrors) ;  
      if (!isChecked) {
        console.log( "terms not agreed") ; 
        setStatusMessage("Terms and conditions need to be agreed.") ; 
      }
      
    } else {
      // No errors! Put any logic here for the form submission!
      //console.log( "ischecked is ", isChecked ); 
      setStatusMessage("") ; 

      if (!isChecked) {
        //console.log( "terms not agreed") ; 
        setStatusMessage("Terms and conditions need to be accepted.") ; 
      }
      else  { 
        //setStatusMessage("Saving Data") ;  
        //alert('Thank you for your feedback!') ;
        
        try { 

          data.preventDefault();
          data.stopPropagation();

          const id =  await registerForEvent(data , event_id )  ; 
          if ( id ==0) {
            setStatusMessage("Some error in saving the record, please retry") ;
            return ; 
          }
          setEnrollmentId(id) ;  
  
          console.log ( "done registration successfully" + id ) ; 
          
          setPrice(calculateCharges(data?.target?.event_catagory?.value,basePrice)) ;
  
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
      
    }
    }
  }

  const findFormErrors = () => {
    const { email , mobile, fullName , gender , blood_group, event_catagory , emergency_name, emergency_contact  } = form
    const newErrors = {}
    // name errors
    if ( !fullName || fullName === '' ) newErrors.fullName = 'full name cannot be blank!'
    if ( !email || email === '' ) newErrors.email = 'email cannot be blank!' ; 
  
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) { 
       newErrors.email = 'email seems in incorrect format!' ; 
    }
    if ( !mobile || mobile === '' ) newErrors.mobile = 'cannot be blank!'
    else if ( isNaN(mobile) ||  ( mobile.length !=10 )) { 
      newErrors.mobile = 'mobile number should be of 10 digits' ; 
    }

    if ( !gender || gender === '' ) newErrors.gender = 'gender should be selected'
    if ( !blood_group || blood_group === '' ) newErrors.blood_group = 'blood group should be selected.'
    if ( !event_catagory || event_catagory === '' ) newErrors.event_catagory = 'event catagory should be selected.'
    if ( !emergency_name || emergency_name === '' ) newErrors.emergency_name = 'cannot be blank!'
    if ( !emergency_contact || emergency_contact === '' ) newErrors.emergency_contact = 'cannot be blank!'
    else if ( isNaN(emergency_contact) ||  ( emergency_contact.length!=10 )) { 
      newErrors.emergency_contact = 'emergency mobile number should be of 10 digits' ; 
    }

    if ( fullName == emergency_name) {
      newErrors.emergency_name = 'applicant name and emergency contact name cant be same' ; 
    }
    if ( mobile == emergency_contact) {
      newErrors.emergency_contact = 'applicant mobile and emergency contact mobile cant be same' ; 
    }
    /*
    console.log ( "value of agree-" + isChecked +"-" ) ;
    if ( agree == false ) { 
      console.log ( "terms need to agree") ; 
      newErrors.agree = 'Terms and conditions need to be agreed. ';  }
      else { console.log( "terms already agreed" ); 
        //newErrors.agree =''; 
    }
    */

    return newErrors
  }
  

  const handleSubmit2 =  async (data) => {
      //console.log ( "Got in validation ") ; 

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

<div className='App d-flex flex-column align-items-center'>

  
<Form style={{ width: 'max-width' }}  noValidate validated={validated} onSubmit={handleSubmit} >
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
          <Form.Control type="number" id = "mobile" placeholder="enter your Mobile Number" required disabled={!isInputEnabled}
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
          <option value="Others">Others</option>
         
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
        <Form.Select id="event_catagory" aria-label="Select Catagory" onChange={  handleEventCatChange} required disabled={!isInputEnabled || event_cat.length==0 }
          as='select' 
          isInvalid={ !!errors.event_catagory}
        >
           <Form.Control.Feedback type='invalid'>{ errors.event_catagory}</Form.Control.Feedback>
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
               onChange={ e => setField('emergency_name', e.target.value) }
               isInvalid={ !!errors.emergency_name }
          />
          <Form.Control.Feedback type='invalid'>{ errors.emergency_name}</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          label="Emergency Contact Number"
          className="mb-3"
        >
          <Form.Control type="number" id="emergency_contact" placeholder="enter your emergency contact number" required disabled={!isInputEnabled} 
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

      <Form.Group> 
     
      <Form.Check
            inline
            name="agree"
            type="checkbox"
            id="agree"
            checked={isChecked}
            onChange={checkHandler}
            isInvalid={ !!errors.isChecked }
            />
            <Form.Label>
            <a href="#" onClick={handleLinkClick}>I agree with Terms and Conditions</a>
        </Form.Label>
          <Form.Control.Feedback type='invalid'> Terms and Conditions need to be agreed</Form.Control.Feedback>
                

      </Form.Group>
      
          
        </div>
 
  
        <div style={{ color: 'red' }}> <p> {statusMessage}</p> </div>
  
      <Button type="submit"  disabled={!isInputEnabled} >Register</Button>{' '}
      
      <Button onClick={makePayment} disabled={isInputEnabled || price <= 0 } >Go For Payment</Button>{' '}

      </Form>
      </div>
    );
  }




export default RegisterForm;