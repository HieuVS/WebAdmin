const initialState = {
    types: []
}

const categoryReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'LOAD_CATEGORY': 
        return {
            ...state,
            types: payload
        }
        case 'ADD_CATEGORY': 
        return {
            ...state,
            types: [...state.types, payload]
        }
        case 'DELETE_CATEGORY_TYPE': 
        return {
            ...state,
            types: state.types.filter(item => item._id !== payload)
        }
        default:
        return state;
    }
}

export default categoryReducer;