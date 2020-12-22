import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { IconButton, Card } from '@material-ui/core';
import { Delete } from '@material-ui/icons'

import PageHeading from '../components/PageHeading';
import Message from '../components/Message';
import Button from '../components/Button'
import { addToCart, removeFromCart } from '../actions/cartActions';
import Meta from '../components/Meta';

function CartPage({ history }) {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cartItems)

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Meta title='Shopping Cart' />

            <Col md={12}>
                <PageHeading>Shopping Cart</PageHeading>
            </Col>

            <Col md={8} className="mb-2">

                {cart.length === 0 ?
                    <Message>
                        Your Cart is Empty
                        <Link to="/" className="ml-2">Go Back</Link>
                    </Message>
                    :
                    <ListGroup variant="flush">
                        {cart.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={2} xs={2}>
                                        <Image src={item.image} alt={item.name} fluid />
                                    </Col>

                                    <Col md={3} xs={2}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2} xs={2}>EGP {item.price}</Col>

                                    <Col md={2} xs={3}>
                                        <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </Col>

                                    <Col md={2} xs={1}>
                                        <IconButton color="primary" onClick={() => dispatch(removeFromCart(item.product))}>
                                            <Delete />
                                        </IconButton>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
            </Col>

            <Col md={4}>
                <Card variant="outlined">
                    <ListGroup variant="flush">
                        <ListGroup.Item className="py-4">
                            <h5 className="mb-2">Subtotal ({cart.reduce((a, x) => a + x.qty, 0)}) items</h5>
                            EGP {cart.reduce((a, x) => a + (x.qty * x.price), 0).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item >
                            <Button disabled={cart.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartPage;