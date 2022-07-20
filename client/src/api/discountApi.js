import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";

export const getDiscount = async () => {
    try {
        const response = await axios.get(`${apiURL}/discount`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'LOAD_DISCOUNT', payload: response.data.discountList})           
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const createDiscount = async (discount) => {
    try {
        const response = await axios.post(`${apiURL}/discount`,discount);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'ADD_DISCOUNT', payload: response.data.discount})     
            return response.data;      
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const deleteDiscount = async (id) => {
    try {
        const response = await axios.delete(`${apiURL}/discount/${id}`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'DELETE_DISCOUNT', payload: id})          
            return response.data; 
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}