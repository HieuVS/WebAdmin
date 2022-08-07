import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";


export const updateTablePay = async (updatedTable) => {
    //console.log('updatedTable ',updatedTable)

    try {
        const response = await axios.put(`${apiURL}/table/payment/${updatedTable._id}`, updatedTable);
        if(response.data.success) {
            console.log('res',response.data.message)
            store.dispatch({type: 'UPDATE_TABLE', payload: response.data.table})
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const makeOrderSchedule = async (scheduleForm) => {
    //console.log('OrderSchedule ',scheduleForm)
    try {
        const response = await axios.post(`${apiURL}/order`, scheduleForm);
        if(response.data.success)  {
            store.dispatch({type: 'POST_ORDER', payload: response.data.order});
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

