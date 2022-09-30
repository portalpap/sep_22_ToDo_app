let liText = "";
let listCol = document.getElementById("listCol");
let taskCol = document.getElementById("taskCol");
let liBtn = document.getElementById("addLiBtn");
let liInput = document.getElementById("liTextInput");
let tempObj = {};
let temp;
let listObjs = { 
    0:  {name: "ExampleList",
        todos: 
        [
            { inner: "complete this task to win!", completed: false},
            { inner: "this is anouther task", completed: false}
        ]
    }
};
let currentLi = 0;

load("INIT");

function load(Ltype){
    if(Ltype == "INIT"){
        console.log(localStorage);
        listObjs = JSON.parse(localStorage.getItem(localStorage.key(0)));
        console.log("INIT: loaded \"" + localStorage.key(0) + "\"");
    }
    else if(Ltype != undefined)
        autoSave();

    listCol.innerHTML = "";
    taskCol.innerHTML = "";
    for (let i = 0; i < Object.keys(listObjs).length; i++) {
        if(i == currentLi)
            temp = 'active'
        else
            temp = ""
        listCol.innerHTML += '<div class="lftItm ' + temp + ' listLinkBar" id="'+ i +
        '" onclick="switchLiTab(this.id)">' + listObjs[i].name + '</div>';
    }
    for (let i = 0; i < listObjs[currentLi].todos.length; i++){
        taskCol.innerHTML +=  '<div class="rgtItm"><input value="'+ i +
        '" type="checkbox" onchange="updateCheckbox(this.value, this.checked)"">' + listObjs[currentLi].todos[i].inner + '</div>';
    } 

}

function openLiBtn(){
    if(liText != ""){
    liBtn.innerHTML = "Add " + liText + " +";
    liBtn.style.height = "2.5em";
    liBtn.style.transform = "translateY(0)";
    }
}

function closeLiBtn(){
    liBtn.style.height = "0em";
    liBtn.style.transform = "translateY(-6px)";
    liInput.value = "";
    console.log(liBtn.value);
}

function updateLiText(value){
    liText = value;
    liBtn.innerHTML = "Add " + liText + " +";
    if(value == ""){
        closeLiBtn();
    }
}

function addList(liName){
    if(liName == undefined)
        liName = liText;
    tempObj = {name: liName, todos: [{inner: "This is a example task!", completed: false}]};
    listObjs[Object.keys(listObjs).length] = tempObj;
    load("WITH SAVE");
}

function save(){
    localStorage.setItem("newSave", JSON.stringify(listObjs));
    console.log("SAVE: Sucessfuly saved:")
    console.log(JSON.parse(localStorage.getItem("newSave")));
}

function autoSave(){
    localStorage.setItem("autoSave", JSON.stringify(listObjs));
    console.log("AUTOSAVE: Sucessfuly saved:")
    console.log(JSON.parse(localStorage.getItem("autoSave")));
}


function updateCheckbox(thisId, thisBool){
    listObjs[currentLi].todos[thisId].completed = thisBool;
    console.log(listObjs[currentLi].todos[thisId].completed)
}

function switchLiTab(value){
    currentLi = value;
    load();
}


function editAt(tObj){
    
}

function debug(value){
    console.log(value);
}
