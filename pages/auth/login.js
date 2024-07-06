import { useState } from 'react';
import axios from '../../lib/axios';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from "../../components/global/layout";
import AuthButton from '../../components/global/AuthButton';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



import { API_URL } from "../../config";
import Col from 'react-bootstrap/Col';

const Login = () => {
    const { push } = useRouter();
    const [alert,setAlert] = useState();

    const [validated, setValidated] = useState(false);

    const [ error  , setError ] = useState("") ; 

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

      axios
      .post('/api/auth/local', {identifier : data.target.email.value , password : data.target.password.value })
      .then(response => {
          const jwt = response.data.jwt;
          const username = response.data.user.username;

          localStorage.setItem('jwt', jwt);
          localStorage.setItem('username', username);
          console.log ( "jwt = " + jwt  + "user is -" + username) ; 
          <AuthButton username="from l"/> 
          push('/');
          //resetForm();
      })
      .catch(error => {
          if ( !error.response.data.message ) {
              setAlert(['alert', "Something went wrong"])
              setError("Invalid email or password ") ; 
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
          //setSubmitting(false);
          console.log("error here");
          setError("Invalid email or password ") ; 
      });
      /*
        const eventData =  await getEvent(event_id); 
        const response =  await registerForEvent(data , event_id )  ; 
        console.log ( "done registration successfully" + response ) ; 
        */
       console.log( "got this data in handleSubmit" , data.target.email.value + data.target.password.value  ); 
        return ;
 
    } catch (error ){ 
        console.error(error) ; 
    }
    
}
    
    const initialValues = {
        identifier: "",
        password: ""
    }

    const validationSchema = Yup.object({
        identifier: Yup.string().required("Required"),
        password: Yup.string().required("Required")
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        setAlert();

        axios
            .post('/api/auth/local', values)
            .then(response => {
                const jwt = response.data.jwt;
                const username = response.data.user.username;

                localStorage.setItem('jwt', jwt);
                localStorage.setItem('username', username);
                console.log ( "jwt = " + jwt  + "user is -" + username) ; 
                <AuthButton username="from l"/> 
                push('/');
                resetForm();
            })
            .catch(error => {
                if ( !error.response.data.message ) {
                    setAlert(['alert', "Something went wrong"])
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

    return (
    <>
    <Layout title="Login">
      <div className="d-flex align-items-center justify-content-center vh-100"> 
      <Card style={{ width: '38rem' }}>
      <Card.Body>
        <Card.Title>Login</Card.Title>
     
        <Card.Text>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
     
      <Form.Group>  
    
      <FloatingLabel
        label="Email address"
      >
        
        <Form.Control type="email" id="email" placeholder="name@example.com"  required/>
      </FloatingLabel>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

    

      <FloatingLabel
        label="Password">
        <Form.Control type="password" id = "password" placeholder="enter your password" required />
      </FloatingLabel>

  

    <Button type="submit">Register</Button>{' '}
     
     <label> {error}</label>
    </Form>
          
        </Card.Text>
        <Card.Link href="/auth/register">Register</Card.Link>
        <Card.Link href="#">Forgot Password</Card.Link>
      </Card.Body>
    </Card>


      

    

      
      
     </div>  
     </Layout>
    </>
    )

} 

export default Login;