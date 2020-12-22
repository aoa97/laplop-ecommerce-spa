import {
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESPONSE,
    ORDER_CREATE_FAIL,
    ORDER_DATA_REQUEST,
    ORDER_DATA_RESPONSE,
    ORDER_DATA_FAIL,
    ORDER_DATA_RESET,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESPONSE,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_RESPONSE,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_RESPONSE,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_LIST_ADMIN_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_RESPONSE,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from '../constants/orderConstants';

export const orderDetailsReducer = (state = { shippingAddress: {}, paymentMethod: '' }, action) => {
    switch (action.type) {
        case SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload }
        case SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }
        default:
            return state
    }
}

export const orderCreateReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_RESPONSE:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDataReducer = (state = { order: { shippingAddress: {}, orderItems: [] }, loading: true }, action) => {
    switch (action.type) {
        case ORDER_DATA_REQUEST:
            return { ...state, loading: true }
        case ORDER_DATA_RESPONSE:
            return { ...state, loading: false, order: action.payload }
        case ORDER_DATA_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ORDER_DATA_RESET:
            return { order: { shippingAddress: {}, orderItems: [] }, loading: true }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_RESPONSE:
            return { loading: false, success: true }
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return { loading: true }
        case ORDER_DELIVER_RESPONSE:
            return { loading: false, success: true }
        case ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

export const orderMyListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return { ...state, loading: true }
        case ORDER_LIST_MY_RESPONSE:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_MY_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ORDER_LIST_MY_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderAdminListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_ADMIN_REQUEST:
            return { ...state, loading: true }
        case ORDER_LIST_ADMIN_RESPONSE:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_ADMIN_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ORDER_LIST_ADMIN_RESET:
            return { orders: [] }
        default:
            return state
    }
}