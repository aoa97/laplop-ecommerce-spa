import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { getTopProducts } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';


const ProductsCarousel = () => {
    const dispatch = useDispatch()
    const { loading, products, error } = useSelector(state => state.productTop)

    useEffect(() => {
        dispatch(getTopProducts())
    }, [dispatch])

    return (
        <>
            {loading ? <Loader circular /> : error ? <Message severity='error'>{error}</Message> : (
                <Carousel pause='hover' className='bg-dark mb-4'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            {/* Image will be added soon .. */}
                            <Image fluid src={product.image} style={{ backgroundColor: '#FFF', width: '35%', height: 300 }} />


                            <Carousel.Caption className='carousle-caption'>
                                <Link to={`/product/${product._id}`}>
                                    <h4 className='text-light'>{product.brand} {product.model}</h4>
                                </Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    );
}

export default ProductsCarousel;
