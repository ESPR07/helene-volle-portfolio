

function sortByProjectType(projectType, array){
    const newSortedArray = [];
    array.forEach(project => {

        if(project.project_type == projectType){
            newSortedArray.push(project);
        }
    });

    return newSortedArray;
}

function sortProjectByPosition(array){
    const sortedCopy = array;

    sortedCopy.sort(function(a, b) {
        
        return a.project_position - b.project_position;
    })

    return sortedCopy;
}

function sortProjectByPositionReversed(array){
    const sortedCopy = array;

    sortedCopy.sort(function(a, b) {
        
        return b.project_position - a.project_position;
    })

    return sortedCopy;
}

export{sortByProjectType, sortProjectByPosition, sortProjectByPositionReversed}