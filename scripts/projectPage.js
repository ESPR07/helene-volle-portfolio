
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

//get data from this project
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
        image.addEventListener("click", () => {
            displayModal(imageData.link);
        });
        image.style.width = imageData.width;

        imageContainer.appendChild(image);

    }
}

let modalImageLink = "";

async function navigate(event){
    const projectData = await getProjectData();
    const projectImages = projectData.images;
    const imageEl = document.querySelector(".modal-img");

    for(let i=1; i<projectImages.length; i++){
        //checks where we are in the image stream
        if(projectImages[i].link == modalImageLink){
            
            let increment = 0;
            //check navigation button
            if(event.target.value == "next" && ((i+1) <= projectImages.length)){
                increment = 1;
            }else if(event.target.value == "previous" && ((i-1) >= 1)){
                increment = -1;
            }
    
            try{ //try if next img can be shown otherwise proceed as usual
            const nextImageToShow = projectImages[i+increment];
            modalImageLink = nextImageToShow.link;
            imageEl.src = nextImageToShow.link;
            } catch (Error){}
            
            return;
        }
    }

}

function exit(){
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
}

function displayModal(imageData){
    const modal = document.querySelector(".modal");
    const image = document.querySelector(".modal-img");
    modal.style.display = "flex";
    image.src = imageData;
    modalImageLink = imageData;
}






renderHTML();




