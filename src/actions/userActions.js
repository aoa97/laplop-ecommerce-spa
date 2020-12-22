import axios from 'axios'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESPONSE,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESPONSE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESPONSE,
    USER_REGISTER_FAIL,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESPONSE,
    USER_UPDATE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESPONSE,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_RESPONSE,
    USER_DELETE_FAIL,
} from './../constants/userConstants';

export const login = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({ type: USER_LOGIN_RESPONSE, payload: data })

        localStorage.setItem('user', JSON.stringify(data))
    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const logOut = () => async (dispatch) => {
    localStorage.removeItem('user')

    // Reset States
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
}

export const register = (name, email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config)

        dispatch({ type: USER_REGISTER_RESPONSE, payload: data })

        dispatch({ type: USER_LOGIN_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        // {id} => either an actual id or hard-coded 'profile'
        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({ type: USER_DETAILS_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const updateUserDetails = (id, updatedUser) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        // {id} => either an actual id or hard-coded 'profile'
        const { data } = await axios.put(`/api/users/${id}`, updatedUser, config)

        dispatch({ type: USER_UPDATE_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const getUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.get('/api/users', config)

        dispatch({ type: USER_LIST_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)
        dispatch({ type: USER_DELETE_RESPONSE })
    } catch (e) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}