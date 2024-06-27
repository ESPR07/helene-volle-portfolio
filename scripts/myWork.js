

async function getData(){
    const response = await fetch("/scripts/fakeAPI/info.json");
    
    if(response.ok){
        const result = await response.json();
        return result;
    }else{
        throw new Error("Error in loading data from json file");
    }
}


async function renderHTML(){
    const data = await getData();
    console.log(data.projects.length);

    const imageGrid = document.querySelector(".image-grid");
    
    for(let i=0; i<data.projects.length; i++){
        const thisObjectData = data.projects[i];
        const firstImageData = thisObjectData.images[0];
        const formatedTitleForURL = thisObjectData.name.toLowerCase().replaceAll(" ", "-");

        //creating new HTML objects
        const newClickableProject = document.createElement("a");
        const projectInfo = document.createElement("span");
        const projectTitle = document.createElement("h2");
        const projectDescription = document.createElement("p");
    
        projectDescription.innerText = thisObjectData.short_description;
        projectTitle.innerText = thisObjectData.name;
        projectInfo.className = "project-info";
        newClickableProject.href =`/pages/projectPage.html?id=${formatedTitleForURL}`;
        newClickableProject.style.backgroundImage = `url(${firstImageData.link})`;

        //Appending HTML
        projectInfo.appendChild(projectTitle);
        projectInfo.appendChild(projectDescription);
        newClickableProject.appendChild(projectInfo);
        imageGrid.appendChild(newClickableProject);
        
    }
    
    
}

renderHTML()


