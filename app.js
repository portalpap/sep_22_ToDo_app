let liText = "";
let listCol = document.getElementById("listCol");
let taskCol = document.getElementById("taskCol");
let liBtn = document.getElementById("addLiBtn");
let liInput = document.getElementById("liTextInput");

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const main = document.getElementsByClassName("maintainer")[0];
const rcMenus = document.getElementsByClassName("ri-click-menu");
let rcMenu = rcMenus[0];
let rcItems = document.getElementsByClassName("ri-click-item");
let rcType = 0;
let scopeIdx = undefined;
let scopeTarg = undefined;
let scempTarg = undefined;
let scempIdx = undefined;
let trash = {};
main.onclick = closeRC;
function closeRC(event){
    for (const iterator of rcMenus) {
        iterator.style.transform = "rotateX(90)";
        iterator.style.display = "none";
    }
}
main.oncontextmenu = new Function("return false;");
for (const iterator of rcMenus) 
    iterator.oncontextmenu = new Function("return false;");
main.onmousedown = function(event) {
    if (event.which == 3){
            closeRC();
            scopeIdx = scempIdx;
            scopeTarg = scempTarg;
            rcMenu.style.transform = "rotateX(90)";
            rcMenu.style.display = "flex";
            let mainGBCR = main.getBoundingClientRect();
            let rcMenuGBCR = rcMenu.getBoundingClientRect();
            rcMenu.style.left = 
            clamp(event.clientX, 0, (mainGBCR.width + mainGBCR.x) - rcMenuGBCR.width)
            + "px";
            rcMenu.style.top = 
            clamp(event.clientY, 0, (mainGBCR.height + mainGBCR.y) - rcMenuGBCR.height) 
            + "px";
            rcMenu.style.transform = "rotateX(0)";
    }
}
let tempObj = {};
let temp;
let currentLi = 0;
let listObjs = { 
    0:  {name: "ExampleList",
        todos: 
        [
            { inner: "complete this task to win!", completed: false},
            { inner: "this is anouther task", completed: false}
        ]
    }
};

load("INIT");

function load(Ltype){
    if(Ltype == "INIT"){
        console.log(localStorage);
        listObjs = JSON.parse(localStorage.getItem(localStorage.getItem("lastSaveType")));
        console.log("INIT: loaded \"" + localStorage.getItem("lastSaveType") + "\"");
    }
    else if(Ltype != undefined && Ltype != "transition")
        autoSave();
    listCol.innerHTML = "";
    taskCol.innerHTML = "";
    /* Load list items */ for (let i = 0; i < Object.keys(listObjs).length; i++) {
        listCol.innerHTML += '<div class="lftItm listLinkBar' + 
        ((i == currentLi) ? ((Ltype == "transition") ? ' active acstion ' : ' active ') : "") + 
        '" id="' + i + '"' + 
        ' onmouseover="updateScope(' + i + ',this,1)" onmouseleave="updateScope()"' +
        'onclick="switchLiTab(this.id)">' + 
        listObjs[i].name + '</div>';
    }
    /* Load todos */ for (let i = 0; i < listObjs[currentLi].todos.length; i++){ 
        taskCol.innerHTML +=  '<div class="rgtItm"><input value="'+ i +
        '" type="checkbox" onchange="updateCheckbox(this.value, this.checked)"' + 
        ((listObjs[currentLi].todos[i].completed) ? "checked" : "") + 
        '>' + listObjs[currentLi].todos[i].inner + '</div>';
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
    localStorage.setItem("lastSaveType", "newSave");
}

function autoSave(){
    localStorage.setItem("autoSave", JSON.stringify(listObjs));
    console.log("AUTOSAVE: Sucessfuly saved:")
    console.log(JSON.parse(localStorage.getItem("autoSave")));
    localStorage.setItem("lastSaveType", "autoSave");
}


function updateCheckbox(thisId, thisBool){
    listObjs[currentLi].todos[thisId].completed = thisBool;
    console.log(listObjs[currentLi].todos[thisId].completed)
}

function switchLiTab(value){
    currentLi = value;
    load("transition");
}

function updateScope(value, that, type){
    // console.log(value + " -> " + that + " -> " + type); +
        if(type == undefined){ //default
            that = document;
            type = 0;
        }
        scempTarg = that;
        scempIdx = value;
        rcType = type;
        rcMenu = rcMenus[rcType];
}

function removeTodo(idx){
    listObjs[currentLi].todos[idx] = undefined;
    listObjs[currentLi].todos = collapseArray(listObjs[currentLi].todos);
}

function removeList(idx){
    if(idx == undefined)
        idx = scopeIdx;
    trash = listObjs[idx];
    listObjs[idx] = undefined;
    listObjs = collapseArray(listObjs);
    if(idx == currentLi)
        animateToLoad(scopeTarg, 200, true, false);
    else if(idx < currentLi)
        animateToLoad(scopeTarg, 200, false, true);
    else
        animateToLoad(scopeTarg, 200, false, false);
}

function animateToLoad(targObj, delay, isActive, isLess){
    targObj.style.transform = "perspective(200px) rotateX(-90deg)";
    targObj.style.height = 0;
    currentLi = clamp(currentLi - isLess, 0, Object.keys(listObjs).length - 1)
    if(isActive)
        setTimeout(switchLiTab, delay, currentLi);
    else
        setTimeout(load, delay);
}

function collapseArray(collapseArrayValue){
    let collapseArrayTemp = [];
    for (let i = 0; i < Object.keys(collapseArrayValue).length; i++) 
        if(collapseArrayValue[i] != undefined)
            collapseArrayTemp.push(collapseArrayValue[i]);
    return collapseArrayTemp;
}



function debug(value){
    console.log("HELLLO");
}
