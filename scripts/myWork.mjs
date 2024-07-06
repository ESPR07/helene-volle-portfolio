import { getAllProjects } from "./firebase.mjs";
import {sortByProjectType, sortProjectByPosition} from "./components/sortingProjects.mjs";

const allProjects = await getAllProjects();
console.log(allProjects);

async function renderHTML(){
    const imageGrid = document.querySelector(".image-grid");
    const smallerProjectsGrid = document.querySelector(".smaller-projects-grid");
    const dropdownArrow = document.querySelector(".dropdown-arrow");

    //add toggle 
    const dropdownContainer = document.querySelector(".dropdown-container");
    console.log(dropdownContainer);
    dropdownContainer.addEventListener("click", () => {
        console.log("click");
                
        if(smallerProjectsGrid.classList.contains("expanded")) {
            //Happens if it's already open
            smallerProjectsGrid.classList.remove("expanded");
            smallerProjectsGrid.offsetHeight;
            smallerProjectsGrid.classList.add("hidden");

            dropdownArrow.style.rotate = "-90deg";
        } else {
            //Happens if it's not
            smallerProjectsGrid.classList.remove("hidden");
            smallerProjectsGrid.offsetHeight;
            smallerProjectsGrid.classList.add("expanded");

            dropdownArrow.style.rotate = "90deg";
        }
    });


    //loop through all projects
    const sortedAllProjects = sortProjectByPosition(allProjects);
    for(let i=0; i<sortedAllProjects.length; i++){
        const thisObjectData = sortedAllProjects[i];
       
        let firstImageData = thisObjectData.images.find((n) => n.is_first_img == true);
        if(firstImageData == undefined){
            firstImageData = thisObjectData.images[0]; 
        }
        
        const formatedTitleForURL = thisObjectData.name.toLowerCase().replaceAll(" ", "_");

        //creating new HTML objects
        const newClickableProject = document.createElement("a");
        const projectInfo = document.createElement("span");
        const projectTitle = document.createElement("h2");
        const projectDescription = document.createElement("p");
    
        projectDescription.innerText = thisObjectData.short_description;
        projectTitle.innerText = thisObjectData.name;
        projectInfo.className = "project-info";
        newClickableProject.href =`/pages/projectPage.html?id=${formatedTitleForURL}`;
        newClickableProject.style.backgroundImage = `url(https://lh3.googleusercontent.com/d/${firstImageData.link})`;

        //Appending HTML
        projectInfo.appendChild(projectTitle);
        projectInfo.appendChild(projectDescription);
        newClickableProject.appendChild(projectInfo);

        if(thisObjectData.project_type == "main"){
            imageGrid.appendChild(newClickableProject);
        }else{
            smallerProjectsGrid.appendChild(newClickableProject);
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