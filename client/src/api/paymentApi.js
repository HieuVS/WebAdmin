import axios from "axios"
import { apiURL } from "../constants/api.constant"
import store from "../redux/store";

export const getPaymentSchedule = async () => {
    try {
        const response = await axios.get(`${apiURL}/payment/tablePerWeek`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'GET_PAY_SCHEDULE_LIST', payload: response.data.weekOfPayment});
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const getPaymentOrder = async () => {
    try {
        const response = await axios.get(`${apiURL}/payment/orderPerWeek`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'GET_PAY_ORDER_LIST', payload: response.data.weekOfPayment});
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const getTotalAmountDaily = async () => {
    try {
        const response = await axios.get(`${apiURL}/payment/amountPerWeek`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'GET_TOTAL_AMOUNT_DAILY', payload: response.data.totalAmountPerDay});
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const getProduct = async () => {
    try {
        const response = await axios.get(`${apiURL}/payment/product`);
        if(response.data.success) {
            //console.log(response.data.productList)
            store.dispatch({type: 'GET_TOTAL_PRODUCT', payload: response.data.productList});
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const createPayment = async (dataForm) => {
    console.log('dataForm ',dataForm)
    try {
        const response = await axios.post(`${apiURL}/payment`, dataForm);
        if(response.data.success)  {
            //store.dispatch({type: 'CREATE_PAYMENT', payload: response.data.payment});
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}