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

export const postOrder = async (orderForm) => {
    try {
        const response = await axios.post(`${apiURL}/order`, orderForm);
        if(response.data.success)  {
            store.dispatch({type: 'POST_ORDER', payload: response.data.order});
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${apiURL}/order/${orderId}`);
        if(response.data.success)
            store.dispatch({type: 'DELETE_ORDER', payload: orderId});
            return response.data;
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const updateOrder = async (updatedOrder) => {
    try {
        const response = await axios.put(`${apiURL}/order/${updatedOrder._id}`, updatedOrder);
        if(response.data.success) {
            console.log("PUT: ",response.data)
            store.dispatch({type: 'UPDATE_ORDER', payload: response.data.order});
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}