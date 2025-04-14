'use client'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState , useRef } from "react" ;
import { API_URL } from "../../config";
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
//import '../../styles/customStyles.css';  
import ShowTerms from './showTerms';
import styles from '@/styles/enrollment/RegisterForm.module.css';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

  

const makePayment = async (event) => {
 // console.log("here...now 1");
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
      sendMail(event.target.form.event_name.value , event.target.form.enrollmentId.value , event.target.form.fullName.value  ,event.target.form.event_catagory.value , event.target.form.email.value , emailSubject , "registration" , "" ) ; 
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
  

  async function getGroups() { 
    console.log( "calling get groups " ); 
    const GROUP_NAMES_URL = API_URL+"/api/group-names/?populate=*";
   // const EVENT_URL = process.env.NEXT_PUBLIC_EVENT_URL + "/"+ event_id  + "?populate=*" ; 
    //const URL = `http://localhost:1337/api/events/${event_id}?populate=*` ; 
    console.log ( "group names URL is " + GROUP_NAMES_URL ); 
    const res =  await fetch ( GROUP_NAMES_URL) ; 
    //console.log( "response is "+ JSON.stringify(res)) ; 
    //const res = await fetch ( `https://localhost:1337/api/mentor/${mentorId}?api_key=${process.env.API_KEY}`) ; 
    const data = await  res.json();
    console.log("response data is", data);

    return  data ; 
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
 
 async function registerForEvent(event , event_id ,fileUrl, GST_flag, profession_flag , tshirt_flag,platform_fees_flag,accomodation_flag,dob_flag,terms_flag)  {
  //console.log( "registering for event-" + event.target.profession.value +'-b-'+  event.target.price.value + '-e-' + event.target.dob.value +'-g-' + event.target.gst.value + '-p-' + event.target.platform_fees.value)  ; 

  console.log ( "flags are " ,terms_flag, "for event " + event_id); 
  
  var gst  , tshirt_size , accomodation_option , platform_fees , dob , profession  ;
  

  if ( GST_flag){
    gst= event.target.gst.value  ; 
  }
  if ( profession_flag){
    profession = event.target.profession.value  ; 
  }
  if ( dob_flag){
    dob = event.target.dob.value  ; 
  }
  if ( tshirt_flag){
    tshirt_size= event.target.tshirt_size.value  ; 
  }
  if ( accomodation_flag){
    accomodation_option = event.target.accomodation_option.value  ; 
  }
  if ( platform_fees_flag){
    platform_fees = event.target.platform_fees.value  ; 
  }

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
                 event_id : event_id ,
                 event_name : event.target.event_name.value ,
                 group_name : event.target.group_name.value ,   
                 total_price : event.target.price.value ,
                 document_url : fileUrl ,
                 dob : dob , 
                 profession : profession , 
                 tshirt_size : tshirt_size , 
                 gst : gst, 
                 platform_fees:platform_fees, 
                 total_price : event.target.price.value ,
                 accomodation_option : accomodation_option
          

              } 

     },   { headers: new Headers({'content-type': 'application/json'} ) }    
  ) 
  .then(response => {
   
    console.log( "enrollment id is  " + response.data.data.id) ; 


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


  const groups = await getGroups() ; 
  console.log ( "got running groups as " + JSON.stringify(groups)) ; 
  var totalPrice = 0 ; 
  var GST_charges = 0 ; 
  var platform_fees  = 0 ; 
  var basePrice = 0 ; 

  function RegisterForm ({event ,selectedEventCat}) {

  //const [basePrice,setPrice] = useState(event?.data?.attributes?.price) ; 
  const [event_name , setEventName] = useState(event?.data?.attributes?.name)
  const [event_id , setEventId ] = useState(event?.data?.id); 
  const [enrollmentId,setEnrollmentId] = useState(0) ; 
  const [fileName,setFileName] =useState("select File to Upload") ; 
  const [file, setFile] = useState("");
  

  useEffect(() => {
    if (event?.data?.id) {
      setEventId(event.data.id);
      console.log("Setting event_id to:", event.data.id);
    }
  }, [event]);

  console.log( "event catagory selected was" + selectedEventCat) ; 
  
  const [isInputEnabled, setIsInputEnabled] = useState(true);


  const [statusMessage , setStatusMessage] = useState(""); 

  //const groups =    getGroups() ; 
  console.log( "got groups" + JSON.stringify(groups) ) ; 

  //const basePrice = event?.data?.attributes?.price ; 
  const event_cat = event?.data?.attributes?.event_catagories  ;
  const charges = event?.data?.attributes?.charges ; 

  const GST_flag = event?.data?.attributes?.GST_flag ; 
  const GST_percent = event?.data?.attributes?.GST_percent ; 
  const GST_source = event?.data?.attributes?.GST_source ; 

  const platform_fees_flag = event?.data?.attributes?.platform_fees_flag ; 
  const platform_fees_percent  = event?.data?.attributes?.platform_fees_percent ; 
  const platform_fees_source = event?.data?.attributes?.platform_fees_source ;
  const eventMessage = event?.data?.attributes?.event_message ;
  const tshirt_flag = event?.data?.attributes?.tshirt_flag  ;
  const accomodation_flag = event?.data?.attributes?.accomodation_flag ;
  
  const tshirt_sizes  =  event?.data?.attributes?.tshirt_sizes ; 
  const accomodation_options = event?.data?.attributes?.accomodation_options ;

  const dob_flag = event?.data?.attributes?.dob_flag ;
  const profession_flag = event?.data?.attributes?.profession_flag ; 
  const document_flag = event?.data?.attributes?.document_flag ; 

  const [isModalOpen, setIsModalOpen] = useState(false)
  const terms_flag =  event?.data?.attributes?.terms_flag ; 
  const termsText = event?.data?.attributes?.terms; 
  //var totalPrice = 0 ; 



  console.log ( "acco options are " , accomodation_options) ; 
  var tshirt_sizes_arr = [] ; 
  var accomodation_options_arr = [] ; 

  const [startDate, setStartDate] = useState(new Date());

  //var DatePicker = require("react-bootstrap-date-picker");


  if ( tshirt_flag) { 
    tshirt_sizes_arr = tshirt_sizes.split(',');
  }

  if ( accomodation_flag) { 
    accomodation_options_arr = accomodation_options.split(',');
  }

   
  if (selectedEventCat && selectedEventCat !== '') {
    console.log("Getting price for selected event catagory " + selectedEventCat);
    basePrice = getBasePrice(selectedEventCat, basePrice) ; 
    totalPrice = getTotalPrice(basePrice) ; 
  }

  
  function getTotalPrice( basePrice) { 
  console.log("event details are" , JSON.stringify(event)) ; 
  
  totalPrice = basePrice  ; 
 


if ( (GST_flag) && ( GST_source== "End_User")) {
    GST_charges =  basePrice * GST_percent / 100 ; 
    totalPrice = parseFloat(totalPrice) + parseFloat(GST_charges) ; 

}
console.log("GST charges are " , basePrice + "-" + GST_percent + "-"+ GST_charges + "-") ; 
console.log("platform fees source is  " , platform_fees_source) ; 
if ( (platform_fees_flag) && ( platform_fees_source == "End_User" )){ 
  console.log( "going to charge plat fees") ; 
  platform_fees = basePrice * platform_fees_percent /100 ; 
  totalPrice =  parseFloat(totalPrice) + parseFloat(platform_fees) ;
  console.log("total price is " , totalPrice) ; 
}

return totalPrice ; 
}

const hiddenFileInput = useRef(null);
//setFileName("File not yet selected")

  const handleChange = event => {

    if (event.target.files && event.target.files[0]) {
      console.log("files are " + JSON.stringify(event.target.files)) ; 
      const i = event.target.files[0];
      const tmpfileName = event.target.files[0]; 
      console.log  ("got file name as " + JSON.stringify(tmpfileName)) ; 
      setFileName(tmpfileName) ;
      const body = new FormData();
      body.append("image", i);


    }
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  
  const [validated, setValidated] = useState(false);
  

    const termsLink = '<a href="#" onClick={handleLinkClick}>Click here for terms and conditions</a>';

    const handleLinkClick = () => {

      setIsModalOpen(true)
      /*
      // Simulate clicking a URL
      const termsText = " Some sample terms Text " ; 

      const rootElement = document.getElementById("root");
      const root = createRoot(rootElement);
      if (rootElement) { 
      root.render(
      <StrictMode>
        <ShowTerms termsText={termsText} />
      </StrictMode>
);  
}
  else {
    console.log( "Root not found ") ; 
  }

      */


    };

    const handleCloseModal = () => {
      setIsModalOpen(false)
   }

    
    function handleGroupChange(event) { 
      //console.log("new value is "  , event.target.value) ; 
      setField('group_name', event.target.value ) ; 
      //setPrice(calculateCharges(event.target.value , basePrice)); 
    
    }

    function setDate(dob) { 
      setField("dob",dob) ; 
      console.log("dob is ", dob) ; 

    }

    function handleEventCatChange(event) { 
      console.log("new value is "  , event.target.value) ; 
      setField('event_catagory', event.target.value ) ; 
      basePrice = getBasePrice(event.target.value); 
      totalPrice = getTotalPrice(basePrice) ;  
     // setPrice(calculateCharges(event.target.value)); 
    
    }
  
    function handleTshirtSizeChange(event) { 
      console.log("new value is "  , event.target.value) ; 
      setField('tshirt_size', event.target.value ) ; 

    
    }
    function handleAccomodationChange(event) { 
      console.log("new value is "  , event.target.value) ; 
      setField("accomodation_option", event.target.value ) ; 

    
    }

  //function calculateCharges( event_catagory_selected  ,basePrice) {   
    function getBasePrice( event_catagory_selected  ,basePrice) {   
    
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
    data.preventDefault();
    data.stopPropagation();
    //console.log ( "got this as data "+ JSON.stringify( data)) ; 
    // get our new errors
    console.log("handling submit") ; 
   
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
     // alert( "still some errors" + JSON.stringify(newErrors) );
      console.log( "still some errors" + JSON.stringify(newErrors) );
      setErrors(newErrors) ;  
      if ( (!isChecked)  && terms_flag  ){
        console.log( "terms not agreed") ; 
        setStatusMessage("Terms and conditions need to be agreed.") ; 
        //alert( "terms not agreed") ;
        
      }
     
      return ;

    } 
    if ( (!isChecked)  && terms_flag  ){
      console.log( "terms not agreed") ; 
      setStatusMessage("Terms and conditions need to be agreed.") ; 
      alert( "terms not agreed") ;
      
    }
    
    else {
      // No errors! Put any logic here for the form submission!
      //console.log( "ischecked is ", isChecked ); 
      setStatusMessage("Seems ok for now. ") ; 
      console.log( "All clear  for now ") ; 

      
 
        setStatusMessage("Saving Data") ;  
        //alert('Thank you for your feedback!') ;
        
        try { 
          var fileUrl ; 
          data.preventDefault();
          data.stopPropagation();
          console.log("uploading file" + file) ; 
          if (file) {
            console.log( "uploading file on servdr" + JSON.stringify(file)) ; 
            const formData = new FormData();
            formData.append('files', file );
      
            // Replace with your actual API endpoint for file upload
            const response = await fetch(`${API_URL}/api/upload`, {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log ( "file upload response " + JSON.stringify(data)) ; 
              fileUrl = data[0].url ; 

              console.log('File uploaded successfully .Url is ',fileUrl);
            } else {
              console.error('File upload failed');
            }
          }
        
          console.log( "Calling register for Event ") ;
          const id =  await registerForEvent(data , event_id , fileUrl,GST_flag, profession_flag , tshirt_flag,platform_fees_flag,accomodation_flag,dob_flag)  ; 
          if ( id ==0) {
            setStatusMessage("Some error in saving the record, please retry") ;
            return ; 
          }
          setEnrollmentId(id) ;  
  
          console.log ( "done registration successfully" + id ) ; 
          
          //setPrice(calculateCharges(data?.target?.event_catagory?.value,basePrice)) ;
  
          setIsInputEnabled(false) ; 
          //setPrice(price) ;
  
          console.log( "price for the event" , totalPrice );

          if ( totalPrice > 0 )
            { setStatusMessage("Data saved , complete the payment ") ;
           // sendMail(event_name , data.target.enrollmentId.value , data.target.fullName.value  ,data.target.event_catagory.value , data.target.email.value , "Welcome" ) ; 
          }  
          else 
            setStatusMessage("Your registration is successful.") ; 
          
            return ;

   
      } catch (error ){ 
        console.error("Form submission error:", error);
        setStatusMessage("Error saving data. Please try again.");
      }
      
    
    }
  }

  const findFormErrors = () => {
    const { email , mobile, fullName , gender , blood_group, event_catagory , emergency_name, emergency_contact  ,dob , accomodation_option, tshirt_size, fileUpload } = form
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
    //if ( !event_catagory || event_catagory === '' ) newErrors.event_catagory = 'event catagory should be selected.'
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

    if ( tshirt_flag && ( tshirt_size ==='' || !tshirt_size  )) {

      newErrors.tshirt_size = 'Need to select T Shirt Size' ; 
    }
    if ( accomodation_flag && ( accomodation_option ==='' || !accomodation_option  )) {

      newErrors.accomodation_option = 'Need to select room type ' ; 
    }

    console.log ( "dob is " + dob ) ; 
    if ( dob_flag && ( dob ==='dd/mm/yyyy' || !dob  )) {

      newErrors.dob = 'Need to select Date of Birth' ; 
    }
    console.log("fileUpload is ", file) ; 

    if ( document_flag && ( file === '')){
      newErrors.fileUpload ="select a document for ID proof to upload. "
    }
   
    console.log ( "value of agree-" + terms_flag +"-" ) ;
    if ( ( !isChecked) && ( terms_flag) ){ 
      console.log ( "terms need to agree") ; 
      newErrors.agree = 'Terms and conditions need to be agreed. ';  
    }
      else { console.log( "terms already agreed or need not be agreed " ); 
          //newErrors.agree =''; 
    }
  

    return newErrors
  }
  

 
  
  return (

<div id="root">

  
<Form 
className={styles.customForm}
noValidate 
validated={validated} 
onSubmit={handleSubmit} 
>

        <Form.Group className={styles.formGroup}>  
                      <FloatingLabel
                        label="Event Name"
                        className={styles.formLabel}
                      >
                      <Form.Control type="input" id="event_name" value={event_name} disabled/>
                      </FloatingLabel>
                      
                      </Form.Group>

        <Form.Group className={styles.formGroup}>  
        <FloatingLabel
          label="Email address"
          className={styles.formLabel}
        >
          <Form.Control type="email" id="email" placeholder="name@example.com" 
          className={styles.customInput}
          onChange={ e => setField('email', e.target.value) }
          isInvalid={ !!errors.email }
          required disabled={!isInputEnabled}/>
          <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
        </FloatingLabel>
        </Form.Group>
    
        <FloatingLabel
          label="Mobile "
           className={styles.formLabel}
        >
          <Form.Control type="number" id = "mobile" placeholder="enter your Mobile Number" required disabled={!isInputEnabled}
            className={styles.customInput}
            onChange={ e => setField('mobile', e.target.value) }
            isInvalid={ !!errors.mobile }
          />
            <Form.Control.Feedback type='invalid'>{ errors.mobile }</Form.Control.Feedback>
        </FloatingLabel>
  
  
        <FloatingLabel label="Full Name"   className={styles.formLabel}>
          <Form.Control type="input" id="fullName" placeholder="Enter your full name"  required disabled={!isInputEnabled}
          className={styles.customInput}
          onChange={ e => setField('fullName', e.target.value) }
          isInvalid={ !!errors.fullName }
          /> 
        <Form.Control.Feedback type='invalid'>{ errors.fullName}</Form.Control.Feedback>
        </FloatingLabel>

        { dob_flag &&  
        <FloatingLabel label="Date of Birth"   className={styles.formLabel}>
        <Form.Control
                type="date"
                className={styles.customInput}
                id="dob"
                name="dob"
                placeholder="Date of birth "
                required 
                isInvalid={ !!errors.dob }
                onChange={(e) => setDate(e.target.value)}
              />
               <Form.Control.Feedback type='invalid'>{ errors.dob}</Form.Control.Feedback>
        </FloatingLabel>
  } 
    

        

      
  
        <FloatingLabel label="Select Gender"  className={styles.formLabel}>
        <Form.Select id="gender" aria-label="Gender" required disabled={!isInputEnabled}
         as='select' 
         className={styles.customInput}
         onChange={ e => setField('gender', e.target.value) }
         isInvalid={ !!errors.gender }
        >
         
          <option></option>
          
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
         
        </Form.Select>
        <Form.Control.Feedback type='invalid'>{ errors.gender }</Form.Control.Feedback>
      </FloatingLabel>
  
      <FloatingLabel label="Select Blood Group"  className={styles.formLabel}>
        <Form.Select id="blood_group" aria-label="blood_group" required disabled={!isInputEnabled}
         as='select' 
         className={styles.customInput}
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

      { selectedEventCat && (
        <Form.Group className={styles.formGroup}>
          <div className={styles.floatingLabel}>
            <Form.Select
              id="event_catagory"
              aria-label="Select Category"
              onChange={handleEventCatChange}
              required
              disabled={!isInputEnabled || event_cat.length === 0}
              className={`${styles.formSelect} ${styles.floatingSelect}`}
              value={values.event_catagory || ''}
            >
              <option value="">Select Event Category</option>
              {event_cat.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
            <Form.Label>Select Event Category</Form.Label>
            <Form.Control.Feedback type='invalid'>{errors.event_catagory}</Form.Control.Feedback>
          </div>
        </Form.Group>
      )}
      
      {event_cat && !selectedEventCat && (
        <Form.Group className={styles.formGroup}>
          <FloatingLabel label="Select Event Catagory"  className={styles.formLabel}>
            <Form.Select id="event_catagory" aria-label="Select Catagory" onChange={handleEventCatChange} required disabled={!isInputEnabled || event_cat.length==0 }
              as='select' 
              className={styles.customInput}
              isInvalid={ !!errors.event_catagory}
            >
              <Form.Control.Feedback type='invalid'>{ errors.event_catagory}</Form.Control.Feedback>
              <option></option>
              {event_cat && 
                event_cat.map(d => (<option value={d.event_catagory}>{d.event_catagory}</option>))}  
            </Form.Select>
            <Form.Control.Feedback type='invalid'>{ errors.event_catagory}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      )}
      
      {groups &&   (
        <Form.Group className={styles.formGroup}>
          <FloatingLabel label="Select your Fitness Group" className={styles.formLabel}>
            <Form.Select id="group_name" aria-label="Select Group Name" onChange={  handleGroupChange} 
              as='select' 
              className={styles.customInput}
            >
  
              <option></option>
              {groups && 
                groups.data.map(d => (<option value={d.attributes.group_name}>{d.attributes.group_name}</option>))} 
                </Form.Select>
           
          </FloatingLabel>
        </Form.Group>
      )} 


      <FloatingLabel
          label="Emergency Contact Name"
           className={styles.formLabel}
        >
          <Form.Control type="input" id="emergency_name" placeholder="enter emergency contact name" required disabled={!isInputEnabled} 
               onChange={ e => setField('emergency_name', e.target.value) }
               isInvalid={ !!errors.emergency_name }
               className={styles.customInput}
          />
          <Form.Control.Feedback type='invalid'>{ errors.emergency_name}</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          label="Emergency Contact Number"
           className={styles.formLabel}
        >
          <Form.Control type="number" id="emergency_contact" placeholder="enter your emergency contact number" required disabled={!isInputEnabled} 
               onChange={ e => setField('emergency_contact', e.target.value) }
               className={styles.customInput}
               isInvalid={ !!errors.emergency_contact }
          />
          <Form.Control.Feedback type='invalid'>{ errors.emergency_contact}</Form.Control.Feedback>
        </FloatingLabel>

        {tshirt_flag && (
          <Form.Group className={styles.formGroup}>
            <div className={styles.floatingLabel}>
              <Form.Select
                id="tshirt_size"
                aria-label="Select T-shirt Size"
                onChange={handleTshirtSizeChange}
                required
                disabled={!isInputEnabled}
                className={`${styles.formSelect} ${styles.floatingSelect}`}
                value={values.tshirt_size || ''}
              >
                <option value="">Select T-shirt Size</option>
                {tshirt_sizes_arr && tshirt_sizes_arr.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </Form.Select>
              <Form.Label>Select T-shirt Size</Form.Label>
              <Form.Control.Feedback type='invalid'>{errors.tshirt_size}</Form.Control.Feedback>
            </div>
          </Form.Group>
        )}

{accomodation_flag && (
  <Form.Group className={styles.formGroup}>
    <div className={styles.floatingLabel}>
      <Form.Select
        id="accomodation_option"
        aria-label="Select Accommodation"
        onChange={handleAccomodationChange}
        required
        disabled={!isInputEnabled}
        className={`${styles.formSelect} ${styles.floatingSelect}`}
        value={values.accomodation_option || ''}
      >
        <option value="">Select Room Type</option>
        {accomodation_options_arr && accomodation_options_arr.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
      <Form.Label>Select Room Type</Form.Label>
      <Form.Control.Feedback type='invalid'>{errors.accomodation_option}</Form.Control.Feedback>
    </div>
  </Form.Group>
)}

        { profession_flag && 
        <FloatingLabel label="Profession"  className={styles.formLabel}>
          
          <Form.Control type="input" id="profession" placeholder="Enter your profession"  
          className={styles.customInput}
           disabled={!isInputEnabled}
          onChange={ e => setField('profession', e.target.value) }
        /> 
  
        </FloatingLabel>
        } 

{/* File Upload Field */}
{   document_flag && 
<Form.Group controlId="fileUpload" className={styles.formGroup}>

  
          <Form.Label>Upload File for ID proof (Image or PDF)</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className={styles.customInput}
            isInvalid={ !!errors.fileUpload }
            required disabled={!isInputEnabled}/>
            <Form.Control.Feedback type='invalid'>{ errors.fileUpload }</Form.Control.Feedback>
  
        </Form.Group>
  }
      

      <Form.Group className={styles.formGroup}>  
                      <FloatingLabel
                        label="Enrollment Id"
                        className={styles.formLabel}
                      >
                      <Form.Control type="input" id="enrollmentId" 
                      className={styles.customInput}
                      value={enrollmentId} disabled/>
                      </FloatingLabel>
                      
                      </Form.Group>

                      {   platform_fees_flag && 
                      <Form.Group className={styles.formGroup}>  
        <FloatingLabel
          label="Base Price"
          className={styles.formLabel}
        >
        <Form.Control type="input" id="basePrice" 
        className={styles.customInput}
        value={basePrice} disabled/>
        </FloatingLabel>
        
        </Form.Group>
  }
                      {   GST_flag && 
        
        <Form.Group className={styles.formGroup}>  
        <FloatingLabel
          label="GST"
          className={styles.formLabel}
        >
        <Form.Control type="input" id="gst" 
        className={styles.customInput}
        value={GST_charges} disabled/>
        </FloatingLabel>
        
        </Form.Group>

                      }

{   platform_fees_flag && 
        
        <Form.Group className={styles.formGroup}>  
        <FloatingLabel
          label="Platform Fees"
          className={styles.formLabel}
        >
        <Form.Control type="input" id="platform_fees" 
        className={styles.customInput}
        value={platform_fees} disabled/>
        </FloatingLabel>
        
        </Form.Group>

                      }

      <Form.Group className={styles.formGroup}>  
      


                      <FloatingLabel
                        label="Event Price"
                        className={styles.formLabel}
                      >
                      <Form.Control type="input" id="price"
                      className={styles.customInput}
                       value={totalPrice} disabled/>
                      </FloatingLabel>
                      
                      </Form.Group>

   {terms_flag &&    
         
      <Form.Group className={styles.formGroup}> 
     
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
        {isModalOpen && <ShowTerms termsText={termsText} onClose={handleCloseModal} />}
          <Form.Control.Feedback type='invalid'> Terms and Conditions need to be agreed</Form.Control.Feedback>
                

      </Form.Group>
      
   }      
      
  

 
      <div> {eventMessage} </div>

        <div style={{ color: 'red' }}> <p> {statusMessage}</p> </div>
  
      <Button type="submit"  disabled={!isInputEnabled} >Register</Button>{' '}
      
      <Button onClick={makePayment} disabled={isInputEnabled || price <= 0 } >Go For Payment</Button>{' '}

      </Form>
      </div>
    );
  }




export default RegisterForm;