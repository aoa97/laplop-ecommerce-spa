import axios from 'axios'
import { ADD_TO_CART, REMOVE_FROM_CART } from './../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data._id,
            name: `${data.brand} ${data.model}`,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cartItems.cart))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id })

    localStorage.setItem('cart', JSON.stringify(getState().cartItems.cart))
}