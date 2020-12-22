import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { Typography } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import Button from './Button'
import Counter from './Counter';
import CartModal from './CartModal';
import renderStorage from './../utils/renderStorage';
import { addToCart } from './../actions/cartActions';

const Product = ({ product }) => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    const [modal, setModal] = useState(false)


    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty))
        setModal(true)

        setTimeout(() => setModal(false), 3000)
    }

    return (
        <>
            <CartModal modal={modal} setModal={setModal} product={product} qty={qty} />

            <Card className="mb-4">
                <Link to={`/product/${product._id}`}>
                    <div className="d-flex justify-content-center">
                        <Card.Img
                            variant="top"
                            src={product.image}
                            style={{ width: 253, height: 208 }}
                        />
                    </div>

                    <Card.Body>
                        <Card.Title style={{ color: "#1a1a1a", fontSize: "1.1rem" }}>{product.brand} {product.model}</Card.Title>

                        <Typography variant="body2" color="textSecondary" component="p" style={{ minHeight: "4rem" }}>
                            {product.specs.processor}, {product.specs.ram}, {renderStorage(product.specs.storage)}, {product.specs.vga}
                        </Typography>

                        <Row className="my-1">
                            <Col>
                                <Typography component="h5" style={{ fontSize: '1.1rem' }}>{product.price} EGP</Typography>
                            </Col>
                        </Row>
                    </Card.Body>
                </Link>


                <Row className="pl-3 mb-3">
                    <Col md={7}>
                        <Counter count={qty} setCount={setQty} length={product.countInStock} disabled={product.countInStock === 0} />
                    </Col>

                    <Col md={5} className="card__btn">
                        <Button
                            tooltip="Add to cart"
                            IconComponent={<AddShoppingCart />}
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default Product;