import React from 'react';
import { Modal, Row, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import Button from '../components/Button'

const CartModal = ({ modal, setModal, product, qty }) => {
    const history = useHistory()

    return (
        <Modal show={modal} className="cartModal">
            <Modal.Header closeButton onHide={() => setModal(false)} style={{ backgroundColor: "#07689f" }}>
                <Modal.Title className="text-light" style={{ fontSize: '1rem' }}>
                    Added to cart
                        <i className="fas fa-check ml-1"></i>
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>
                <Row className="align-items-center">
                    <Col md={3} xs={6}>
                        <Image fluid src={product.image} alt={product.name} />
                    </Col>

                    <Col md={5}>
                        <Typography component="p" style={{ fontSize: '1.09rem' }}>{product.brand} {product.model}</Typography>
                    </Col>

                    <Col md={4}>
                        <Typography component="h5" style={{ fontSize: '1rem', textTransform: 'none' }}>{qty} x {product.price} EGP</Typography>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Row style={{ width: '100%' }}>
                    <Col md={6} className="p-0 px-1">
                        <Button onClick={() => {
                            setModal(false)
                            history.push('/')
                        }}>Continue Shopping</Button>
                    </Col>

                    <Col md={6} className="p-0 px-1">
                        <Button variant="outlined" onClick={() => {
                            setModal(false)
                            history.push('/shipping')
                        }}>Proceed To Checkout</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}

export default CartModal;