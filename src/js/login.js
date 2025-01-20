import { showAlert } from "./alerts";
import axios from "axios";
import { hideSpinner, showSpinner } from "./spinner";
export const BASE_URL = "http://localhost:3000/api/v1/";
export const login = async ({ email, password }) => {
  try {
    showSpinner();
    const res = await axios.post(`${BASE_URL}users/login`, {
      email,
      password,
    });
    if (res.data.status === "success") {
      showAlert("success", "Login successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (error) {
    showAlert("error", error.response?.data.message);
  } finally {
    hideSpinner();
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(`${BASE_URL}users/logout`);
    if (res?.data.status === "success") {
      showAlert("success", "Logout successfully");
      location.reload(true);
    }
  } catch (error) {
    console.log(error);
    showAlert("error", "error logging out.");
  }
};
