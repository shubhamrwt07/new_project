import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { loginRequest } from '../../redux/Login/action';

const Login = () => {
  const dispatch = useDispatch();
  const { user, loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0(); // Destructure isLoading and error
console.log(user);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    dispatch(loginRequest(email, password));
    reset();
  };

 

  if (isAuthenticated) {
    return <Navigate to={'/product'} replace />; 
  }

  return (
    <Container fluid className='bg-img-img'>
      <Row>
        <Col lg={12} md={12} className='d-flex p-0 justify-content-end' style={{ height: '99vh' }}>
          <div className="bg-white form-login p-5 d-flex justify-content-center me-5" style={{ height: '100vh', maxHeight: '700px' }}>
            <div className="login w-100 p-0 me-2">
              <h2 className='text-center text-dark animate__animated animate__bounce'>SignIn</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formEmail">
                  <TextField
                    id="outlined-basic"
                    className='login-input text-white w-100'
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

                <Form.Group className='mt-4 d-flex flex-column' controlId="formPassword">
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    className='login-input text-white'
                    autoComplete="current-password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      maxLength: { value: 16, message: 'Password must be at most 16 characters' },
                    })}
                  />
                  {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>

                <div className='d-flex mt-3 justify-content-around align-items-center'>
                  <Button className='mt-3 px-4 fw-bold btn bg-none' type="submit">
                    SignIn
                  </Button>
                  <Button className='mt-3 px-4 fw-bold btn bg-none'>
                    <Link className='nav-link text-white p-0' to='/signup'>SignUp</Link>
                  </Button>
                </div>
              </Form>
           
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
