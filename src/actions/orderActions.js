import axios from 'axios'
import {
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESPONSE,
    ORDER_CREATE_FAIL,
    ORDER_DATA_REQUEST,
    ORDER_DATA_RESPONSE,
    ORDER_DATA_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESPONSE,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_RESPONSE,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_RESPONSE,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_RESPONSE,
    ORDER_DELIVER_FAIL
} from '../constants/orderConstants';

export const saveAddress = (address) => async (dispatch, getState) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: address })

    localStorage.setItem('shippingAddress', JSON.stringify(getState().orderDetails.shippingAddress))
}

export const saveMethod = (method) => async (dispatch, getState) => {
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: method })

    localStorage.setItem('paymentMethod', JSON.stringify(getState().orderDetails.paymentMethod))
}

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })

        const { user } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.post('/api/orders', order, config)

        dispatch({ type: ORDER_CREATE_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: e.resonse && e.resonse.data.message ? e.response.data.message : e.message
        })
    }
}

export const getOrderData = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DATA_REQUEST })

        const { user } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({ type: ORDER_DATA_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: ORDER_DATA_FAIL,
            payload: e.resonse && e.resonse.data.message ? e.response.data.message : e.message
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })

        const { user } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

        dispatch({ type: ORDER_PAY_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: e.resonse && e.resonse.data.message ? e.response.data.message : e.message
        })
    }
}

export const deliverOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST })

        const { user } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config)

        dispatch({ type: ORDER_DELIVER_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: e.resonse && e.resonse.data.message ? e.response.data.message : e.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST })

        const { user } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.get('/api/orders/myOrders', config)

        dispatch({ type: ORDER_LIST_MY_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: e.resonse && e.resonse.data.message ? e.response.data.message : e.message
        })
    }
}

export const getAdminOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_ADMIN_REQUEST })

        const { user } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.get('/api/orders', config)

        dispatch({ type: ORDER_LIST_ADMIN_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload: e.resonse && e.resonse.data.message ? e.response.data.message : e.message
        })
    }
} 