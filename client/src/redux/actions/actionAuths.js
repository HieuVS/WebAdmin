import axios from "axios";
import { apiURL, LOCAL_STORAGE_KEY } from "../../constants/api.constant";
import setAuthToken from "../../utils/setAuthToken";

export const actionAuths = async (dispatch, getState) => {
    console.log("actionAuth.js")
    try {
        const responseAuth = await axios.get(`${apiURL}/auth`);
        //console.log(responseAuth.data.user);
        console.log("Before DISPATCHING: ", getState().auth);
        if(responseAuth.data.success) {
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: true, user: responseAuth.data.user}
            })
        }
        console.log("AFTER DISPATCHING: ", getState().auth);
    } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setAuthToken(null);
        dispatch({
            type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
        })
        console.log(error)
    }
}