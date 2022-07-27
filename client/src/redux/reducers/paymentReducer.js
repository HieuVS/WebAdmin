const initialState = {
    payments: {}
}

const paymentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'GET_PAY_SCHEDULE_LIST':
            return {
                ...state,
               payments: {...state.payments,schedule: payload}
            }
        case 'GET_PAY_ORDER_LIST':
            return {
                ...state,
                payments: {...state.payments,order: payload}
            }
        case 'GET_TOTAL_AMOUNT_DAILY': 
            return {
                ...state,
                payments: {...state.payments, totalAmount: payload}
            }
            case 'GET_TOTAL_PRODUCT': 
            return {
                ...state,
                payments: {...state.payments, countItem: payload}
            }
        default: 
            return state;
    }
}


export default paymentReducer;