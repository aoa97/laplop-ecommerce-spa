import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/cartConstants';

export const cartItemsReducer = (state = { cart: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            const exist = state.cart.find(x => x.product === item.product)
            if (exist)
                return { ...state, cart: state.cart.map(x => x.product === exist.product ? item : x) }
            else
                return { ...state, cart: [...state.cart, item] }
        case REMOVE_FROM_CART:
            return { cart: state.cart.filter(x => x.product !== action.payload) }
        default:
            return state
    }
}