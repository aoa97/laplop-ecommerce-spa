import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { saveAddress } from '../actions/orderActions'
import Meta from '../components/Meta';
import CenteredContainer from '../components/CenteredContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import PageHeading from '../components/PageHeading';
import Input from '../components/Input';
import Button from '../components/Button';


const ShippingPage = ({ history }) => {
    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.orderDetails)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [postal, setPostal] = useState(shippingAddress.postal)

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(saveAddress({ address, city, country, postal }))
        history.push('/payment')
    }

    return (
        <>
            <Meta title='Shipping' />

            <CheckoutSteps current={1} />

            <CenteredContainer>
                <PageHeading>Shipping</PageHeading>

                <Input
                    label="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <Input
                    label="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <Input
                    label="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <Input
                    label="Postal Code"
                    value={postal}
                    onChange={e => setPostal(e.target.value)}
                />

                <Row className="mt-2">
                    <Col xs={6}>
                        <Button disabled>Previous</Button>
                    </Col>
                    <Col xs={6}>
                        <Button onClick={handleSubmit}>Next</Button>
                    </Col>
                </Row>
            </CenteredContainer>
        </>
    );
}

export default ShippingPage;