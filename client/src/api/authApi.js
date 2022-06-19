import axios from "axios";
import { apiURL, LOCAL_STORAGE_KEY } from "../constants/api.constant";
import store from "../redux/store";
import setAuthToken from "../utils/setAuthToken";
import { actionAuths } from "../redux/actions/actionAuths";

export const loadUser = async () => {
  if (localStorage[LOCAL_STORAGE_KEY])
    setAuthToken(localStorage[LOCAL_STORAGE_KEY]);
  await store.dispatch(actionAuths);
};

export const loginUser = async (loginForm) => {
  try {
    const response = await axios.post(`${apiURL}/auth/login`, loginForm);
    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_KEY, response.data.accessToken);

    await loadUser();
    return response.data;
  } catch (error) {
    if (error.response.data) return error.response.data;
    else return { success: false, message: error.message };
  }
};

export const registerUser = async (registerForm) => {
  try {
    const response = await axios.post(`${apiURL}/auth/register`, registerForm);
    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_KEY, response.data.accessToken);

    await loadUser();
    return response.data;
  } catch (error) {
    if (error.response.data) {
      console.log(error.response.data);
      return error.response.data;
    } else return { success: false, message: error.message };
  }
};

export const logoutUser = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  store.dispatch({
    type: "SET_AUTH",
    payload: { isAuthenticated: false, user: null },
  });
};
