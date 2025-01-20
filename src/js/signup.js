import { showAlert } from "./alerts";
import axios from "axios";
import { hideSpinner, showSpinner } from "./spinner";
import { BASE_URL } from "./login";
export const signup = async ({ email, password, passwordConfirm, name }) => {
    try {
        showSpinner();
        const res = await axios.post(`${BASE_URL}users/signup`, {
            email,
            password,
            passwordConfirm,
            name
        });
        if (res.data.status === "success") {
            showAlert("success", res.data.message);
            window.setTimeout(() => {
                location.assign("/login");
            }, 1000);
        }
    } catch (error) {
        showAlert("error", error.response?.data.message);
    } finally {
        hideSpinner();
    }
};

