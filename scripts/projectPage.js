
//Data from json
async function getData(){
    const response = await fetch("/scripts/fakeAPI/info.json");
    
    if(response.ok){
        const result = await response.json();
        return result;
    }else{
        throw new Error("Error in loading data from json file");
    }
}

async function getProjectData(){
    const data = await getData();

    const fetchID = document.location.search;
    const param = new URLSearchParams(fetchID);
    const ID = param.get("id");

    for(let i=0; i<data.projects.length;i++){
        const formatedName = data.projects[i].name.toLowerCase().replaceAll(" ", "-");
        if(formatedName == ID){
            return data.projects[i];
        }
    }

}
//Get project from url
async function renderHTML(){
    const projectData = await getProjectData();
    console.log(projectData);

    //Adding title and description
    const title = document.querySelector("h1");
    const description = document.querySelector("p");

    title.innerText = projectData.name;
    description.innerText = projectData.description;

    //Adding images
    const imageContainer = document.querySelector(".image-container");

    for(let i=1; i<projectData.images.length;i++){
        const imageData = projectData.images[i];
        const image = document.createElement("img");

        image.src = imageData.link;
        image.alt = imageData.title;
        image.style.width = imageData.width;
        console.log(imageData.width);

        imageContainer.appendChild(image);

    }
}

renderHTML()


