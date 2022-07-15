import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";

export const getItem = async () => {
    try {
        const response = await axios.get(`${apiURL}/item`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'LOAD_ITEM_LIST', payload: response.data.itemList})           
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const postItem = async (itemForm) => {
    try {
        const response = await axios.post(`${apiURL}/item`, itemForm);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'CREATE_ITEM', payload: response.data.item});
            return response.data;     
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const putItem = async (item) => {
    try {
        const response = await axios.put(`${apiURL}/item/${item._id}`, item);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'UPDATE_ITEM', payload: response.data.item});
            return response.data;     
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const deleteItem = async (deletedItemId) => {
    try {
        const response = await axios.delete(`${apiURL}/item/${deletedItemId}`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'DELETE_ITEM', payload: deletedItemId});
            return response.data;     
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}