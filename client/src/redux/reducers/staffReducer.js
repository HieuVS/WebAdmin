const initialState = {
    staff: []
}

const staffReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'LOAD_STAFF_LIST': 
        return {
            ...state,
            staff: payload
        }

        case 'DELETE_STAFF': 
        console.log("STATE:", state)
        return {
            ...state,
            staff: state.staff.filter(item=> item._id !== payload)
        }
        default:
            return state;
    }
}

export default staffReducer;