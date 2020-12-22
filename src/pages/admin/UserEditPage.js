import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, Checkbox } from '@material-ui/core'

import { getUserDetails, updateUserDetails } from '../../actions/userActions';
import Input from '../../components/Input'
import Button from '../../components/Button'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import PageHeading from '../../components/PageHeading';

const EditUserPage = ({ history, match }) => {
    const userId = match.params.id
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const { loading, error, user } = useSelector(state => state.userDetails)
    const { success } = useSelector(state => state.productUpdate)

    const handleUpdate = () => {
        dispatch(updateUserDetails(userId, { name, email, isAdmin }))
    }

    useEffect(() => {
        if (success) {
            history.push('/admin/users')
        }
        else {
            if (!user.name || user._id !== userId)
                dispatch(getUserDetails(userId))
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, dispatch, userId, history, success])

    return (
        <div className="col-md-6 m-auto pt-4">
            <PageHeading>Edit User</PageHeading>

            {loading && <Loader className="mb-3" />}
            {error && <Message className="mb-3" severity="error">{error}</Message>}

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
            <FormControlLabel
                label="Admin"
                control={<Checkbox
                    color="primary"
                    checked={isAdmin}
                    onChange={e => setIsAdmin(e.target.checked)}
                />}
            />

            <Button onClick={handleUpdate}>Update</Button>
        </div>
    );
}

export default EditUserPage;