const initialState = {
    order: []
};
    // customerName: '',
    // phone: '',
    // address: '',
    // items: null,
    // isTakeAway: false,
//}

const orderReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'LOAD_ORDER_LIST': 
        return {
            ...state,
            order: payload
        }
        case 'POST_ORDER': 
        return {
            ...state,
            order: [payload, ...state.order]
        }
        case 'DELETE_ORDER': 
        return {
            ...state,
            order: state.order.filter(item=> item._id !== payload)
        }
        case 'UPDATE_ORDER':
            const newOrderList = state.order.map(item => {
                if(item._id === payload._id) return payload;
                return item;
            })
            return {
                ...state,
                order: newOrderList
            };
        default:
            return state;
    }
}

export default orderReducer;