import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
      window.location.href = "/pages/adminProjectPage.html";
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

// function createProject(projectDetails) {

// }

export { getAllProjects, getSingleProject, loginEvent, logoutEvent, checkLoggedIn };