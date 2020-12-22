import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap';

import { getProducts } from '../actions/productActions'
import Meta from '../components/Meta';
import Carousel from '../components/Carousel';
import Product from '../components/Product';
import Message from './../components/Message';
import Loader from '../components/Loader';
import PageHeading from './../components/PageHeading';
import Paginate from '../components/Paginate';

const HomePage = ({ match }) => {
    const keyword = match.params.keyword, pageNumber = match.params.pageNumber
    const dispatch = useDispatch()
    const { loading, error, products, pages, page } = useSelector(state => state.productList)

    useEffect(() => {
        dispatch(getProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />

            {!keyword && <Carousel />}

            <PageHeading>Latest Products</PageHeading>

            {loading ? <Loader /> : error ? <Message severity="error">{error}</Message> : (
                <>
                    <Row>
                        {products.map(x => (
                            <Col md={6} lg={4} xl={3} key={x._id}>
                                <Product product={x} />
                            </Col>
                        ))}

                    </Row>

                    <Paginate pages={pages} page={page} keyword={keyword} />
                </>
            )}
        </>
    );
}

export default HomePage;