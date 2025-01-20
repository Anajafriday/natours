import axios from "axios";
import { showAlert } from "./alerts";
import { hideSpinner, showSpinner } from "./spinner";
import { BASE_URL } from "./login";

export const bookTour = async (tourId) => {
  try {
    showSpinner();
    const session = await axios.get(`${BASE_URL}bookings/check-out/${tourId}`);
    // redirect to checkout page
    if (session.data.status === "success") {
      window.setTimeout(() => {
        window.open(`${session.data.session.url}`, "_blank"); // Open in a new tab
      }, 500);
    }
  } catch (error) {
    showAlert("error", error.response?.data.message);
  } finally {
    hideSpinner();
  }
};
