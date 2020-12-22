import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap'
import { Paper } from '@material-ui/core'

import { register } from './../actions/userActions';
import Meta from '../components/Meta'
import Input from '../components/Input'
import Button from '../components/Button'
import Message from '../components/Message';
import Loader from '../components/Loader';

function RegisterPage({ history }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, error, user } = useSelector(state => state.userRegister)

    const registerHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }

    useEffect(() => {
        if (user)
            history.push('/')
    }, [user, history])

    return (
        <>
            <Meta title='Create a new account' />

            <Row className="d-flex justify-content-center">
                <Col md={5}>
                    <Paper variant="outlined" className="px-4 py-5">
                        <h3 className="mb-2">Join us</h3>

                        <Row className="mb-4">
                            <Col>
                                Have an account? <Link to='/login'>Login</Link>
                            </Col>
                        </Row>

                        {error && <Message severity="error" className="mb-3">{error}</Message>}

                        <Form>
                            <Input placeholder="Name" onChange={e => setName(e.target.value)} />

                            <Input placeholder="E-mail" onChange={e => setEmail(e.target.value)} />

                            <Input secured placeholder="Password" onChange={e => setPassword(e.target.value)} />

                            {loading && (
                                <Button disabled>
                                    <Loader circular size={20} />
                                </Button>
                            )}
                            {!loading && <Button onClick={registerHandler}>Sign Up</Button>}
                        </Form>
                    </Paper>
                </Col>
            </Row>
        </>
    );
}

export default RegisterPage;