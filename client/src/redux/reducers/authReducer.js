const initialState = {
    authLoading: true,
	isAuthenticated: false,
	user: null
}

const authReducer = (state = initialState, action) => {
    //console.log("Action là: ",action)
    const { type, payload } = action;
    switch(type) {
        case 'SET_AUTH': 
        return {
            ...state,
            authLoading: false,
            ...payload
        }
        default: 
        return state;
    }
}

export default authReducer;