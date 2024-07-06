import { getAllProjects, checkNotLoggedIn, logoutEvent } from "./firebase.mjs";

checkNotLoggedIn();

const logoutButton = document.querySelector(".logoutButton");

logoutButton.addEventListener("click", logoutEvent);

const allProjects = await getAllProjects();

async function renderHTML(){
    const imageGrid = document.querySelector(".image-grid");
    
    for(let i=0; i<allProjects.length; i++){
        const thisObjectData = allProjects[i];
        const firstImageData = thisObjectData.images[0];
        const formatedTitleForURL = thisObjectData.name.toLowerCase().replaceAll(" ", "_");

        //creating new HTML objects
        const newClickableProject = document.createElement("a");
        const projectInfo = document.createElement("span");
        const projectTitle = document.createElement("h2");
        const projectDescription = document.createElement("p");
    
        projectDescription.innerText = thisObjectData.short_description;
        projectTitle.innerText = thisObjectData.name;
        projectInfo.className = "project-info";
        newClickableProject.href =`/pages/adminProjectPage.html?id=${formatedTitleForURL}`;
        newClickableProject.style.backgroundImage = `url(https://lh3.googleusercontent.com/d/${firstImageData.link})`;
        newClickableProject.className = "project-card"

        //Appending HTML
        projectInfo.appendChild(projectTitle);
        projectInfo.appendChild(projectDescription);
        newClickableProject.appendChild(projectInfo);
        imageGrid.prepend(newClickableProject); 
        
        //Adding tags on smaller projects
        if(thisObjectData.project_type != "main"){
            const projectTag = document.createElement("p");
            projectTag.className = "project-tag";
            projectTag.innerText = thisObjectData.project_type;
            projectInfo.appendChild(projectTag);
        }
        
    }
    
}

//Animation that scrolls page on arrow button
const scrollButton = document.querySelector(".greeting-box #scroll-button");
scrollButton.addEventListener("click", scrollButtonAnimation);

function scrollButtonAnimation(){
    const imageGrid = document.querySelector(".image-grid");
    imageGrid.scrollIntoView();
}

//Animation that fades greetingbox on scroll
window.onscroll = function() {fadeOnScroll()};
const greetingBox = document.querySelector(".greeting-box");

function fadeOnScroll(){

    if(document.documentElement.scrollTop > 200){
        greetingBox.className = "fade-out greeting-box";
    } else if(document.documentElement.scrollTop > 50) {     
        greetingBox.className = "fade-half greeting-box";
    } else {
        greetingBox.className = "fade-in greeting-box";
    }
}

renderHTML();