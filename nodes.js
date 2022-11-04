const ctxWindow = document.getElementById('contentWindow');
const nodeTainer = document.getElementById('nodeTainer');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let window_W = ctxWindow.getBoundingClientRect().width;
let window_H = ctxWindow.getBoundingClientRect().height;
let camXorigin;
let camYorigin;
let offsetX = window_W/2;
let offsetY = window_H/2;
let camX = 0;
let camY = 0;
let maxZoom = 100;
let minZoom = 3;
let dragSensitivity = 2;
let gridSize = 20;
let xCellCount = 800;
let yCellCount = 800;
let nodeDragingQ = false;
let mouseDownQ = false;
let nodeOriginX = 0;
let nodeOriginY = 0;
let nodeIds = [];
let windowMouseX = 0;
let windowMouseY = 0;
let pubElem;
let pubInpot;

document.onmousedown = () =>{ mouseDownQ = true; };
document.onmouseup = () =>{
    mouseDownQ = false;
    camXorigin = undefined;
    camYorigin = undefined;
};
canvas.onmousedown = (e) => { 
    camXorigin = e.pageX + camX;
    camYorigin = e.pageY + camY;
};
window.onmousemove = mouseMove;
ctxWindow.onwheel     = gridZoom;


let one ={
    x: 250,
    y: 200
}
let two ={
    x: 304,
    y: 80
}
class Nodec{ // Node Class
    constructor(label, x, y, children){
        this.label = label;
        this.xCell = x;
        this.yCell = y;
        this.id;
        this.gridW = 8;
        this.gridH = 6; 
        this.styleProps = undefined;
        this.children = children;
        this.allies = [];
    }
    addAlly(nodeInsert){
        this.allies.push(nodeInsert);
    }
    changeBounds(nw, nh){
        this.changeWidth(nw);
        this.changeHeight(nh);
    }
    changeWidth(nw){
        this.gridW = nw;
    }
    changeHeight(nh){
        this.gridH = nh;
    }
}
let nodes = [new Nodec("Default",10,0)];
nodes.push(new Nodec("added", -5, 8))
nodes.push(new Nodec("added", 15, 9))

document.onmousemove = drawConnect;

function drawGrid(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = gridSize/80;

    ctx.strokeStyle = 'green';

    let temp = 0;
    let tempMod = window_W - (window_W % gridSize) + gridSize;

    for (let i = 0; i <= window_W/gridSize; i++) { //colums
        temp = 
        ((((window_W - i) * gridSize) + camX + offsetX) 
        % tempMod);

        ctx.moveTo(temp, window_H);
        ctx.lineTo(temp, 0);
    }

    tempMod = window_H - (window_H % gridSize) + gridSize;

    for (let i = 0; i <= window_H/gridSize; i++) { //rows
        temp = 
        ((((window_H - i) * gridSize) + camY + offsetY) 
        % tempMod);

        ctx.moveTo(window_W, temp);
        ctx.lineTo(0, temp);
    }
    ctx.stroke();

    ctx.lineWidth = gridSize/15;
    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.moveTo(camX + offsetX, 0);
    ctx.lineTo(camX + offsetX, window_H)
    ctx.stroke();

    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(0, camY + offsetY);
    ctx.lineTo(window_W, camY + offsetY)
    ctx.stroke();

}

function drawConnect(fx,fy,sx,sy){
    ctx.lineWidth = gridSize/6;
    let temp = undefined;
    // sx = window.event.pageX - canvas.getBoundingClientRect().x;
    // sy = window.event.pageY - canvas.getBoundingClientRect().y;
    if(sx < fx){
        temp = fx;
        fx = sx;
        sx = temp;
        temp = fy;
        fy = sy;
        sy = temp;
    }
    let diffH = fy - sy;
    let diffW = fx - sx;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(fx,fy);
        for(let i = 0; i < Math.abs(fx - sx); i+=Math.abs(fx - sx)/50)
        ctx.lineTo(i+fx, diffH/2*Math.cos(i/(diffW/Math.PI)) + (fy-diffH/2));
    ctx.lineTo(sx,sy);
    ctx.stroke();
}

function checkUpdate(){

    camX = clamp(camX,((xCellCount/-2) * gridSize), ((xCellCount/2) * gridSize));
    let temp; let temp2;
    
    drawGrid();
    connectNode(nodes[0], nodes[1]);
    connectNode(nodes[1], nodes[2]);

    for(let iter of nodes){
        // temp  = iter.gridW/2 * gridSize;
        // temp2 = iter.gridH/2 * gridSize;
        // if((iter.xCell * gridSize) + camX - temp > offsetX || -offsetX > (iter.xCell * gridSize) + camX + temp)
        //     hideNode(iter);
        // else if(iter.yCell + camY - temp2 > offsetY || -offsetY > iter.yCell + camY + temp2)
        //     hideNode(iter);
        // else
            updateNode(iter);
    }
}

function startDrag(that, inpot){
    nodeDragingQ = true;
    pubElem      = that;
    pubInpot     = inpot;

    nodeOriginX  = (windowMouseX - (that.style.left).slice(0, -2));
    nodeOriginX -= (pubInpot.gridW/2 * gridSize);
    
    nodeOriginY  = (windowMouseY - (that.style.top).slice(0, -2));
    nodeOriginY -= (pubInpot.gridH/2 * gridSize);

    updateNode(inpot);
}

