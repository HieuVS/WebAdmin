const initialState = {
    discounts: []
}

const discountReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'LOAD_DISCOUNT': 
        return {
            ...state,
            discounts: payload
        }
        case 'ADD_DISCOUNT': 
        return {
            ...state,
            discounts: [...state.discounts, payload]
        }
        case 'DELETE_DISCOUNT': 
        return {
            ...state,
            discounts: state.discounts.filter(item => item._id !== payload)
        }
        default:
        return state;
    }
}

export default discountReducer;