const initialState = {
    
}

const tableReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'LOAD_TABLE_LIST': 
            return {
                ...state,
                tables: payload
            }
        case 'CREATE_TABLE': 
            return {
                ...state,
                tables: [payload, ...state.tables]
            }
        case 'DELETE_TABLE':
            return {
                ...state,
                tables: state.tables.filter(item => item._id !== payload)
            }
        case 'UPDATE_TABLE':
            const newItemList = state.tables.map(item => {
                if(item._id === payload._id) return payload;
                return item;
            })    
            return {
                ...state,
                tables: newItemList
            }
        default:
            return state;
    }
}

export default tableReducer;