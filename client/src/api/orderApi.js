import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";

export const getOrder = async () => {
    try {
        const response = await axios.get(`${apiURL}/order`)
        if(response.data.success) {
            //console.log(typeof response.data.orderList[0].createAt)
            store.dispatch({type: 'LOAD_ORDER_LIST', payload: response.data.orderList})           
        }
        //console.log("After DISPATCHING: ", store.getState().order);
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

