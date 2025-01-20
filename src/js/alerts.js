export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};
// status could error|| success
export const showAlert = (status, mesg) => {
  hideAlert();
  const alertMarkup = `<div class="alert alert--${status}">${mesg}</div>`;
  document.body.insertAdjacentHTML("afterbegin", alertMarkup);
  window.setTimeout(hideAlert, 5000);
};
