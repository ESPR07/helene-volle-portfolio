import { checkLoggedIn, logoutEvent } from "./firebase.mjs";

checkLoggedIn();

const logoutButton = document.querySelector(".logoutButton");

logoutButton.addEventListener("click", logoutEvent);