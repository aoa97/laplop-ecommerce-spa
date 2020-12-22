import { ADD_TO_SAVED, REMOVE_FROM_SAVED, CLEAR_SAVED } from './../constants/savedConstants';

export const savedItemsReducer = (state = { saved: [] }, action) => {
    switch (action.type) {
        case ADD_TO_SAVED:
            const item = action.payload
            const exist = state.saved.find(x => x.id === item.id)
            if (exist)
                return { saved: state.saved.map(x => x.id === exist.id ? item : x) } // Override the exist with the latest version of it
            else
                return { saved: [...state.saved, item] }
        case REMOVE_FROM_SAVED:
            return { saved: state.saved.filter(x => x.id !== action.payload) }
        case CLEAR_SAVED:
            return { saved: [] }
        default:
            return state
    }
}