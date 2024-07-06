import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDllgPyI1tjBDjE6ZxyO0Yeyf7mkKY9EG0",
  authDomain: "helene-volle-portfolio.firebaseapp.com",
  projectId: "helene-volle-portfolio",
  storageBucket: "helene-volle-portfolio.appspot.com",
  messagingSenderId: "994726005931",
  appId: "1:994726005931:web:ef12d00c13c019b7f0fbee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const projects = collection(db, "projects");

async function getAllProjects() {
    try {
      const querySnapshot = await getDocs(projects);
      const projectsData = [];
      querySnapshot.forEach((project) => {
        projectsData.push(project.data());
      });
      return projectsData;
    } catch(error) {
      console.error(error);
    }
  }

async function getSingleProject(projectID) {
  const projectRef = doc(db, "projects", projectID);
  const projectSnapshot = await getDoc(projectRef);

  if(projectSnapshot.exists()) {
    const projectData = projectSnapshot.data();
    return projectData;
  } else {
    console.log(`Project with ID ${projectID} does not exist.`);
    return null;
  }
}

function loginEvent(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      window.location.href = "/pages/adminMyWork.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      alert("Email or password incorrect");
    })
}

function logoutEvent() {
  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href = "/";
  }).catch((error) => {
    console.error(error);
  })
}

function checkNotLoggedIn() {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if(user) {
      return
    } else {
      window.location.href = "/admin.html";
    }
  })
}

function checkLoggedIn() {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if(user) {
      window.location.href = "/pages/adminMyWork.html";
    } else {
      return
    }
  })
}

async function setProject(projectID, projectObject){
  await setDoc(doc(db, "projects", projectID), projectObject);
}

async function removeProject(projectID){
  await deleteDoc(doc(db, "projects", projectID));
}

export { getAllProjects, getSingleProject, loginEvent, logoutEvent, checkLoggedIn, checkNotLoggedIn, setProject, removeProject};