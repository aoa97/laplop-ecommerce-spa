import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import { Card, Divider, IconButton, Typography } from '@material-ui/core'
import { Favorite as LikeIcon, FavoriteBorder as UnlikeIcon, AddShoppingCart } from '@material-ui/icons'
import { Rate, Input } from 'antd'
import moment from 'moment'

import { createReview, getProductById } from '../actions/productActions'
import { addToCart } from '../actions/cartActions';
import { saveItem, unSaveItem } from '../actions/savedActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import renderStorage from '../utils/renderStorage';
import Meta from '../components/Meta';
import Stock from '../components/Stock';
import Button from '../components/Button';
import Counter from '../components/Counter'
import Message from '../components/Message';
import Loader from '../components/Loader';
import CartModal from '../components/CartModal';

function ProductPage({ match }) {
    const productId = match.params.id
    const dispatch = useDispatch()

    const { loading, product, error } = useSelector(state => state.productDetails)
    const { success: successCreateReview } = useSelector(state => state.productCreateReview)
    const { saved } = useSelector(state => state.savedItems)

    const [qty, setQty] = useState(1)
    const [like, setLike] = useState(saved.find(x => x.id === productId) ? true : false)
    const [modal, setModal] = useState(false)

    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')


    useEffect(() => {
        if (successCreateReview) {
            setRating('')
            setComment('')
        }
        if (!product._id || product._id !== productId || successCreateReview) {
            dispatch(getProductById(productId))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match, successCreateReview, product._id, productId])

    const likeHandler = () => {
        setLike(!like)

        if (!like) {
            dispatch(saveItem(productId))
        } else {
            dispatch(unSaveItem(productId))
        }
    }

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty))
        setModal(true)

        setTimeout(() => setModal(false), 3000)
    }

    const createReviewHandler = () => {
        if (rating.length === 0) {
            alert('Please select your rating')
        } else {
            dispatch(createReview(productId, { rating, comment }))
        }
    }

    return (
        <>
            <CartModal modal={modal} setModal={setModal} product={product} qty={qty} />


            { loading ? <Loader /> : error ? <Message severity="error">{error}</Message> : (
                <>
                    <Meta title={`${product.brand} ${product.model}`} />

                    <Row>
                        <Col md={6}>
                            <Image src={product.image} width="100%" />
                        </Col>


                        <Col md={6}>
                            <Card className="p-4">
                                <Row>
                                    <Col xs={10}>
                                        <h4 className="text-dark productPage__heading ">
                                            {product.brand} <span style={{ fontWeight: 'normal' }}>{product.model}</span>
                                        </h4>
                                    </Col>

                                    <Col xs={2} className="d-flex justify-content-end">
                                        <IconButton size="small" style={{ bottom: 4 }} onClick={likeHandler}>
                                            {like && <LikeIcon className="text-primary" />}
                                            {!like && <UnlikeIcon className="text-primary" />}
                                        </IconButton>
                                    </Col>
                                </Row>

                                <Divider className="mt-2 mb-3" />

                                <Row>
                                    <Col xs={6}>
                                        <Typography component="h5" style={{ fontSize: '1.2rem' }}>{product.price} EGP</Typography>
                                    </Col>

                                    <Col xs={6} className='d-flex justify-content-end'>
                                        <Rate
                                            disabled
                                            allowHalf
                                            defaultValue={product.totalRating}
                                        />
                                    </Col>
                                </Row>

                                <table className="table table-sm table-striped mt-2 mb-3">
                                    <tbody>
                                        <tr>
                                            <td>Processor</td>
                                            <th className="text-dark">{product.specs && product.specs.processor}</th>
                                        </tr>
                                        <tr>
                                            <td>RAM</td>
                                            <th className="text-dark">{product.specs && product.specs.ram}</th>
                                        </tr>
                                        <tr>
                                            <td>Storage</td>
                                            {product.specs && <th className="text-dark">{renderStorage(product.specs.storage)}</th>}
                                        </tr>
                                        <tr>
                                            <td>VGA</td>
                                            <th className="text-dark">{product.specs && product.specs.vga}</th>
                                        </tr>
                                        <tr>
                                            <td>Resolution</td>
                                            <th className="text-dark">{product.specs && product.specs.resolution}</th>
                                        </tr>
                                    </tbody>
                                </table>

                                <Row className="mb-3">
                                    <Col xs={6}>
                                        <Counter count={qty} setCount={setQty} length={product.countInStock} disabled={product.countInStock === 0} />
                                    </Col>

                                    <Col xs={6} className="d-flex justify-content-end">
                                        {product.countInStock > 0 ? <Stock /> : <Stock out />}
                                    </Col>
                                </Row>

                                <Button disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                    <AddShoppingCart style={{ fontSize: '1.2rem', marginRight: '.2rem' }} />
                                 Add to Cart
                            </Button>
                            </Card>
                        </Col>
                    </Row>

                    <Row className='mt-5'>
                        <Col md={6}>
                            <h5 className='text-dark my-3'>Write a review</h5>

                            <div>
                                <label>Rating</label>
                                <select className='w-100 py-2' value={rating} onChange={e => setRating(e.target.value)}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </select>
                            </div>

                            <div className='my-3'>
                                <label>Comment</label>
                                <Input.TextArea
                                    rows={4}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                            </div>

                            <Button onClick={createReviewHandler}>Submit</Button>
                        </Col>

                        <Col md={6}>
                            <h5 className='text-dark my-3'>Reviews</h5>

                            {product.numReviews === 0 ? <Message>No Reviews</Message> : (
                                <ListGroup style={{ maxHeight: '20rem', overflowY: 'auto' }}>
                                    {product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <Row>
                                                <Col xs={6}>
                                                    <strong>{review.name}</strong>
                                                </Col>

                                                <Col xs={6} className='text-right'>{moment(review.createdAt).calendar()}</Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Rate
                                                        disabled
                                                        allowHalf
                                                        defaultValue={review.rating}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>{review.comment}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductPage;