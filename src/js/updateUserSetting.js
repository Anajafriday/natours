import axios from "axios";
import { BASE_URL } from "./login";
import { showAlert } from "./alerts";
import { hideSpinner, showSpinner } from "./spinner";

export const updateUserSetting = async (data, type) => {
  const url = type === "password" ? "updatePassword" : "updateMe";
  try {
    showSpinner();
    const res = await axios.patch(`${BASE_URL}users/${url}`, data);
    if (res.data.status === "success") {
      showAlert(
        "success",
        type === "data" ? res.data.message : "password updated successfully"
      );
    }
  } catch (error) {
    // console.log(error.response?.data);
    showAlert("error", error.response?.data.message);
  } finally {
    hideSpinner();
  }
};
