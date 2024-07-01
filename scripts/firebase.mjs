import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";

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
    const querySnapshot = await getDocs(projects);
    const projectsData = [];
    querySnapshot.forEach((project) => {
      projectsData.push(project.data());
    });
    return projectsData;
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

export { getAllProjects, getSingleProject };