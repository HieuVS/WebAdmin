const initialState = {
    
}

const itemReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'LOAD_ITEM_LIST': 
        return {
            ...state,
            items: payload
        }
        case 'CREATE_ITEM': 
        return {
            ...state,
            items: [...state.items, payload]
        }
        default:
        return state;
    }
}

export default itemReducer;