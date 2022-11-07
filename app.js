/*
let liText = "";
let listCol = document.getElementById("listCol");
let taskCol = document.getElementById("taskCol");
let liBtn = document.getElementById("addLiBtn");
let liInput = document.getElementById("liTextInput");

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
*/

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
            rcMenu.style.display = "flex";
            let mainGBCR = main.getBoundingClientRect();
            let rcMenuGBCR = rcMenu.getBoundingClientRect();
            rcMenu.style.left = 
            clamp(event.clientX, 0, (mainGBCR.width + mainGBCR.x) - rcMenuGBCR.width)
            + "px";
            rcMenu.style.top = 
            clamp(event.clientY, 0,  (mainGBCR.height + mainGBCR.y) - rcMenuGBCR.height) 
            + "px";
            rcMenu.style.transform = "rotateX(0)";
    }
}
let key = undefined;
document.addEventListener("keydown", function(event) {
    key = event.code;
    if(event.code === 13)
        console.log("ENTER");
});
let tempObj = {};
let temp;
let listObjs = { 
    0:  {name: "ExampleList",
        todos: 
        [
            { inner: "complete this task to win!", completed: false},
            { inner: "this is anouther task", completed: false}
        ],
        nodeBlockWindow: [
                {
                    "label": "Default",
                    "xCell": 0,
                    "yCell": -9,
                    "gridW": 8,
                    "gridH": 6,
                    "basicText": "",
                    "allies": [
                        {
                            "label": "added",
                            "xCell": 20,
                            "yCell": 0,
                            "gridW": 8,
                            "gridH": 6,
                            "basicText": "",
                            "allies": [],
                            "strandColor": "#ff0000",
                            "id": "nodeBlock4"
                        },
                        {
                            "label": "added",
                            "xCell": 20,
                            "yCell": -18,
                            "gridW": 8,
                            "gridH": 6,
                            "basicText": "",
                            "allies": [],
                            "strandColor": "#ff0000",
                            "id": "nodeBlock5"
                        }
                    ],
                    "strandColor": "#ff0000",
                    "id": "nodeBlock0"
                },
                {
                    "label": "added",
                    "xCell": -20,
                    "yCell": 0,
                    "gridW": 8,
                    "gridH": 6,
                    "basicText": "",
                    "allies": [
                        {
                            "label": "Default",
                            "xCell": 0,
                            "yCell": -9,
                            "gridW": 8,
                            "gridH": 6,
                            "basicText": "",
                            "allies": [
                                {
                                    "label": "added",
                                    "xCell": 20,
                                    "yCell": 0,
                                    "gridW": 8,
                                    "gridH": 6,
                                    "basicText": "",
                                    "allies": [],
                                    "strandColor": "#ff0000",
                                    "id": "nodeBlock4"
                                },
                                {
                                    "label": "added",
                                    "xCell": 20,
                                    "yCell": -18,
                                    "gridW": 8,
                                    "gridH": 6,
                                    "basicText": "",
                                    "allies": [],
                                    "strandColor": "#ff0000",
                                    "id": "nodeBlock5"
                                }
                            ],
                            "strandColor": "#ff0000",
                            "id": "nodeBlock0"
                        },
                        {
                            "label": "added",
                            "xCell": 0,
                            "yCell": 9,
                            "gridW": 8,
                            "gridH": 6,
                            "basicText": "",
                            "allies": [
                                {
                                    "label": "added",
                                    "xCell": 20,
                                    "yCell": 18,
                                    "gridW": 8,
                                    "gridH": 6,
                                    "basicText": "",
                                    "allies": [],
                                    "strandColor": "#ff0000",
                                    "id": "nodeBlock3"
                                },
                                {
                                    "label": "added",
                                    "xCell": 20,
                                    "yCell": 0,
                                    "gridW": 8,
                                    "gridH": 6,
                                    "basicText": "",
                                    "allies": [],
                                    "strandColor": "#ff0000",
                                    "id": "nodeBlock4"
                                }
                            ],
                            "strandColor": "#ff0000",
                            "id": "nodeBlock2"
                        }
                    ],
                    "strandColor": "#ff0000",
                    "id": "nodeBlock1"
                },
                {
                    "label": "added",
                    "xCell": 0,
                    "yCell": 9,
                    "gridW": 8,
                    "gridH": 6,
                    "basicText": "",
                    "allies": [
                        {
                            "label": "added",
                            "xCell": 20,
                            "yCell": 18,
                            "gridW": 8,
                            "gridH": 6,
                            "basicText": "",
                            "allies": [],
                            "strandColor": "#ff0000",
                            "id": "nodeBlock3"
                        },
                        {
                            "label": "added",
                            "xCell": 20,
                            "yCell": 0,
                            "gridW": 8,
                            "gridH": 6,
                            "basicText": "",
                            "allies": [],
                            "strandColor": "#ff0000",
                            "id": "nodeBlock4"
                        }
                    ],
                    "strandColor": "#ff0000",
                    "id": "nodeBlock2"
                },
                {
                    "label": "added",
                    "xCell": 20,
                    "yCell": 18,
                    "gridW": 8,
                    "gridH": 6,
                    "basicText": "",
                    "allies": [],
                    "strandColor": "#ff0000",
                    "id": "nodeBlock3"
                },
                {
                    "label": "added",
                    "xCell": 20,
                    "yCell": 0,
                    "gridW": 8,
                    "gridH": 6,
                    "basicText": "",
                    "allies": [],
                    "strandColor": "#ff0000",
                    "id": "nodeBlock4"
                },
                {
                    "label": "added",
                    "xCell": 20,
                    "yCell": -18,
                    "gridW": 8,
                    "gridH": 6,
                    "basicText": "",
                    "allies": [],
                    "strandColor": "#ff0000",
                    "id": "nodeBlock5"
                }
        ],
        NBW_open: true
    }
};

