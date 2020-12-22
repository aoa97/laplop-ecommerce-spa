import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { Radio } from 'antd'

import { saveMethod } from '../actions/orderActions';
import Meta from '../components/Meta';
import CenteredContainer from '../components/CenteredContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import PageHeading from '../components/PageHeading';
import Button from '../components/Button';

const PaymentPage = ({ history }) => {
    const dispatch = useDispatch()
    const [method, setMethod] = useState('PayPal')

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(saveMethod(method))
        history.push('/placeorder')
    }

    return (
        <>
            <Meta title='Payment' />

            <CheckoutSteps current={2} />

            <CenteredContainer>
                <PageHeading>Payment</PageHeading>

                <Typography>Choose Payment Method</Typography>
                <Radio.Group value={method} onChange={e => setMethod(e.target.value)}>
                    <Radio className="d-block my-2" value="PayPal">PayPal</Radio>
                    <Radio className="d-block mb-2" value="Cash on Delivery">Cash on Delivery</Radio>
                </Radio.Group>

                <Row className="mt-2">
                    <Col xs={6}>
                        <Button variant="outlined" onClick={() => history.goBack()}>Previous</Button>
                    </Col>
                    <Col xs={6}>
                        <Button onClick={handleSubmit}>Next</Button>
                    </Col>
                </Row>
            </CenteredContainer>
        </>
    );
}

export default PaymentPage;