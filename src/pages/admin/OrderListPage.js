import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'
import { Tag } from 'antd'

import { deliverOrder, getAdminOrders } from '../../actions/orderActions';
import { ORDER_DATA_RESET } from '../../constants/orderConstants';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import PageHeading from '../../components/PageHeading';
import Button from '../../components/Button';

const OrderListPage = ({ history }) => {
    const dispatch = useDispatch()
    const { orders, loading, error } = useSelector(state => state.orderAdminList)
    const { user } = useSelector(state => state.userLogin)
    const { success: successDeliver } = useSelector(state => state.orderDeliver)

    useEffect(() => {
        dispatch({ type: ORDER_DATA_RESET })

        if (user && user.isAdmin) {
            dispatch(getAdminOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, user, successDeliver])

    return (
        <>
            <PageHeading>Orders</PageHeading>

            {loading ? <Loader /> : error ? <Message severity="error">{error}</Message> : (
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
                                        <th>User</th>
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
                                            <td>{order.user && order.user.name}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice} EGP</td>
                                            <td>{order.isPaid ? <Tag color="#87d068">Paid</Tag> : <Tag color="#f50">Not Paid</Tag>}</td>
                                            <td>{order.isDelivered ? <Tag color="#87d068">Delivered</Tag> : <Tag color="#ff6347">Not Delivered</Tag>}</td>
                                            <td>
                                                <Button
                                                    disabled={order.isDelivered}
                                                    onClick={() => dispatch(deliverOrder(order._id))}
                                                >Mark as Delivered</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                </>
            )}
        </>
    );
}

export default OrderListPage;