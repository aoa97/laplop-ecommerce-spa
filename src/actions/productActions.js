import axios from 'axios'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_RESPONSE,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_RESPONSE,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_RESPONSE,
    PRODUCT_DELETE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESPONSE,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESPONSE,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESPONSE,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_RESPONSE,
    PRODUCT_TOP_FAIL
} from '../constants/productConstants'

export const getProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({ type: PRODUCT_LIST_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const getTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get('/api/products/top')

        dispatch({ type: PRODUCT_TOP_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const getProductById = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({ type: PRODUCT_DETAILS_RESPONSE, payload: data })
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)
        dispatch({ type: PRODUCT_DELETE_RESPONSE })
    } catch (e) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const updateProduct = (id, newProduct) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        }

        await axios.put(`/api/products/${id}`, newProduct, config)
        dispatch({ type: PRODUCT_UPDATE_RESPONSE })
    } catch (e) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        }

        await axios.post(`/api/products`, product, config)
        dispatch({ type: PRODUCT_CREATE_RESPONSE })
    } catch (e) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const createReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { userLogin: { user } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        }

        await axios.post(`/api/products/${id}/review`, review, config)
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESPONSE })
    } catch (e) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

