import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { createOrder } from '../actions/orderActions'
import Meta from '../components/Meta';
import CheckoutSteps from '../components/CheckoutSteps';
import Button from '../components/Button';
import Message from '../components/Message';
import Loader from '../components/Loader';

const PlaceOrderPage = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartItems)
    const { shippingAddress, paymentMethod } = useSelector(state => state.orderDetails)
    const { loading, error, success, order } = useSelector(state => state.orderCreate)
    const { address, city, country } = shippingAddress
    const { cart: cartList } = cart

    // Calc Prices
    cart.itemsPrice = Number(cartList.reduce((a, x) => a + (x.qty * x.price), 0).toFixed(2))
    cart.shippingPrice = 50
    cart.taxPrice = Number((cart.itemsPrice * .15).toFixed(2))
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createOrder({
            orderItems: cartList,
            shippingAddress,
            paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [success, history, order])

    return (
        <>
            <Meta title='Place Order' />

            <CheckoutSteps current={3} />

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h5 className="my-2">Shipping</h5>
                            <p>Address: <span className="font-weight-bold">{address}, {city}, {country}</span></p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5 className="my-2">Payment Method:</h5>
                            <p>Method: <span className="font-weight-bold">{paymentMethod}</span></p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5 className="my-2">Order Items</h5>

                            <ListGroup variant="flush">
                                {cartList.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={1} className="d-none d-sm-block">
                                                <Image fluid src={item.image} alt={item.name} />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>{item.qty} X {item.price} = {item.qty * item.price} EGP</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col>
                    <ListGroup>
                        <ListGroup.Item>
                            <h5>Order Summary</h5>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col className="font-weight-bold">{cart.itemsPrice} EGP</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col className="font-weight-bold">{cart.shippingPrice} EGP</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col className="font-weight-bold">{cart.taxPrice} EGP</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col className="font-weight-bold">{cart.totalPrice} EGP</Col>
                            </Row>
                        </ListGroup.Item>


                        {loading && (
                            <ListGroup.Item className="d-flex justify-content-center">
                                <Loader circular />
                            </ListGroup.Item>
                        )}

                        {error && (
                            <ListGroup.Item>
                                <Message severity="error">{error}</Message>
                            </ListGroup.Item>
                        )}


                        <ListGroup.Item>
                            <Button
                                onClick={handleSubmit}
                                disabled={cartList.length === 0}
                            >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
}

export default PlaceOrderPage;