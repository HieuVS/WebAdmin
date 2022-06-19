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
        default:
            return state;
    }
}

export default orderReducer;