import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_RESPONSE,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_RESPONSE,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_RESPONSE,
    PRODUCT_DELETE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESPONSE,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESPONSE,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESPONSE,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_RESPONSE,
    PRODUCT_TOP_FAIL,
} from './../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_RESPONSE:
            return { loading: false, products: action.payload.products, pages: action.payload.pages, page: action.payload.page }
        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const productTopReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { ...state, products: [] }
        case PRODUCT_TOP_RESPONSE:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [], specs: { storage: {} } } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_DETAILS_RESPONSE:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        case PRODUCT_DETAILS_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_RESPONSE:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: { specs: { storage: {} } } }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_RESPONSE:
            return { loading: false, success: true }
        case PRODUCT_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_RESPONSE:
            return { loading: false, success: true }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_RESPONSE:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}