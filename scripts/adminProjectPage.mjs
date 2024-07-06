import { checkLoggedIn, getSingleProject, logoutEvent, setProject, removeProject } from "./firebase.mjs";

checkLoggedIn();

const logoutButton = document.querySelector(".logoutButton");
logoutButton.addEventListener("click", logoutEvent);

const fetchID = document.location.search;
const param = new URLSearchParams(fetchID);
const ID = param.get("id");

let mainImages = [];
let subImages = [];

function renderHTMLButtons(){
    
    const clearBtn = document.querySelector("#clear-button");
    const addBtn = document.querySelector("#add-button");
    const deleteBtn = document.querySelector("#delete-button");

    const subClearBtn = document.querySelector("#sub-clear-button");
    const subAddBtn = document.querySelector("#sub-add-button");
    const subDeleteBtn = document.querySelector("#sub-delete-button");

    const saveBtn = document.querySelector(".submit-button");

    clearBtn.addEventListener("click", clearImageInput);
    addBtn.addEventListener("click", addImage);
    deleteBtn.addEventListener("click", () => {
        deleteImage(mainImages, document.querySelector("#img-link").value);
        });

    subClearBtn.addEventListener("click", clearSubImageInput);
    subAddBtn.addEventListener("click", addSubImage);
    subDeleteBtn.addEventListener("click", () => {
        deleteImage(subImages, document.querySelector("#sub-img-link").value);
        });


    saveBtn.addEventListener("click", saveProject);

    //create delete button
    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.innerText = "Delete Project";
    deleteProjectBtn.addEventListener("click", deleteProject);
    document.querySelector(".top-button-container").appendChild(deleteProjectBtn);
}

//Filling out input fields in html with provided project data
function fillOutFields(projectData) {
  const titleEl = document.querySelector("h1");
  //filling out input fields (not image fields)
  const titleInp = document.querySelector("#project-title");
  const typeSel = document.querySelector("#project-type");
  const shortDescriptionInp = document.querySelector("#short-description");
  const descriptionInp = document.querySelector("#project-description");

  titleEl.innerText = "Add changes to project";
  titleInp.value = projectData.name;
  typeSel.value = projectData.project_type;
  shortDescriptionInp.value = projectData.short_description;
  descriptionInp.value = projectData.description;

  const subTitleInp = document.querySelector("#sub-title");
  const subDescriptionInp = document.querySelector("#sub-description");

  subTitleInp.value = projectData.sub_title;
  subDescriptionInp.value = projectData.sub_description;

  //updating the global imageArrays
  const imageDataArray = projectData.images;
  mainImages = imageDataArray.slice(
    0,
    imageDataArray.length - projectData.amount_img_part_of_sub
  );
  subImages = imageDataArray.slice(
    imageDataArray.length - projectData.amount_img_part_of_sub,
    imageDataArray.length
  );

  //Updating image containers with images
  const imageContainer = document.querySelector("#img-container");
  const subImageContainer = document.querySelector("#sub-img-container");
  updateImageContainer(imageContainer, mainImages);
  updateImageContainer(subImageContainer, subImages);
}

//updating container after any changes on inputFields
function updateImageContainer(container, imageArray) {
  container.innerHTML = "";
  for (let i = 0; i < imageArray.length; i++) {

    const imageData = imageArray[i];
    const image = document.createElement("img");
    image.src = `https://lh3.googleusercontent.com/d/${imageData.link}`;
    image.alt = imageData.title;
    image.style.width = imageData.width;

    if(imageData.sub_image_description == ""){
    
      image.style.cursor = "pointer";
      image.addEventListener("click", () => {
        updateImageInput(imageData, container.id, i);
      });
      container.appendChild(image);

    }else{
      const subContainer = document.createElement("container");
      const p = document.createElement("p");

      image.style.minWidth = imageData.width;
      p.innerText = imageData.sub_image_description;
      subContainer.className = "sub-container";
      subContainer.style.cursor = "pointer";
      subContainer.addEventListener("click", () => {
        updateImageInput(imageData, container.id, i);
      });
      //odd or even num:
      if(i%2 == 0){
        subContainer.appendChild(p);
        subContainer.appendChild(image);
      }else{
        subContainer.appendChild(image);
        subContainer.appendChild(p);
      }
      container.appendChild(subContainer);
    }
  
  }
}

//Updating image fields when image is clicked on
function updateImageInput(imageData, containerID, position) {
  let titleInp;
  let googleIDInp;
  let widthInp;
  let posInp;
  let frontImgChck;
  if (containerID == "sub-img-container") {
    clearSubImageInput()
    titleInp = document.querySelector("#sub-img-title");
    googleIDInp = document.querySelector("#sub-img-link");
    widthInp = document.querySelector("#sub-img-width");
    posInp = document.querySelector("#sub-img-position");
    frontImgChck = document.querySelector("#sub-is-first-img");
    const subImgDesc = document.querySelector("#sub-img-description");
    subImgDesc.value = imageData.sub_image_description;
  } else {
    clearImageInput();
    titleInp = document.querySelector("#img-title");
    googleIDInp = document.querySelector("#img-link");
    widthInp = document.querySelector("#img-width");
    posInp = document.querySelector("#img-position");
    frontImgChck = document.querySelector("#is-first-img");
  }

  titleInp.value = imageData.title;
  googleIDInp.value = imageData.link;
  widthInp.value = imageData.width;
  posInp.value = position + 1;
  frontImgChck.checked = imageData.is_first_img;
}

