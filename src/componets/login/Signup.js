import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import '../../style/login.css';
import TextField from '@mui/material/TextField';
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from 'react-google-login';
import { useAuth } from '../AuthContext';
import 'animate.css';

const Signup = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  // const { user, loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0(); // Destructure isLoading and error
// console.log(user);
// if (error) {
//   return <div>Error: {error.message}</div>; 
// }
// if (isLoading) {
//   return <div>Loading...</div>; 
// }

  const onSubmit = data => {
    reset();
    console.log(data);
  };

 

 

  return (
    <Container fluid className='bg-img-img'>
      <Row className='mx-auto'>
        <Col lg={12} md={12} className='mt-lg-4  d-flex justify-content-end p-2' style={{ height: '93vh' }}>
          <div className="form-signup bg-white p-5 d-flex justify-content-center me-5" style={{ height: '100vh', maxHeight: '600px' }}>
            <div className="login w-100 p-0  ">
              <h2 className='text-center text-dark animate__animated animate__bounce'>SignUp</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formEmail">
                  <TextField 
                    id="outlined-basic"
                    className='login-input text-white w-100'
                    type='email'
                    label="Email" 
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                </Form.Group>
                <Form.Group className='mt-3' controlId="formNumber">
                  <TextField 
                    id="outlined-basic"
                    className='login-input text-white w-100'
                    label="Number" 
                    type='text'
                    {...register('number', {
                      required: 'Number is required',
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'Invalid number'
                      }
                    })}
                  />
                  {errors.number && <Form.Text className="text-danger">{errors.number.message}</Form.Text>}
                </Form.Group>
                <Form.Group className='mt-3' controlId="formPassword">
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    className='login-input text-white w-100'
                    autoComplete="current-password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      maxLength: { value: 16, message: 'Password must be at most 16 characters' },
                    })}
                  />
                  {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>
                <div className='d-flex justify-content-around align-items-center'>
                  <Button className='mt-3 px-4 fw-bold btn bg-none border-3 border-white' type="submit" disabled>
                    SignUp
                  </Button>
                  <Button className='mt-3 px-4 fw-bold btn bg-none border-3 border-white'>
                    <Link className='nav-link p-0 text-white' to='/'>SignIn</Link>
                  </Button>
                </div>
                <p className='text-center mt-lg-3'>Already have an account? <span data-bs-toggle="tooltip" data-bs-placement="right" title="Click the Signin button" className='text-primary'>SignIn</span></p>
           
                    {/* <div className="btn border w-100 border-dark mt-3 login-with-google-btn"  onClick={() => loginWithRedirect()} >
                      <FcGoogle className='me-3' />Sign up with Google
                    </div> */}
             
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
