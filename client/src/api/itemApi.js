import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";

export const getItem = async () => {
    try {
        const response = await axios.get(`${apiURL}/item`);
        if(response.data.success) {
            console.log(response.data)
            store.dispatch({type: 'LOAD_ITEM_LIST', payload: response.data.itemList})           
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}