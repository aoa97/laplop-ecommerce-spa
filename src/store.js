import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { productListReducer, productDetailsReducer, productDeleteReducer, productUpdateReducer, productCreateReducer, productCreateReviewReducer, productTopReducer } from './reducers/productReducers';
import { orderCreateReducer, orderDetailsReducer, orderDataReducer, orderPayReducer, orderMyListReducer, orderAdminListReducer, orderDeliverReducer } from './reducers/orderReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer, userDeleteReducer } from './reducers/userReducers';
import { cartItemsReducer } from './reducers/cartReducers';
import { savedItemsReducer } from './reducers/savedReducers';

const reducers = combineReducers({
    productList: productListReducer,
    productTop: productTopReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    productCreate: productCreateReducer,
    productCreateReview: productCreateReviewReducer,
    cartItems: cartItemsReducer,
    savedItems: savedItemsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderDetails: orderDetailsReducer,
    orderCreate: orderCreateReducer,
    orderData: orderDataReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderMyList: orderMyListReducer,
    orderAdminList: orderAdminListReducer,
})

const initialState = {
    cartItems: { cart: JSON.parse(localStorage.getItem('cart')) || [] },
    savedItems: { saved: JSON.parse(localStorage.getItem('saved')) || [] },
    userLogin: { user: JSON.parse(localStorage.getItem('user') || null) },
    orderDetails: {
        shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
        paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || '',
    }
}

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store