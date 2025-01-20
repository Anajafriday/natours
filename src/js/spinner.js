export const hideSpinner = () => {
  const el = document.querySelector(".spinner--container");
  if (el) el.parentElement.removeChild(el);
};
export const showSpinner = () => {
  const spinnerEl = `<div class="spinner--container"><div class="spinner-6"></div></div>`;
  document.body.insertAdjacentHTML("afterbegin", spinnerEl);
};
