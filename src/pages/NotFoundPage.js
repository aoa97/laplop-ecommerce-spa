import React from 'react';
import { Image, Button } from 'react-bootstrap';

import img from '../assets/svg/d.svg'

const NotFoundPage = ({ history }) => {
    return (
        <div className="notFound d-flex flex-column align-items-center">
            <Image
                fluid
                src={img}
                style={{ width: '40rem' }}
            />

            <Button
                variant="outline-light"
                onClick={() => history.push('/')}
            >Go to Home</Button>
        </div>
    );
}

export default NotFoundPage;