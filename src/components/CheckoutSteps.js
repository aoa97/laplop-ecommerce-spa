import React from 'react';
import { Steps } from 'antd';
import { useHistory } from 'react-router-dom'

const { Step } = Steps;

const CheckoutSteps = (props) => {
    const history = useHistory()

    return (
        <Steps progressDot current={props.current} className="mb-sm-4">
            <Step title="Login" />

            <Step
                style={{ cursor: 'pointer' }}
                title="Shipping"
                onClick={() => history.push('/shipping')}
            />

            <Step
                style={{ cursor: 'pointer' }}
                title="Payment"
                onClick={() => history.push('/payment')}
            />

            <Step
                style={{ cursor: 'pointer' }}
                title="Place Order"
                onClick={() => history.push('/placeorder')}
            />

        </Steps>
    );
}

export default CheckoutSteps;