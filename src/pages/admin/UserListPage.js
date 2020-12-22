import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'
import { Check, Close, Delete, Edit } from '@material-ui/icons'
// import { Modal } from 'antd'

import { getUsers, deleteUser } from '../../actions/userActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import PageHeading from '../../components/PageHeading';

const UserListPage = ({ history }) => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.userList)
    const { success: successDelete } = useSelector(state => state.userDelete)
    const { user } = useSelector(state => state.userLogin)
    // const [deleteModal, setDeleteModal] = useState(false)

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id))
        }
    }

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, user, successDelete])

    return (
        <>
            <PageHeading>Users</PageHeading>

            { loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
                <Table striped responsive hover bordered className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <Check style={{ color: "#080" }} /> : <Close color="error" />}</td>
                                <td className="d-flex justify-content-between">
                                    <IconButton size="small" onClick={() => history.push(`/admin/user/${user._id}/edit`)}>
                                        <Edit color="primary" />
                                    </IconButton>

                                    <div className="vl"></div>

                                    <IconButton size="small" onClick={() => handleDelete(user._id)}>
                                        <Delete color="error" />
                                    </IconButton>

                                    {/* Delete confirm pop-up */}
                                    {/* <Modal
                                        title="Delete a user"
                                        visible={deleteModal}
                                        onOk={() => handleDelete(user._id)}
                                        onCancel={() => setDeleteModal(false)}
                                    >
                                        <p>Are you sure to delete this user?</p>
                                    </Modal> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default UserListPage;