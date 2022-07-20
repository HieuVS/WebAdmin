import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";


export const updateTablePay = async (updatedTable) => {
    try {
        const response = await axios.put(`${apiURL}/table/payment/${updatedTable._id}`, updatedTable);
        if(response.data.success) {
            store.dispatch({type: 'UPDATE_TABLE_PAY', payload: response.data.table})
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const makeOrderSchedule = async (scheduleForm) => {
    try {
        const response = axios.post(`${apiURL}/order`, scheduleForm);
        if(response.data.success)  {
            store.dispatch({type: 'POST_ORDER', payload: response.data.order});
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const makePaymentSchedule = async (scheduleForm) => {
    try {
        const response = axios.post(`${apiURL}/payment`, scheduleForm);
        if(response.data.success)  {
            store.dispatch({type: 'CREATE_PAYMENT', payload: response.data.payment});
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}