//BUTTON FUNCTIONS

//clear image input
function clearImageInput() {
    document.querySelector("#img-title").value = "";
    document.querySelector("#img-link").value = "";
    document.querySelector("#img-width").value = "";
    document.querySelector("#img-position").value = 0;
    document.querySelector("#is-first-img").checked = false;
  
}

function clearSubImageInput() {
    document.querySelector("#sub-img-title").value = "";
    document.querySelector("#sub-img-link").value = "";
    document.querySelector("#sub-img-width").value = "";
    document.querySelector("#sub-img-position").value = 0;
    document.querySelector("#sub-is-first-img").checked = false;
    document.querySelector("#sub-img-description").value = "";
}

//add functions
function addObjectToArray(array, title, link, width, position, isFirst, subImageDesc){
    const image = new Object();
    image.title = title;
    image.link = link;
    image.width = width;
    image.is_first_img = isFirst;
    image.sub_image_description = subImageDesc;

    if(position-1 > array.length){
        array.splice(array.length-1, 0, image);
    }
    array.splice(position-1, 0, image);
}

function addImage(){
    const titleVal = document.querySelector("#img-title").value;
    const linkVal = document.querySelector("#img-link").value;
    const widthVal = document.querySelector("#img-width").value;
    const posVal = document.querySelector("#img-position").value;
    const isFirstVal = document.querySelector("#is-first-img").checked;

    //do nothing if there is no link or width
    if(linkVal == "" || widthVal == ""){
        alert("Need both link and width to create an image");
        return;
    }else{ 
        //check and delete image width same id
        if((mainImages.findIndex(n => (n.link == linkVal)) != -1)){
            deleteImage(mainImages, linkVal);
        }
        addObjectToArray(mainImages, titleVal, linkVal, widthVal, posVal, isFirstVal, "");
        updateImageContainer(document.querySelector("#img-container"), mainImages);
    }
}

function addSubImage(){
    const titleVal = document.querySelector("#sub-img-title").value;
    const linkVal = document.querySelector("#sub-img-link").value;
    const widthVal = document.querySelector("#sub-img-width").value;
    const posVal = document.querySelector("#sub-img-position").value;
    const subDescrVal = document.querySelector("#sub-img-description").value;
    const isFirstVal = document.querySelector("#sub-is-first-img").checked;

    //do nothing if there is no link or width
    if(linkVal == "" || widthVal == ""){
        alert("Need both link and width to create an image");
        return;
    }else{
          //check and delete image width same id
     if((subImages.findIndex(n => (n.link == linkVal)) != -1)){
        deleteImage(subImages, linkVal);
    }
        addObjectToArray(subImages, titleVal, linkVal, widthVal, posVal, isFirstVal, subDescrVal);
        updateImageContainer(document.querySelector("#sub-img-container"), subImages);
    }
}

//delete
function deleteImage(imageArray, imageID){

    //finding the one to delete
    const position = imageArray.findIndex(n => (n.link == imageID));
    imageArray.splice(position, 1);

    //updating container
    updateImageContainer(document.querySelector("#img-container"), mainImages);
    updateImageContainer(document.querySelector("#sub-img-container"), subImages);
}

//save
function saveProject(){
    const titleVal = document.querySelector("#project-title").value;
    const typeVal = document.querySelector("#project-type").value;
    const shortDescriptionVal = document.querySelector("#short-description").value;
    const descriptionVal = document.querySelector("#project-description").value;
    const subTitleVal = document.querySelector("#sub-title").value;
    const subDescriptionVal = document.querySelector("#sub-description").value;

    const projectObject = new Object();

    projectObject.name = titleVal;
    projectObject.short_description = shortDescriptionVal;
    projectObject.description = descriptionVal;
    projectObject.project_type = typeVal;
    projectObject.sub_title = subTitleVal;
    projectObject.sub_description = subDescriptionVal;
    projectObject.amount_img_part_of_sub = subImages.length;

    //project id
    const projectID = titleVal.toLowerCase().replaceAll(" ", "_");

    //adding the list
    const imageArray = mainImages.concat(subImages);
    projectObject.images = imageArray;
    
    try{
      setProject(projectID, projectObject);
      setTimeout(() => {
        window.location.href = "./adminMyWork.html";
      }, 2000);
    }catch{
      alert("Something went wrong. Could not save project");
    }
}

function deleteProject(){
  const titleVal = document.querySelector("#project-title").value;
  const projectID = titleVal.toLowerCase().replaceAll(" ", "_");
    if(confirm("are you sure you want to delete this project")){
        console.log("delete");

        try{
          removeProject(projectID);
          setTimeout(() => {
            window.location.href = "./adminMyWork.html";
          }, 2000);
        }catch{
          alert("Something went wrong. Could not remove project");
        }
        
    }else{
        console.log("cancel");
    }
}

//render html diffrently based on project id
if (ID) {
  const projectData = await getSingleProject(ID);
  console.log(projectData);
  fillOutFields(projectData);
} else {
  console.log("Creating new project");
}

renderHTMLButtons();