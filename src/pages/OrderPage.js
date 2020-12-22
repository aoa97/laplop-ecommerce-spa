import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'

import { deliverOrder, getOrderData } from '../actions/orderActions';
import { payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Button from '../components/Button';
import PageHeading from '../components/PageHeading';

const OrderPage = ({ match }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const { error, loading, order } = useSelector(state => state.orderData)
    const { user } = useSelector(state => state.userLogin)
    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)
    const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliver)
    const [sdkReady, setSdkReady] = useState(false)

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            // Get Client ID from the server
            const { data: clientId } = await axios.get('/api/config/paypal')

            // Add paypal script
            const script = document.createElement('script')
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => setSdkReady(true)

            // Append script to body
            document.body.appendChild(script)
        }

        if (loading || successPay || successDeliver) { // Get order details if isn't there or after paying
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderData(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order, loading])

    return (
        <>
            <Meta title='Your Order' />

            {loading ? <Loader /> : error ? <Message severity="error">{error}</Message> : (
                <>
                    <PageHeading className="d-none d-sm-block">Order {order._id}</PageHeading>

                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5 className="mb-2">Shipping</h5>

                                    <p>Name: <span className="font-weight-bold">{order.user && order.user.name}</span></p>
                                    <p>E-Mail: <span className="font-weight-bold">{order.user && order.user.email}</span></p>
                                    <p>Address: <span className="font-weight-bold">
                                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                                    </span></p>

                                    {order.isDelivered
                                        ? <Message severity="success">Delivered on {order.deliveredAt}</Message>
                                        : <Message>Not Delivered</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h5 className="mb-2">Payment</h5>

                                    <p>Method: <span className="font-weight-bold">{order.paymentMethod}</span></p>

                                    {order.isPaid
                                        ? <Message severity="success">Paid on <span className="font-weight-bold">{order.paidAt}</span></Message>
                                        : <Message>Not Paid</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h5 className="mb-2">Order Items</h5>

                                    <ListGroup variant="flush">
                                        {order.orderItems.map(item => (
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

                        <Col md={4}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h5>Summary</h5>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col className="font-weight-bold">{order.itemsPrice} EGP</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col className="font-weight-bold">{order.shippingPrice} EGP</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col className="font-weight-bold">{order.taxPrice} EGP</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col className="font-weight-bold">{order.totalPrice} EGP</Col>
                                    </Row>
                                </ListGroup.Item>

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader circular center />}
                                        {!sdkReady
                                            ? <Loader circular center />
                                            : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} onError={(e) => console.log(e)} />
                                        }
                                    </ListGroup.Item>
                                )}

                                {(user.isAdmin) && (
                                    <ListGroup.Item>
                                        {loadingDeliver ? <Loader circular center /> : (
                                            <Button
                                                disabled={order.isDelivered}
                                                onClick={() => dispatch(deliverOrder(order._id))}
                                            >Mark as Delivered</Button>
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}

export default OrderPage;