import { loginEvent, checkLoggedIn, resetPassword } from "./firebase.mjs";

checkLoggedIn();

const loginForm = document.querySelector(".loginForm");
const resetPasswordLink = document.querySelector(".reset-password-link");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;
    loginEvent(emailValue, passwordValue);
});

resetPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    const adminSubHeader = document.querySelector(".admin-sub-header");
    const emailField = document.getElementById("email");
    const passwordLabel = document.getElementById("password-label")
    const passwordField = document.getElementById("password");
    const loginButton = document.querySelector(".loginButton");

    passwordLabel.style.display = "none";
    passwordField.style.display = "none";
    loginButton.innerText = "Reset Password";
    adminSubHeader.innerText = "Enter Email";
    resetPasswordLink.innerText = "Cancel Reset";

    resetPasswordLink.addEventListener("click", () => {
        window.location.reload();
    })

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        resetPassword(emailField.value);

    })
})