import { loginEvent, checkLoggedIn } from "./firebase.mjs";

checkLoggedIn();

const loginForm = document.querySelector(".loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;
    loginEvent(emailValue, passwordValue);
});