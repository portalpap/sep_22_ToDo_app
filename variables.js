const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const debug = (debugValue) => console.log(debugValue);
const toggle = (that, chosenClass) => {
    if(that.classList.contains(chosenClass)){
         that.classList.remove(chosenClass);
         return true;
    }
    else{
        that.classList.add(chosenClass);
        return false;
    }
};



function collapseArray(collapseArrayValue){
    let collapseArrayTemp = [];
    for (let iter of collapseArrayValue) 
        if(iter != undefined)
            collapseArrayTemp.push(iter);
    return collapseArrayTemp;
}
function turnObjectToNodec(inpot){
    let todec = new Nodec();
    for(let props of Object.getOwnPropertyNames(inpot)){
        todec[props] = inpot[props];
    }
    return(todec);
}

/*-----------------------------------------------------*/

class Nodec{ // Node Class
    constructor(label, x, y, children){
        this.label = label;
        this.id;
        this.xCell = x;
        this.yCell = y;
        this.gridW = 8;
        this.gridH = 6; 
        this.basicText = '';
        this.children = children;
        this.allies = [];
        this.strandColor = '#ff0000';
    }
    addAlly(inpot){
        if(!this.allies.hasOwnProperty(inpot))
            this.allies.push(inpot);
    }
    changeBounds(nw, nh){
        this.gridW = nw;
        this.gridH = nh;
    }
    removeAlly(inpot){
        let i = 0;
        for(let iter of this.allies){
            if(iter.id == inpot.id){
                this.allies[i] = undefined;
                this.allies = collapseArray(this.allies);
            }
            i++;
        }
    }
}

let CWTainerOpenQ = false;

const ctxWindow = document.getElementById('contentWindow');
const nodeTainer = document.getElementById('nodeTainer');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const ctxTainer = document.getElementById('CWTainer');
const ctxButton = document.getElementById('ctxWindowBtn');

let window_W = ctxWindow.getBoundingClientRect().width;
let window_H = ctxWindow.getBoundingClientRect().height;
let camXorigin;
let camYorigin;
let offsetX = window_W/2;
let offsetY = window_H/2;
let camX = 0;
let camY = 0;
let prevCamX = 0;
let prevCamY = 0;
let prevNx = 0;
let prevNy = 0;
let maxZoom = 100;
let minZoom = 1;
let dragSensitivity = 2;
let gridSize = 7;
let xCellCount = 2000;
let yCellCount = 2000;
let nodeDragingQ = false;
let mouseDownQ = false;
let nodeOriginX = 0;
let nodeOriginY = 0;
let nodeIds = [];
let windowMouseX = 0;
let windowMouseY = 0;
let pubInpot;
let pubElem;
let maxZ = 0;
let nodeScopeObj;
let nodeScopeElm;
let curNS_Obj;
let curNS_Elm;
let scopeLockedQ = false;
let pubQ = false;

let selectedNodes = [];

/*-------------------------------------------------------*/

let currentLi = 0;
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