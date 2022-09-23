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

addList("new List");
load();

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
    load();
}

function load(){
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

function updateCheckbox(thisId, thisBool){
    listObjs[currentLi].todos[thisId].completed = thisBool;
    console.log(listObjs[currentLi].todos[thisId].completed)
}

function switchLiTab(value){
    currentLi = value;
    load();
}

function debug(value){
    console.log(value);
}