// let temper = listObjs[0].nodeBlockWindow;

load("INIT");


function load(Ltype){
    if(Ltype == "INIT"){
        if(localStorage.length > 0){
            console.log(localStorage);
            listObjs = JSON.parse(localStorage.getItem("newSave"));
            console.log("INIT: loaded \"" + localStorage.getItem("lastSaveType") + "\"");
        }
    }
    else if(Ltype != undefined && Ltype != "transition" && Ltype != "edit")
        autoSave();
    listCol.innerHTML = ""; taskCol.innerHTML = "";
    /* Load list items */ for (let i = 0; i < Object.keys(listObjs).length; i++) {
        listCol.innerHTML += '<div class="lftItm listLinkBar' + 
        ((i == currentLi) ? ((Ltype == "transition") ? ' active acstion ' : ' active ') : "") + // apply "ACTIVE" to selected list
        '" id="' + i + '"' + // set ID
        ' onmouseover="updateScope(' + i + ',this,1)" onmouseleave="updateScope()" ' + // change scope when touching mouse
                ((Ltype == "edit" && i == scopeIdx) ? // Check if load to edit
            ' contenteditable="true" onblur="load()"><p  onmouseover="selectText(this)">' + listObjs[i].name
          :
            'onclick="switchLiTab(this.id)" ondblclick="load(\'edit\')"><p class="noSelect">' + listObjs[i].name) //generate plain text
        + '<i></i></p></div>';
    }
    /* Load todos */ for (let i = 0; i < listObjs[currentLi].todos.length; i++){ 
        taskCol.innerHTML +=  '<div class="rgtItm" ' +
        ' onmouseover="updateScope(' + i + ',this,2)" onmouseleave="updateScope()" ' + // change scope for right item
        '><input value="'+ i +
        '" type="checkbox" onchange="updateCheckbox(this.value, this.checked)"' + 
        ((listObjs[currentLi].todos[i].completed) ? "checked" : "") + 
        '><p>' + listObjs[currentLi].todos[i].inner + '</p></div>';
    }

    // let tomp = listObjs[currentLi].nodeBlockWindow;
    // console.log(tomp);
    for(let iter of document.getElementsByName('openQ')){
        iter.classList.remove('openQ');
    }

    selectedNodes = [];

    ctxTainer.style.transition = ".02s ease-out";
    for(let iter of ctxButton.children)
        iter.style.transition = ".1s";

    if(listObjs[currentLi].NBW_open){
        ctxTainer.classList.remove('openQ');
        ctxButton.classList.remove('openQ');
    }
    else{
        ctxTainer.classList.add('openQ');
        ctxButton.classList.add('openQ');
    }

    // listObjs[0].nodeBlockWindow = temper;
    for(let iter of listObjs[currentLi].nodeBlockWindow){
        let ii = 0;
        for(let allies of iter.allies){
            iter.allies[ii] = turnObjectToNodec(allies);
            ii++;
        }
        selectedNodes.push(turnObjectToNodec(iter));
    }

    setTimeout(function(){
        ctxTainer.style.transition = ".2s ease-out";
        for(let iter of ctxButton.children)
            iter.style.transition  = ".2s ease-out";
    }, 200)
    if(Ltype != "INIT"){
        addAllNodeElements();
        drawGrid();
    }

    let temp  = document.getElementsByClassName('rgtItm');

    let i = 0;
    for(let iter of temp){
        iter.appendChild(createTodoDial(iter, i, 'trashSVG', '2em'));
        iter.appendChild(createTodoDial(iter, i, 'pencilSVG', '4.5em'));
        i++;
    }
}

