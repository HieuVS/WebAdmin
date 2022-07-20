import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";

export const getTable = async () => {
    try {
        const response = await axios.get(`${apiURL}/table`);
        if(response.data.success) {
            store.dispatch({type: 'LOAD_TABLE_LIST', payload: response.data.table})
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const createTable = async (tableForm) => {
    try {
        const response = await axios.post(`${apiURL}/table`, tableForm);
        if(response.data.success) {
            store.dispatch({type: 'CREATE_TABLE', payload: response.data.table})
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const deleteTable = async (tableId) => {
    try {
        const response = await axios.delete(`${apiURL}/table/${tableId}`);
        if(response.data.success) {
            store.dispatch({type: 'DELETE_TABLE', payload: tableId})
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const updateTable = async (updatedTable) => {
    try {
        const response = await axios.put(`${apiURL}/table/${updatedTable._id}`, updatedTable);
        if(response.data.success) {
            store.dispatch({type: 'UPDATE_TABLE', payload: response.data.table})
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}