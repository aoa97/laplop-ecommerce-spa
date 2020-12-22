import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Col, ListGroup, Row, Image } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import { Delete, AddShoppingCart } from '@material-ui/icons';

import { unSaveItem, clearSaved } from '../actions/savedActions';
import Meta from '../components/Meta';
import PageHeading from '../components/PageHeading';
import Message from '../components/Message';

function SavedPage() {
    const dispatch = useDispatch()
    const { saved } = useSelector(state => state.savedItems)

    return (
        <Row>
            <Meta title='Wishlist' />

            <Col md={7}>
                <Row>
                    <Col xs={10}>
                        <PageHeading>Wishlist</PageHeading>
                    </Col>

                    <Col xs={2} className="text-right">
                        <Link onClick={() => dispatch(clearSaved())}>Clear</Link>
                    </Col>
                </Row>

                {saved.length === 0 ?
                    <Message>
                        Your Wishlist is Empty
                        <Link to="/" className="ml-2">Go Back</Link>
                    </Message>
                    :
                    <ListGroup>
                        {saved.map(item => (
                            <ListGroup.Item key={item.id}>
                                <Row className="align-items-center">
                                    <Col md={2} xs={3}>
                                        <Image src={item.image} alt={item.name} fluid />
                                    </Col>

                                    <Col md={4} xs={2}>
                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={4} xs={3}>EGP {item.price}</Col>

                                    <Col md={2} xs={4}>
                                        <Row className="align-items-center">
                                            <IconButton color="primary" size="small" onClick={() => dispatch(unSaveItem(item.id))}>
                                                <AddShoppingCart />
                                            </IconButton>

                                            <div className="vl mx-3" />

                                            <IconButton color="primary" size="small" onClick={() => dispatch(unSaveItem(item.id))}>
                                                <Delete />
                                            </IconButton>
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
            </Col>
        </Row>
    );
}

export default SavedPage;