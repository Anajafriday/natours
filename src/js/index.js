import { renderMap } from "./mapbox";
import { login, logout } from "./login";
import { updateUserSetting } from "./updateUserSetting";
import { bookTour } from "./stripe";
import { signup } from "./signup";
const loginForm = document.querySelector(".form-login");
const signupForm = document.querySelector(".form-signup");
const updateUserForm = document.querySelector(".form-user-data");
const locationsEl = document.getElementById("map");
const logoutBtn = document.querySelector(".nav__el--logout");
const changePasswordForm = document.querySelector(".form--password-setting");
const bookTourBtn = document.getElementById("book-tour");
if (locationsEl) {
  const locations = JSON.parse(locationsEl.dataset.locations);
  renderMap(locations);
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (signupForm)
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("fullname");
    const passwordConfirm = formData.get("passwordConfirm");
    signup({ email, password, name, passwordConfirm });
  });


if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    login({ email, password });
  });



if (updateUserForm) {
  updateUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("photo", document.getElementById("photo").files[0]);
    // preview the profle  image after submit
    if (document.getElementById("photo").files[0]) {
      // create  a blob from the file
      const objurl = URL.createObjectURL(
        document.getElementById("photo").files[0]
      );
      // selecte the user_image
      const userAvatar = document.querySelector(".form__user-photo");
      userAvatar.src = objurl; //set the source attribute to the  blob
      userAvatar.style.objectFit = "cover"; // fix scale
      userAvatar.style.objectPosition = "Center"; // fix postion
    }
    updateUserSetting(formData, "data");
  });
}

//
if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    await updateUserSetting(
      { currentPassword, password: newPassword, passwordConfirm },
      "password"
    );
    form.reset();
  });
}

const photoInput = document.getElementById("photo");
const photoInputLabel = document.querySelector(".file-label");
if (photoInput && photoInputLabel) {
  // console.log(photoInput, photoInputLabel);
  photoInput.addEventListener("change", () => {
    photoInputLabel.style.color = "rgba(40, 180, 135, 0.85)";
    photoInputLabel.style.fontWeight = "bold";
  });
}

if (bookTourBtn) {
  bookTourBtn.addEventListener("click", (e) => {
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
