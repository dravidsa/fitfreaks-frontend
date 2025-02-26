import { useState } from 'react';
import axios from '../../lib/axios';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import Layout from "../../components/global/layout";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
    useNavigate,
  } from 'react-router-dom';



const Register = () => {
    const [alert,setAlert] = useState();
    const [email,setEmail] = useState();
    const [password, setPassword] = useState(); 
    const [repassword, setRepassword] = useState() ; 

    //const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const [ error  , setError ] = useState("") ; 

    const initialValues = {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false,
        newsletterSubscription: false , 
        role : 1 
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Insert a valid email").required("Required"),
        password: Yup.string().required("Required"),
        repeatPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
        privacyPolicy: Yup.bool().oneOf([true], "Required")
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        setAlert();
        setEmail();
        console.log ( "values are " + JSON.stringify(values) ); 
        axios
            .post('/api/auth/local', values)
            .then(response => {
                const message = `Please check your email (${values.email}) to confirm your account.`;
                setAlert(['success', message]);
                setEmail(values.email);

                resetForm();
            })
            .catch(error => {
                if ( !error.response.data.message ) { +
                    setAlert(['alert', "Something went wrong" + JSON.stringify(error) ])
                } else {
                    const messages = error.response.data.message[0].messages;

                    const list = [];
                    messages.map((message,i) => {
                        let item = "";
                        if (i === 0) item += `<ul>`;
                        
                        item += `<li>${message.id}</li>`;

                        if (i === messages.length - 1) item += `</ul>`
                        list.push(item);
                    });

                    setAlert(['alert', list]);
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    const resendEmail = (email) => {
        setAlert();
        const values = { email: email };

        axios
            .post('/auth/send-email-confirmation', values)
            .then(response => {
                const message = `We sent you another email to <u>${values.email}</u> to confirm your account. Please check also your spam folder.`;
                setAlert(['success', message]);
            })
            .catch(error => {
                const message = `Something went wrong.`;
                setAlert(['alert', message]);
            });
    }

    const resetForm = (data) => { 
        /*
        setEmail('') ; 
        setPassword('') ; 
        setRepassword(''); 
        */
       data.target.email.value = "" ; 

    }
    const handleSubmit =  async (data) => {
        console.log ( "Got in validation ") ; 

        if ( data.target.password.value != data.target.repassword.value) 
        {
            data.preventDefault();
            data.stopPropagation();
            setError("password and confirm password are not same ") ; 
            setValidated(true); 
            return ; 

        }
    
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
          const registrationData = { 
            username : data.target.email.value , 
            email : data.target.email.value , 
            password : data.target.password.value ,
            role : 0

          }
         
          console.log ( "values are " + JSON.stringify(registrationData) ); 
          axios
              .post('/api/users', registrationData)
              .then(response => {
                /*
                  const message = `Please check your email (${values.email}) to confirm your account.`;
                  setAlert(['success', message]);
                  setEmail(values.email);
                */
               console.log( "response is ", response) ; 
               setError("Üser is registered successfully .Login with this id from top menu") ; 
               //await delay(1000); 
               //navigate('/auth/login'); 

               //resetForm(registrationData); 
                
               
              })
              .catch(error => {
                setError( "Error in registering user. Error : "+error.response.data.error.message) ; 
                console.log ( "error is " ,JSON.stringify(error.response.data.error.message)) ;
                //resetForm();  
              })
              .finally(() => {
                 // setSubmitting(false);
                 console.log ( "error in finally ", error) ; 
               });

         
           console.log( "got this data in handleSubmit" , data.target.email.value + data.target.password.value  ); 
            return ;
     
        } catch (error ){ 
            console.error(error) ; 
        }
        
    }
    const handleSocialLogin = (provider) => {
      // Store the current URL in localStorage to redirect back after login
      localStorage.setItem('returnTo', window.location.pathname);
      
      // Get the base API URL from your environment variables
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1637';
      
      // Redirect to the social login endpoint
      window.location.href = `${apiUrl}/api/connect/${provider}?callback=${window.location.origin}/auth/callback`;
  };
    return (
        <>

    <Layout title="Register">
      <div className="d-flex align-items-center justify-content-center vh-100"> 
      <Card style={{ width: '38rem' }}>
      <Card.Body>
        <Card.Title>Register</Card.Title>
     
        <Card.Text>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
     
      <Form.Group className="mb-4">  
    
      <FloatingLabel
        label="Email address"
      >
        
        <Form.Control type="email" id="email" placeholder="name@example.com"  required/>
      </FloatingLabel>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

    
      <Form.Group className="mb-4">  
      <FloatingLabel
        label="Password">
        <Form.Control type="password" id = "password" placeholder="enter your password" minlength="6" required />
      </FloatingLabel>
      </Form.Group>
      
      <Form.Group className="mb-4">  
      <FloatingLabel
        label="rePassword">
        <Form.Control type="password" id = "repassword" placeholder="enter your password again" minlength="6" required />
      </FloatingLabel>
      </Form.Group>
    <div className="d-flex justify-content-center"> 
    <Button type="submit">Register</Button>{' '}
    </div>
    
     
     <label> {error}</label>
     
    </Form>
    </Card.Text>
    </Card.Body>
    </Card> 


      

    

      
      
                  
           
        </div>
        </Layout>
       
        </>
    )

}

export default Register;