function createTodoDial(telm, i, svgId, rightSpot){
    let temp2 = document.createElement('div');
    let tomp = document.getElementById(svgId);
    let clone = tomp.cloneNode(true);

    clone.id = '';
    tomp = clone;
    temp2.classList.add('liCir');
    temp2.appendChild(tomp);

    temp2.value = i;

    if(svgId == "trashSVG"){
        temp2.onclick = () =>{
            removeTodo(temp2.value);
            telm.style.transform = 'rotateX(90deg)'
            telm.style.height = '0';
            setTimeout(function(){
                telm.style.display = 'none';
            },200)
        }
    }
    else if(svgId == "pencilSVG"){
        temp2.onclick = () =>{
            let query = telm.querySelector('p');
            query.contentEditable = true;
            query.focus();
            document.getElementsByClassName('rgtItm')[temp2.value].classList.add('highlight');
            query.oninput = () =>{
                setTodo(temp2.value, query.innerHTML)
            }
            query.onblur = () =>{
                document.getElementsByClassName('rgtItm')[temp2.value].classList.remove('highlight');
                query.contentEditable = false;
            }
            window.getSelection().selectAllChildren(query);
        }
    }

    temp2.style.right = rightSpot;

    return(temp2)
}

function setTodo(idx, val){
    listObjs[currentLi].todos[idx].inner = val;
}

function openLiBtn(){
    if(liText != ""){
    liBtn.innerHTML = "Add " + liText + " +";
    liBtn.style.minHeight = "2.5em";
    liBtn.style.transform = "perspective(200px) rotateX(0deg)";
    }
}

function closeLiBtn(){
    liBtn.style.minHeight = "0";
    liBtn.style.transform = "rotateX(90deg)";
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
    tempObj = {name: liName, todos: [{inner: "This is a example task!", completed: false}], nodeBlockWindow: [], NBW_open: false};
    listObjs[Object.keys(listObjs).length] = tempObj;
    load("WITH SAVE");
}

function save(){
    listObjs[currentLi].nodeBlockWindow = selectedNodes;
    localStorage.setItem("newSave", JSON.stringify(listObjs));
    console.log("SAVE: Sucessfuly saved:")
    console.log(JSON.parse(localStorage.getItem("newSave")));
    localStorage.setItem("lastSaveType", "newSave");
}

function autoSave(){
    listObjs[currentLi].nodeBlockWindow = selectedNodes;
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
    // console.log(value + " -> " + that + " -> " + type); 
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

function animateToLoad(targObj, delay, isActive, isLess, isTodo){
    targObj.style.transform = "perspective(1000px) rotateX(-90deg)";
    targObj.style.height = 0;
    if(isTodo == undefined){
        currentLi = clamp(currentLi - isLess, 0, Object.keys(listObjs).length - 1)
        if(isActive)
            setTimeout(switchLiTab, delay, currentLi);
        else
        setTimeout(load, delay);
    }
    else
        setTimeout(load, delay);
}

function rcFun(which){
    closeRC();
    
    console.log("RAN \"" + which + '\"')
    switch (which) {
        case 'edit':
            load('edit');
                break;
        case 'deleteList':
            removeList();
                break;
        case 'deleteTodo':
            removeTodo(scopeIdx);
            animateToLoad(scopeTarg, 200, false, false, true);
                break;
        case 'newUp':
            addTodo("New Task", scopeIdx);
            load();
                break;
        case 'newDown':
            addTodo("New Task", scopeIdx + 1);
            load();
                break;
        case 'NW-addNode':
            selectedNodes.push(new Nodec("new", getCellX(windowMouseX), getCellY(windowMouseY)));
            addAllNodeElements();
            break;
        default:
            break;
    }

}

function addTodo(insideText, insertQ){
    let tomp = { inner: insideText};
    if(insertQ == undefined)
        listObjs[currentLi].todos.push(tomp);
    else{
        listObjs[currentLi].todos = insert(listObjs[currentLi].todos, insertQ, tomp);
    }
}

function insert(tary, idx, items){
    let tary1 = tary.slice(0,idx);
    tary1.push(items);
    return tary1.concat(tary.slice(idx));
}

function selectText(targ) {
    window.getSelection().selectAllChildren(targ.children[0]);
}
  
liBtn.style.display = "block";