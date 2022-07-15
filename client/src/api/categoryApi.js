import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";
import Staff from "../views/Staff";

export const getType = async () => {
    try {
        const response = await axios.get(`${apiURL}/category`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'LOAD_CATEGORY', payload: response.data.category})           
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const postType = async (type) => {
    try {
        const response = await axios.post(`${apiURL}/category`,type);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'ADD_CATEGORY', payload: response.data.type})     
            return response.data;      
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const deleteType = async (id) => {
    try {
        const response = await axios.delete(`${apiURL}/category/${id}`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'DELETE_CATEGORY_TYPE', payload: id})          
            return response.data; 
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}