function endDrag(that, inpot){
    nodeDragingQ = false;
}

function connectNode(n1, n2){
    // console.log(n1);
    // console.log(n2);
    let fxx = 0, sxx = 0;
    let fyy = n1.gridH/2 * gridSize;
    let syy = n2.gridH/2 * gridSize;

    if(n1.xCell < n2.xCell){
        // console.log("1 right - 2 left");
        fxx = n1.gridW * gridSize;
    }
    else{
        // console.log("1 left - 2 right");
        sxx = n2.gridW * gridSize;
    }
    if(n2.xCell + (n2.gridW/2) + 1 >= n1.xCell - (n1.gridW/2)
     && n2.xCell - (n2.gridW/2) <= n1.xCell + (n1.gridW/2) + 1){
        if(n2.yCell + (n2.gridH/2) >= n1.yCell){
            syy = n2.gridH * gridSize
            fyy = 0;
        }
        else{
            syy = 0;
            fyy = n1.gridH * gridSize;
        }
        fxx = n1.gridW/2 * gridSize;
        sxx = n2.gridW/2 * gridSize;
    }

    let b1 = document.getElementById(n1.id);
    let b2 = document.getElementById(n2.id);
    // console.log(b1);
    // console.log(b2);
    fxx += Number((b1.style.left).slice(0, -2));
    fyy += Number((b1.style.top ).slice(0, -2));
    sxx += Number((b2.style.left).slice(0, -2));
    syy += Number((b2.style.top ).slice(0, -2));

    drawConnect(fxx, fyy, sxx, syy);
}

function mouseMove(event){
    let temp = ctxWindow.getBoundingClientRect();
    windowMouseX = event.pageX - temp.x;
    windowMouseY = event.pageY - temp.y;
    if(nodeDragingQ){
        pubInpot.xCell = getCellX(windowMouseX - nodeOriginX);
        pubInpot.yCell = getCellY(windowMouseY - nodeOriginY);
        checkUpdate();
    }
    else moveCamera(event);
}

function renderNode(inpot){
    let tomp = document.createElement("div");

    // tomp.contentEditable = true;
    tomp.classList.add("nodeBlock");
    tomp.id = inpot.id;
    let temp = offsetX/inpot.gridW;
    tomp.style.left   = (inpot.xCell * gridSize) + camX + (offsetX - (inpot.gridW * temp)/2) + "px";
    tomp.style.top    = (inpot.yCell * -gridSize) + camY + (offsetY - (inpot.gridH * temp)/2) + "px";
    tomp.style.width  =  inpot.gridW * temp + "px";
    tomp.style.height =  inpot.gridH * temp + "px";
    
    tomp.addEventListener("mousedown", function(){ startDrag(tomp, inpot);})
    document.addEventListener("mouseup", function(){ endDrag(tomp, inpot);})
    
    if(typeof inpot.children == "object")
        tomp.appendChild(inpot.children);
    nodeTainer.appendChild(tomp)
    updateNode(inpot);
}

function addAllNodeElements(){
    nodeTainer.innerHTML = "";
    let i = 0;
    for(let iter of nodes){
        iter.id = "nodeBlock"+i;
        renderNode(iter);
        i++;
    }
}

function updateNode(inpot){
    const elem = document.getElementById(inpot.id);

    elem.style.display = "flex";
    elem.style.left    = (inpot.xCell * gridSize) + camX + (offsetX - (inpot.gridW * gridSize)/2) + "px";
    elem.style.top     = (inpot.yCell * -gridSize) + camY + (offsetY - (inpot.gridH * gridSize)/2) + "px";

    elem.style.transform = "scale("+(inpot.gridW * gridSize)/(offsetX/inpot.gridW)/inpot.gridW+")";
}

function hideNode(inpot){
    const elem = document.getElementById(inpot.id);
    elem.style.display = "none";
}

function gridZoom(e){
    camX = clamp(camX,((xCellCount/-2) * gridSize), ((xCellCount/2) * gridSize));

    let tempX = Math.round(getCellX(windowMouseX)/.25)*.25;
    let tempY = Math.round(getCellY(windowMouseY)/.25)*.25;

    gridSize += clamp(e.wheelDelta, -5, 5);
    temp = Math.max(window_W/xCellCount, window_H/yCellCount/2);
    gridSize = clamp(gridSize, minZoom, maxZoom);

    camX  = (-gridSize * tempX + (windowMouseX - offsetX));
    camY  = (gridSize * tempY + (windowMouseY - offsetY));

    checkUpdate();
    drawGrid();
    connectNode(nodes[0], nodes[1]);
    connectNode(nodes[1], nodes[2]);
}

function moveCamera(event){
    if(camXorigin != undefined){
        camX = (camXorigin - event.pageX);
    }
    if(camYorigin != undefined){
        camY = (camYorigin - event.pageY);
    }
    checkUpdate();
}

function getCellX(targX, specialSize){
    if(specialSize == undefined)
        specialSize = gridSize;
    return (((targX - camX - offsetX)/specialSize));
}
function getCellY(targY, specialSize){
    if(specialSize == undefined)
        specialSize = gridSize;
    return (((targY - camY - offsetY)/-specialSize));
}



addAllNodeElements();
checkUpdate();

