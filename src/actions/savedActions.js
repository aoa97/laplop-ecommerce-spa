import axios from 'axios'
import { ADD_TO_SAVED, REMOVE_FROM_SAVED, CLEAR_SAVED } from './../constants/savedConstants';

export const saveItem = (id) => async (dispatch, getState) => {
    // Fetch the data of the item
    const { data } = await axios.get(`/api/products/${id}`)

    // dispatch the action adding the fetched data
    dispatch({
        type: ADD_TO_SAVED,
        payload: {
            id: data._id,
            name: `${data.brand} ${data.model}`,
            image: data.image,
            price: data.price,
        }
    })

    // Save the new state to localStorage
    localStorage.setItem('saved', JSON.stringify(getState().savedItems.saved))
}

export const unSaveItem = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_SAVED, payload: id })

    localStorage.setItem('saved', JSON.stringify(getState().savedItems.saved))
}

export const clearSaved = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_SAVED })

    localStorage.removeItem('saved')
}