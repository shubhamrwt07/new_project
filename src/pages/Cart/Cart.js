import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { SiThurgauerkantonalbank } from 'react-icons/si';
import config from '../../config';
import '../../style/Product.css'; // Import your CSS file here

const Cart = () => {
    const cartItems = useSelector(state => state.item.carts);
    const [lgShow, setLgShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleMouseMove = (e, index) => {

        const zoomer = document.querySelector(`.zoom-container[data-index='${index}'] .zoom-image`);
        const offsetX = e.nativeEvent.offsetX / e.target.offsetWidth * 100;
        const offsetY = e.nativeEvent.offsetY / e.target.offsetHeight * 100;
        zoomer.style.transformOrigin = `${offsetX}% ${offsetY}%`;
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    return (
        <>
            <div className="container-fluid mt-lg-5">
                <div className="row">
                    {cartItems.length === 0 ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        cartItems.map((item, index) => (
                            <div className="col-12 mb-3" key={item._id}>
                                <div className="p-3 rounded-3 shado text-center h-100 d-flex flex-column flex-lg-row">
                                    <div className="col-lg-6 p-2 mt-lg-5 d-flex flex-column">
                                        <div className="cart-img p-2 d-flex justify-content-center">
                                            {item.image && (
                                                <div
                                                    className="zoom-container"
                                                    data-index={index}
                                                    onMouseMove={(e) => handleMouseMove(e, index)}
                                                >
                                                    <img
                                                        src={`${config.IMAGE_URL}${item.image}`}
                                                        alt={item.name}
                                                        className="img-fluid rounded zoom-image"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="btn mt-2 d-flex justify-content-evenly">
                                            <button className="bg-none">Add to cart</button>
                                            <button className="bg-none" onClick={() => setLgShow(true)}>Buy now</button>
                                        </div>
                                    </div>
                                    <div className="col-6 mt-lg-5 p-2 text-start d-flex flex-column justify-content-between">
                                        <div className="text-start mt-lg-1">
                                            <h4 className="">{item.name}</h4>
                                            <p className="text-muted ">{item.description}</p>
                                            <p className="text-success">Extra ₹1513 off</p>
                                            <p className="fw-bold">
                                                Price: ${item.price} <del className="text-muted">5000</del> <span className="text-success">39% off</span>
                                            </p>
                                            <h5>Available offers</h5>
                                            <p>
                                                <SiThurgauerkantonalbank className="text-success" /> Bank Offer: Get ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above{' '}
                                                <span className="text-primary">T&C</span>
                                            </p>
                                            <p>
                                                <SiThurgauerkantonalbank className="text-success" /> Bank Offer: Get ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above{' '}
                                                <span className="text-primary">T&C</span>
                                            </p>
                                            <p>
                                                <SiThurgauerkantonalbank className="text-success" /> Bank Offer: Get ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above{' '}
                                                <span className="text-primary">T&C</span>
                                            </p>
                                            <p>
                                                <SiThurgauerkantonalbank className="text-success" /> Bank Offer: Get ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above{' '}
                                                <span className="text-primary">T&C</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Large Modal
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control type="text" placeholder="Last name" required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid lastname.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Phone Number" required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Phonenumber.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="City" required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid city.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="text" placeholder="State" required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid state.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                                        <Form.Label>Pin code</Form.Label>
                                        <Form.Control type="text" placeholder="Pin code" required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Pincode.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        required
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                    />
                                </Form.Group>
                                <Button type="submit">Submit form</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>


        </>
    );
};

export default Cart;
