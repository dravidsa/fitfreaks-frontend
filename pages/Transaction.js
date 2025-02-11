'use client'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState , useRef } from "react" ;

import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useRouter } from 'next/router';
import React from "react";
import DatePicker from "react-datepicker";
//import '../../styles/customStyles.css';  

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

  



  function Transaction () {

  

    function handleEventCatChange(event) { 
      console.log("new value is "  , event.target.value) ; 
      setField('event_catagory', event.target.value ) ; 
      setPrice(calculateCharges(event.target.value)); 
    
    }
  
  

  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})
  const [validated, setValidated] = useState(false);
  const userid=1234; 
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const enrollmentId = 9999 ; 
  const statusMessage = "Saving Data" ; 


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
      if ( (!isChecked)  && ( terms_flag == true) ){
        console.log( "terms not agreed") ; 
        setStatusMessage("Terms and conditions need to be agreed.") ; 
      }
      
    } else {
      // No errors! Put any logic here for the form submission!
      //console.log( "ischecked is ", isChecked ); 
      setStatusMessage("") ; 
      console.log( "All clear ") ; 

      if ( (!isChecked) && ( terms_flag == true ))  {
        //console.log( "terms not agreed") ; 
        setStatusMessage("Terms and conditions need to be accepted.") ; 
      }
      else  { 
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
  
          console.log( "price for the event" , price );

          if ( totalPrice > 0 )
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
    const { stock_code, recomm_date , amount , price, recomm_type, actual_amount, actual_price, actual_qty , action  } = form
    const newErrors = {}
    // name errors
    if ( !stock_code || stock_code === '' ) newErrors.stock_code = 'stock_code  cannot be blank!'
 
    if ( !action || action === '' ) newErrors.action = 'action should be selected'
    if ( !recomm_date || recomm_date === '' ) newErrors.recomm_date = 'recommendation date should be selected.'
    //if ( !event_catagory || event_catagory === '' ) newErrors.event_catagory = 'event catagory should be selected.'
    if ( !amount|| amount === '' ) newErrors.amount = 'amount cannot be blank!'
    if ( !price|| price === '' ) newErrors.price = 'price cannot be blank!'

    if ( !recomm_type || recomm_type === '' ) newErrors.recomm_type = 'recommendation type cannot be blank!'
    if ( !actual_amount|| actual_amount === '' ) newErrors.actual_amount = 'actual amount cannot be blank!'
    if ( !actual_price|| actual_price === '' ) newErrors.actual_price = 'actual price cannot be blank!'
    if ( !actual_qty|| actula_qty === '' ) newErrors.actual_qty = 'actual qty cannot be blank!'
    
  

    return newErrors
  }
  

 
  
  return (

<div id="root">

  
<Form 
className="custom-form"
noValidate validated={validated} onSubmit={handleSubmit} >
        <Form.Group>  
                      <FloatingLabel
                        label="User ID" 
                      >
                      <Form.Control type="input" id="userid" value={userid} disabled/>
                      </FloatingLabel>
                      
                      </Form.Group>

        <Form.Group>  
        <FloatingLabel
          label="Stock"
          className="mb-3"
        >
          <Form.Control type="input" id="stock" placeholder="stock code " 
          className="custom-input"
          onChange={ e => setField('stock_code', e.target.value) }
          isInvalid={ !!errors.stock_code }
          required disabled={!isInputEnabled}/>
          <Form.Control.Feedback type='invalid'>{ errors.stock_code }</Form.Control.Feedback>
        </FloatingLabel>
        </Form.Group>
    
        <FloatingLabel
          label="Amount"
           className="mb-3"
        >
          <Form.Control type="number" id = "amount" placeholder="enter the amount" disabled={!isInputEnabled}
            className="custom-input"
            onChange={ e => setField('amount', e.target.value) }
            isInvalid={ !!errors.amount }
          />
            <Form.Control.Feedback type='invalid'>{ errors.amount }</Form.Control.Feedback>
        </FloatingLabel>
  
  
        <FloatingLabel label="Price"   className="mb-3">
          <Form.Control type="input" id="price" placeholder="Enter price"  required disabled={!isInputEnabled}
          className="custom-input"
          onChange={ e => setField('price', e.target.value) }
          isInvalid={ !!errors.price }
          /> 
        <Form.Control.Feedback type='invalid'>{ errors.price}</Form.Control.Feedback>
        </FloatingLabel>

       
        <FloatingLabel label="Recommendation Date"   className="mb-3">
        <Form.Control
                type="date"
                className="custom-input"
                id="dob"
                name="recomm_date"
                placeholder="Date of Recommendation "
                required 
                isInvalid={ !!errors.recomm_date }
                onChange={(e) => setDate(e.target.value)}
              />
               <Form.Control.Feedback type='invalid'>{ errors.recomm_date}</Form.Control.Feedback>
        </FloatingLabel>
  
    

        

      
  
        <FloatingLabel label="Action"  className="mb-3">
        <Form.Select id="action" aria-label="Action" required disabled={!isInputEnabled}
         as='select' 
         className="custom-input"
         onChange={ e => setField('action', e.target.value) }
         isInvalid={ !!errors.action }
        >
         
          <option></option>
          
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
         
        </Form.Select>
        <Form.Control.Feedback type='invalid'>{ errors.action }</Form.Control.Feedback>
      </FloatingLabel>
        


      <FloatingLabel
          label="Actual Amount"
           className="mb-3"
        >
          <Form.Control type="input" id="actual_amount" placeholder="enter actual amount invested" required disabled={!isInputEnabled} 
               onChange={ e => setField('actual_amount', e.target.value) }
               isInvalid={ !!errors.actual_amount }
               className="custom-input"
          />
          <Form.Control.Feedback type='invalid'>{ errors.actual_amount}</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          label="Actual Price"
           className="mb-3"
        >
          <Form.Control type="number" id="actual_price" placeholder="enter actual price" required disabled={!isInputEnabled} 
               onChange={ e => setField('actual_price', e.target.value) }
               className="custom-input"
               isInvalid={ !!errors.actual_price }
          />
          <Form.Control.Feedback type='invalid'>{ errors.actual_price}</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          label="Actual Quantity"
           className="mb-3"
        >
          <Form.Control type="number" id="actual_qty" placeholder="enter actual quantiy" required disabled={!isInputEnabled} 
               onChange={ e => setField('actual_qty', e.target.value) }
               className="custom-input"
               isInvalid={ !!errors.actual_qty}
          />
          <Form.Control.Feedback type='invalid'>{ errors.actual_qty}</Form.Control.Feedback>
        </FloatingLabel>

      <Form.Group>  
                      <FloatingLabel
                        label="Enrollment Id"
                        className="mb-3"
                      >
                      <Form.Control type="input" id="enrollmentId" 
                      className="custom-input"
                      value={enrollmentId} disabled/>
                      </FloatingLabel>
                      
                      </Form.Group>
 
     

        <div style={{ color: 'red' }}> <p> {statusMessage}</p> </div>
  
      <Button type="submit"  disabled={!isInputEnabled} >Save</Button>{' '}
      
     
      </Form>
      </div>
    );
  }

  export default Transaction ; 