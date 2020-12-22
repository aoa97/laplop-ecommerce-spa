import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import { Paper } from '@material-ui/core'

import Meta from '../components/Meta'
import Input from '../components/Input'
import Button from '../components/Button'
import Message from '../components/Message'
import Loader from '../components/Loader';
import { login } from './../actions/userActions';

function LoginPage({ history, location }) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, error, user } = useSelector(state => state.userLogin)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (user)
            history.push(redirect)
    }, [user, history, redirect])

    return (
        <>
            <Meta title='Sign in to your account' />

            <Row className="d-flex justify-content-center">
                <Col md={5}>
                    <Paper variant="outlined" className="px-4 py-5">
                        <h3 className="mb-2">Login</h3>

                        <Row className="mb-4">
                            <Col>
                                New Customer? <Link to='/register'>Register</Link>
                            </Col>
                        </Row>

                        {error && <Message severity="error" className="mb-3">{error}</Message>}

                        <Input placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
                        <Input secured placeholder="Password" onChange={e => setPassword(e.target.value)} />

                        {loading && (
                            <Button disabled>
                                <Loader circular size={20} />
                            </Button>
                        )}
                        {!loading && <Button onClick={loginHandler}>Sign in</Button>}

                        <Row className="mt-3">
                            <Col>
                                <Link to="/forgot">Forgot Password?</Link>
                            </Col>
                        </Row>
                    </Paper>
                </Col>
            </Row>
        </>
    );
}

export default LoginPage;