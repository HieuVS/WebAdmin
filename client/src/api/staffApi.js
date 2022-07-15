import axios from "axios";
import { apiURL } from "../constants/api.constant";
import store from "../redux/store";

export const getStaff = async () => {
    try {
        const response = await axios.get(`${apiURL}/staff`);
        if(response.data.success) {
            store.dispatch({type: 'LOAD_STAFF_LIST', payload: response.data.staffs})
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const createStaff = async (staffForm) => {
    try {
        const response = await axios.post(`${apiURL}/staff`, staffForm);
        if(response.data.success) {
            store.dispatch({type: 'POST_STAFF', payload: response.data.staff})
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const updateStaff = async (updatedStaff) => {
    try {
        const response = await axios.post(`${apiURL}/staff/${updatedStaff._id}`, updatedStaff);
        if(response.data.success) {
            store.dispatch({type: 'UPDATE_STAFF', payload: response.data.staff})
            return response.data;
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}

export const deleteStaff = async (staffId) => {
    try {
        const response = await axios.delete(`${apiURL}/staff/${staffId}`)
        console.log("API ",response)
        if(response.data.success) {
        console.log("OKE")
            store.dispatch({type: 'DELETE_STAFF', payload: staffId})
            return response.data;
        }
    } catch (error) {
        //console.log("ERROR:",error)
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}