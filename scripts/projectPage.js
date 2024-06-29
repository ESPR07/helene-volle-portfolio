
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
    console.log(projectData);

    //Adding title and description
    const title = document.querySelector(".title");
    const description = document.querySelector(".description");
    const subTitle = document.querySelector(".sub-title");
    const subDescription = document.querySelector(".sub-description");
    const subSection = document.querySelector(".sub-section");

    title.innerText = projectData.name;
    description.innerText = projectData.description;

    //Adding images
    const imageContainer = document.querySelector(".image-container");

    const loopAmount = projectData.images.length - projectData.amount_img_part_of_sub;
    for(let i=1; i<loopAmount;i++){
        const imageData = projectData.images[i];
        const image = document.createElement("img");

        image.src = imageData.link;
        image.alt = imageData.title;
        image.addEventListener("click", () => {
            displayModal(imageData);
        });
        image.style.width = imageData.width;

        imageContainer.appendChild(image);

    }

        //Checking if optional subparts are activated
        if(projectData.sub_title == "-"){
            subTitle.display = "none";
        }else{
            subTitle.innerText = projectData.sub_title;
        }
    
        if(projectData.sub_description == "-"){
            subDescription.display = "none";
        }else{
            subDescription.innerText = projectData.sub_description;
        }
    
        if(projectData.amount_img_part_of_sub == 0){
            subSection.display = "none";
        }else{
            //add images to sub section
            for(let i=loopAmount; i<projectData.images.length; i++){
                const thisImageData = projectData.images[i];

                //checks for image sub description
                if(projectData.images[i].sub_image_description != ""){
                    const container = document.createElement("container");
                    const p = document.createElement("p");
                    const image = document.createElement("img");

                    p.innerText = thisImageData.sub_image_description;
                    image.src = thisImageData.link;
                    image.alt = thisImageData.title;
                    image.style.width = thisImageData.width;
                    image.style.minWidth = thisImageData.width;
                    image.style.cursor = "pointer";
                    image.addEventListener("click", () => {
                        displayModal(thisImageData);
                    });
                    container.className = "sub-container";

                    //odd or even num:
                    if(i%2 == 0){
                        container.appendChild(p);
                        container.appendChild(image);
                    }else{
                        container.appendChild(image);
                        container.appendChild(p);
                    }

                    subSection.appendChild(container);
                }else{
                    const image = document.createElement("img");
                    image.src = thisImageData.link;
                    image.alt = thisImageData.title;
                    image.style.width = thisImageData.width;
                    image.style.cursor = "pointer";
                    image.addEventListener("click", () => {
                        displayModal(thisImageData);
                    });

                    subSection.appendChild(image);
                }
            }
        }
}

let modalImageLink = "";
let modalImageText = "";

async function navigate(event){
    const projectData = await getProjectData();
    const projectImages = projectData.images;
    const imageEl = document.querySelector(".modal-img");
    const imageText = document.querySelector(".modal-text");

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
            if(nextImageToShow.sub_image_description == "") {
                imageText.style.display = "none";
            } else {
                imageText.style.display = "block";
                imageText.innerText = nextImageToShow.sub_image_description;
            }

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
    const text = document.querySelector(".modal-text");
    modal.style.display = "flex";
    image.src = imageData.link;
    text.innerText = imageData.sub_image_description;
    modalImageLink = imageData.link;
}






renderHTML();




