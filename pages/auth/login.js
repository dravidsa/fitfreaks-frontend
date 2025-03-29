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
    const [alert, setAlert] = useState();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (data) => {
        console.log("Got in validation");

        const form = data.currentTarget;
        if (form.checkValidity() === false) {
            data.preventDefault();
            data.stopPropagation();
            console.log("some validation issues")
            setValidated(true);
            return;
        }

        try {
            console.log("going to call axios api now");
            data.preventDefault();
            data.stopPropagation();

            axios
                .post('/api/auth/local', {
                    identifier: data.target.email.value,
                    password: data.target.password.value
                })
                .then(async response => {
                    const jwt = response.data.jwt;
                    const username = response.data.user.username;
                    const userEmail = data.target.email.value;

                    // Get user's role from fitfreaks-users
                    try {
                        const roleResponse = await axios.get('/api/fitfreaks-users', {
                            headers: {
                                Authorization: `Bearer ${jwt}`
                            }
                        });
                        
                        // Find the user by email and get their role
                        const currentUser = roleResponse.data.data.find(
                            user => user.attributes.email === userEmail
                        );
                        
                        const userRole = currentUser?.attributes?.role || 'user';

                        // Store all user info
                        localStorage.setItem('jwt', jwt);
                        localStorage.setItem('username', username);
                        localStorage.setItem('userEmail', userEmail);
                        localStorage.setItem('userRole', userRole);

                        console.log("jwt = " + jwt + " user is -" + username + " role is -" + userRole);
                        push('/');
                    } catch (roleError) {
                        console.error('Error fetching user role:', roleError);
                        setError("Error fetching user role");
                    }
                })
                .catch(error => {
                    if (!error.response?.data?.message) {
                        setAlert(['alert', "Something went wrong"])
                        setError("Invalid email or password");
                    } else {
                        const messages = error.response.data.message[0].messages;

                        const list = [];
                        messages.map((message, i) => {
                            let item = "";
                            if (i === 0) item += `<ul>`;

                            item += `<li>${message.id}</li>`;

                            if (i === messages.length - 1) item += `</ul>`
                            list.push(item);
                        });

                        setAlert(['alert', list]);
                    }
                });
        } catch (error) {
            console.error(error);
            setError("An error occurred during login");
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <Card className="shadow-sm">
                            <Card.Body className="p-5">
                                <h2 className="text-center mb-4">Login</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="email" label="Email address" className="mb-3">
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>

                                    <FloatingLabel controlId="password" label="Password">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your password.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>

                                    <Button variant="primary" type="submit" className="w-100 mt-4">
                                        Login
                                    </Button>

                                    <div className="text-center mt-3">
                                        <Link href="/auth/register" className="text-decoration-none">
                                            Don't have an account? Register
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;