import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form")

const handleFormSubmit = (event) => {
  event.preventDefault()

  const form = event.target.elements

  const delay = Number(form.delay.value);
  const state = form.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay)
      } else {
        reject(delay)
      }
    }, delay)
  }).then((value) => {
    iziToast.success({message: `✅ Fulfilled promise in ${value}ms`, icon: ""})
  }).catch((error) => {
    iziToast.error({message: `❌ Rejected promise in ${error}ms`, icon: ""})
  })
}

formEl.addEventListener("submit", handleFormSubmit)