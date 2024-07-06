import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
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

function checkLoggedIn() {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if(user) {
      return
    } else {
      window.location.href = "/admin.html";
    }
  })
}

async function setProject(projectID, projectObject){
  await setDoc(doc(db, "projects", projectID), projectObject);
}

async function removeProject(projectID){
  await deleteDoc(doc(db, "projects", projectID));
}

export { getAllProjects, getSingleProject, loginEvent, logoutEvent, checkLoggedIn, setProject, removeProject};