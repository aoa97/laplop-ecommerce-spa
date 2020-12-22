import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Tabs, Tag } from 'antd'

import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import Meta from '../components/Meta';
import Input from '../components/Input'
import Button from '../components/Button'
import Message from '../components/Message';
import Loader from '../components/Loader';


function ProfilePage({ history }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const { user: userLogin } = useSelector(state => state.userLogin)
    const { loading, error, user } = useSelector(state => state.userDetails)
    const { success } = useSelector(state => state.userUpdate)
    const { orders, loadingOrders, errorOrders } = useSelector(state => state.orderMyList)

    useEffect(() => {
        if (userLogin) {
            if (user) {
                setName(user.name)
                setEmail(user.email)
            } else {
                dispatch(getUserDetails('profile'))
            }
        } else {
            history.push('/login')
        }
    }, [user, dispatch, history, userLogin])

    useEffect(() => {
        dispatch(getMyOrders())
    }, [dispatch])

    const updateHandler = () => {
        if (password !== confirmPassword)
            return setMessage("Passwords don't match")

        dispatch(updateUserDetails('profile', { name, email, password }))
    }


    return (
        <>
            <Meta title="Profile" />

            <Tabs centered defaultActiveKey="1">
                <Tabs.TabPane tab="Your Details" key="1" className="col-md-7 m-auto">
                    {loading && <Loader className="mb-3" />}
                    {message && <Message className="mb-3" severity="error">{message}</Message>}
                    {error && <Message className="mb-3" severity="error">{error}</Message>}
                    {success && <Message className="mb-3" severity="success">Profile Updated</Message>}

                    <Input
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        label="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        secured
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Input
                        secured
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />

                    <Button onClick={updateHandler}>Save</Button>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Your Orders" key="2">
                    {loadingOrders ? <Loader /> : errorOrders ? <Message severity="error">{errorOrders}</Message> : (
                        <>
                            {orders.length === 0 ? (
                                <Message>
                                    Your order list is Empty
                                    <Link to="/" className="ml-2">Go Back</Link>
                                </Message>
                            ) : (
                                    <Table striped hover bordered responsive className="table-sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Date</th>
                                                <th>TOTAL</th>
                                                <th>PAID</th>
                                                <th>DELIVERED</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {orders.map(order => (
                                                <tr>
                                                    <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>{order.totalPrice} EGP</td>
                                                    <td>{order.isPaid ? <Tag color="#87d068">Paid</Tag> : <Tag color="#f50">Not Paid</Tag>}</td>
                                                    <td>{order.isDelivered ? <Tag color="#87d068">Delivered</Tag> : <Tag color="#ff6347">Not Delivered</Tag>}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                        </>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </>
    );
}

export default ProfilePage;