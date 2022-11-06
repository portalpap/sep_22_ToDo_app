/*
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
*/

document.onmousedown = () =>{ 
    mouseDownQ = true;
    prevCamX = camX;
    prevCamY = camY;
    };
document.onclick = (e) => {
    if(prevCamX == camX && prevCamY == camY)
        if(!e.target.classList.contains('nodeItem')){
            if(!scopeLockedQ)
                clearFocus();
            scopeLockedQ = false;
            drawGrid();
            drawBlockAllies();
        }
}
document.onmouseup = () =>{
    mouseDownQ = false;
    camXorigin = undefined;
    camYorigin = undefined;
};
ctxTainer.onmousedown = (e) => { 
    camXorigin = e.pageX + camX;
    camYorigin = e.pageY + camY;
};

function toggleWindow(){
    toggle(ctxButton, "openQ");
    CWTainerOpenQ = toggle(ctxTainer, "openQ");
    listObjs[currentLi].NBW_open = CWTainerOpenQ;
}

window.onmousemove = mouseMove;
ctxWindow.onwheel  = gridZoom;

/*
class Nodec{ // Node Class
    constructor(label, x, y, children){
        this.label = label;
        this.xCell = x;
        this.yCell = y;
        this.id;
        this.gridW = 8;
        this.gridH = 6; 
        this.basicText = '';
        this.children = children;
        this.allies = [];
        this.strandColor = '#ff0000';
    }
    addAlly(inpot){
        this.allies.push(inpot);
    }
    changeBounds(nw, nh){
        this.gridW = nw;
        this.gridH = nh;
    }
}

selectedNodes.push(new Nodec("Default",0,-9));
selectedNodes.push(new Nodec("added", -20, 0));
selectedNodes.push(new Nodec("added", 0, 9));
selectedNodes.push(new Nodec("added", 20, 18));
selectedNodes.push(new Nodec("added", 20, 0));
selectedNodes.push(new Nodec("added", 20, -18));

selectedNodes[1].addAlly(selectedNodes[0]);
selectedNodes[1].addAlly(selectedNodes[2]);
selectedNodes[2].addAlly(selectedNodes[3])
selectedNodes[2].addAlly(selectedNodes[4])
selectedNodes[0].addAlly(selectedNodes[4])
selectedNodes[0].addAlly(selectedNodes[5])
*/

document.onmousemove = drawConnect;

function drawGrid(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = gridSize/80;

    let lineOffset = 0;
    ctx.strokeStyle = 'green';
    let temp = 0;
    let tempMod = window_W - (window_W % gridSize);

    for (let i = 0; i <= window_W/gridSize; i++) { //colums
        temp = 
        (((i * gridSize) + clamp(offsetX + camX, 0, window_W)) 
        % tempMod);

        ctx.moveTo(temp, window_H);
        ctx.lineTo(temp, 0);
    }

    tempMod = window_H - (window_H % gridSize);

    for (let i = 0; i <= window_H/gridSize; i++) { //rows
        temp = 
        ((((i) * gridSize) + clamp(offsetY + camY, 0, window_H)) 
        % tempMod);

        ctx.moveTo(window_W, temp );
        ctx.lineTo(0, temp );
    }
    ctx.stroke();

    ctx.lineWidth = gridSize/15;
    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.moveTo(camX + offsetX + lineOffset, 0);
    ctx.lineTo(camX + offsetX + lineOffset, window_H)
    ctx.stroke();

    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(0       , camY + offsetY + lineOffset);
    ctx.lineTo(window_W, camY + offsetY + lineOffset)
    ctx.stroke();

}

function drawConnect(fx,fy,sx,sy, lineColor){
    if(lineColor == undefined) lineColor = 'red';
    ctx.lineWidth = gridSize/6;
    if(pubQ){
       ctx.lineWidth = gridSize/2;
       lineColor = 'orange';
       if(curNS_Obj != nodeScopeObj && curNS_Obj != undefined)
        lineColor = 'yellow'
    }
    let temp = undefined;
    fy += gridSize/24;
    // sx = window.event.pageX   - canvas.getBoundingClientRect().x;
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
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(fx,fy);
        for(let i = 0; i < Math.abs(fx - sx); i+=Math.abs(fx - sx)/50)
        ctx.lineTo(i+fx, diffH/2*Math.cos(i/(diffW/Math.PI)) + (fy-diffH/2));
    ctx.lineTo(sx,sy);
    ctx.stroke();
}

function searchForAlly(){
    let fxx = nodeScopeObj.gridW * gridSize;
    let fyy = nodeScopeObj.gridH/2 * gridSize;
    let sxx = windowMouseX;
    let syy = windowMouseY;

    let temp = document.getElementById(nodeScopeObj.id);

    fxx += Number((temp.style.left).slice(0, -2));
    fyy += Number((temp.style.top).slice(0, -2));
    pubQ = true;
    for(let iter of ctxWindow.getElementsByClassName("yellow"))
        iter.classList.remove("yellow");
    if(curNS_Obj == nodeScopeObj || curNS_Obj == undefined){
        connectNode(nodeScopeObj, nodeScopeObj);

    }
    else if(scopeLockedQ){
        pubQ = "falsey";
        curNS_Elm.classList.add("yellow");
        nodeScopeElm.classList.add("yellow");
        connectNode(curNS_Obj, nodeScopeObj);
    }
    pubQ = false;
}

function checkUpdate(){
    camX = clamp(camX,((xCellCount/-2) * gridSize), ((xCellCount/2) * gridSize));

    for(let iter of selectedNodes){
        updateNode(iter);
    }
    
    drawGrid();
    drawBlockAllies();
}

function drawBlockAllies(){
    for(let iter of selectedNodes)
        for(let allies of iter.allies)
            connectNode(iter, allies);
}

function startDrag(that, inpot){
    nodeDragingQ = true;
    pubInpot     = inpot;
    pubElem = that;

    nodeOriginX  = (windowMouseX - (that.style.left).slice(0, -2));
    nodeOriginX -= (pubInpot.gridW/2 * gridSize);
    
    nodeOriginY  = (windowMouseY - (that.style.top).slice(0, -2));
    nodeOriginY -= (pubInpot.gridH/2 * gridSize);

    maxZ += 1;
    that.style.zIndex = maxZ;

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

    let bullTop = 50;
    let bullLeft = 0;

    sox = n2.xCell
    soy = n2.yCell
    now = n2.gridW;
    noh = n2.gridH;
    if(pubQ && pubQ != "falsey"){
        sox = getCellX(windowMouseX);
        soy = getCellY(windowMouseY);
        now = -3;
        noh = -3;
    }

    if(n1.xCell < sox){
        // console.log("1 right - 2 left");
        bullLeft = 100;
        fxx = n1.gridW * gridSize;
    }
    else{
        // console.log("1 left - 2 right");
        sxx = now * gridSize;
    }
    if(sox + (now/2) + 1 >= n1.xCell - (n1.gridW/2)
     && sox - (now/2) <= n1.xCell + (n1.gridW/2) + 1){
        if(soy + (noh/2) >= n1.yCell){
            bullTop = 0;
            syy = noh * gridSize
            fyy = 0;
        }
        else{
            bullTop = 100;
            syy = 0;
            fyy = n1.gridH * gridSize;
        }
        bullLeft = 50;
        fxx = n1.gridW/2 * gridSize;
        sxx = now/2 * gridSize;
    }

    let b1 = document.getElementById(n1.id);
    let b2 = document.getElementById(n2.id);

    let myBullet = b1.getElementsByClassName('nCir')[0]

    myBullet.style.left = bullLeft+'%';
    myBullet.style.top = bullTop+'%';

    // console.log(b1);
    // console.log(b2);
    fxx += Number((b1.style.left).slice(0, -2));
    fyy += Number((b1.style.top ).slice(0, -2));
    sxx += Number((b2.style.left).slice(0, -2));
    syy += Number((b2.style.top ).slice(0, -2));

    if(pubQ && pubQ != "falsey"){
        sxx = windowMouseX;
        syy = windowMouseY;
        if(bullTop == 0)
        if(syy > fyy + (n1.gridH * gridSize/2))
            fyy += (n1.gridH * gridSize);
    }
    if(pubQ == "falsey")
        pubQ = true;

    drawConnect(fxx, fyy, sxx, syy, n1.strandColor);
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

    updateStrandAnimation();
}

function updateStrandAnimation(){
    if(scopeLockedQ){
        if(curNS_Obj != nodeScopeObj && curNS_Obj != undefined && mouseDownQ && prevCamX == camX && !nodeDragingQ){
            scopeLockedQ = false;
            nodeScopeObj.addAlly(curNS_Obj);
            drawGrid();
            curNS_Elm.classList.add("highlighted");
            nodeScopeElm.classList.add("highlighted");
            for(let iter of ctxWindow.getElementsByClassName("yellow"))
                iter.classList.remove("yellow");
            drawBlockAllies();
        }
        searchForAlly();
    }
}

function renderNode(inpot){
    let tomp = document.createElement("div");

    let tomp2 = document.createElement('textarea');
    tomp2.classList.add('nodeGut');
    tomp2.oninput = () => inpot.basicText = tomp2.value;
    tomp.onmouseover = () =>{
        curNS_Obj = inpot;
        curNS_Elm = tomp;
    }
    tomp.onmouseleave = () => {
            curNS_Obj = undefined;
            curNS_Elm = undefined;
    }

    tomp.classList.add("nodeBlock");
    tomp.id = inpot.id;
    tomp.style.setProperty('--myBackColor'   , 'rgb(109, 115, 113)');
    tomp.style.setProperty('--myNodeColor'   , 'rgb(0, 0, 255)');
    tomp.style.setProperty('--myStrandColor' , 'rgb(255, 0, 0)');
    tomp.style.setProperty('--myTextColor' , 'rgb(255, 255, 255)');

    nodeTainer.onclick = () => {
        if(pubInpot.xCell == prevNx)
            pubElem.classList.add('highlighted')
    };
    let temp = offsetX/inpot.gridW;
    tomp.style.left   = (inpot.xCell * gridSize) + camX + (offsetX - (inpot.gridW * temp)/2) + "px";
    tomp.style.top    = (inpot.yCell * -gridSize) + camY + (offsetY - (inpot.gridH * temp)/2) + "px";
    tomp.style.width  =  inpot.gridW * temp + "px";
    tomp.style.height =  inpot.gridH * temp + "px";
    
    tomp.onclick = () => {
        if(pubInpot.xCell == prevNx && pubInpot.yCell == prevNy)
         clearFocus();
         mouseDownQ = true;
         updateStrandAnimation();
         mouseDownQ = false;
    };
    document.addEventListener("mouseup", () =>{ endDrag(tomp, inpot);})
    tomp.addEventListener("mousedown", () => {
        prevNx = inpot.xCell;
        prevNy = inpot.yCell;
        startDrag(tomp, inpot);
    });

    if(typeof inpot.children == "object")
        tomp.appendChild(inpot.children);
    tomp.appendChild(tomp2);

    let nodeConnectBullet = document.createElement('div');
    nodeConnectBullet.classList.add('nCir');
    nodeConnectBullet.style.width  = temp/2 + 'px';
    nodeConnectBullet.style.height = temp/2 + 'px';
    nodeConnectBullet.onclick = () => {
        pubElem.classList.add('highlighted')
        nodeScopeElm = curNS_Elm;
        nodeScopeObj = curNS_Obj;
        scopeLockedQ = true;
    }

    tomp.appendChild(nodeConnectBullet);

    tomp.appendChild(addNodeDial("color", 0, inpot));
    tomp.appendChild(addNodeDial("back", 1, inpot));
    tomp.appendChild(addNodeDial("strand", 2, inpot));
    tomp.appendChild(addNodeDial("textColor", 3, inpot));
    tomp.appendChild(addNodeDial("trash", 4, inpot));

    addClassesToAllChildren("nodeItem", tomp);

    tomp.style.outlineWidth = temp/5 + 'px';
    tomp.style.outlineOffset = temp/-10 + 'px';
    tomp.style.borderRadius = temp/2 + 'px';

    nodeTainer.appendChild(tomp)
    updateNode(inpot);
}

function addNodeDial(key, dialY, inpot){
    let temp, clone, temp3;

    let temp2 = document.createElement('div');
    temp2.classList.add('nodeOption')
    let dialSize = offsetX/inpot.gridW;
    console.log();
    temp2.style.width = (inpot.gridH * dialSize)/10 +'px';
    temp2.style.height = (inpot.gridH * dialSize)/10 +'px';
    temp2.value = dialY;


    temp2.style.transform = 
    "translate("+(dialSize)+"px, "+(dialSize) * dialY+"px)"

    switch (key) {
        case "color":
            temp = document.createElement('input');
            temp.type = "color";
            temp.setAttribute('colorpick-eyedropper-active', 'false');
            temp.value = "#0000ff";
            temp.oninput = () => pubElem.style.setProperty("--myNodeColor", temp.value);

            temp2.style.outlineColor = "var(--myBackColor)";
            temp2.style.backgroundColor = "var(--myNodeColor)"
            break;
        case "node":
            temp = document.getElementById('bezierSVG');
            clone = temp.cloneNode(true);
            clone.id = '';
            temp = clone;
            break;
        case "text":
            temp = document.getElementById('textSVG');
            clone = temp.cloneNode(true);
            clone.id = '';
            temp = clone;
            break;
        case "back":
            temp = document.createElement('input');
            temp.type = "color";
            temp.setAttribute('colorpick-eyedropper-active', 'false');
            temp.value = '#6D7371'
            temp.oninput = () => pubElem.style.setProperty("--myBackColor", temp.value);
            break;
        case "textColor":
            temp = document.createElement('input');
            temp.type = "color";
            temp.setAttribute('colorpick-eyedropper-active', 'false');
            temp.value = '#ffffff'
            temp.oninput = () => pubElem.style.setProperty('--myTextColor', temp.value);
            temp2.style.backgroundColor = "var(--myTextColor)"
            break;
        case "strand":
            temp = document.createElement('input');
            temp.type = "color";
            temp.setAttribute('colorpick-eyedropper-active', 'false');
            temp.value = '#ff0000'
            temp.oninput = () =>{ 
                inpot.strandColor = temp.value;
                pubElem.style.setProperty('--myStrandColor', temp.value);
                drawGrid();
                drawBlockAllies();
            };
            temp2.style.backgroundColor = "var(--myStrandColor)"
            break;
        case "trash":
            temp = document.getElementById('trashSVG');
            clone = temp.cloneNode(true);
            clone.id = '';
            temp = clone;
            temp.onclick = () => {
                if(confirm("Do You Want To Delete This Node?")){
                    selectedNodes[selectedNodes.indexOf(inpot)] = undefined;
                    selectedNodes = collapseArray(selectedNodes);
                    addAllNodeElements();
                }
            };
            break;
        default:
            return '';
    }
    temp2.appendChild(temp);

    return temp2;
}

function addClassesToAllChildren(inpct, nBlock){
    for(let iter of nBlock.children){
        iter.classList.add(inpct);
        addClassesToAllChildren(inpct,iter);
    }
}

function addAllNodeElements(){
    nodeTainer.innerHTML = "";
    let i = 0;
    for(let iter of selectedNodes){
        iter.id = "nodeBlock"+i;
        renderNode(iter);
        i++;
    }
}

function updateNode(inpot){
    const elem = document.getElementById(inpot.id);

    if(curKey == 16 && inpot == curNS_Obj){
        inpot.xCell = Math.round(inpot.xCell);
        inpot.yCell = Math.round(inpot.yCell);
    }

    // for(let iter of elem.getElementsByClassName('nodeOption')){
    // let dialSize = gridSize * 2
    // iter.style.width = dialSize +'px';
    // iter.style.height = dialSize +'px';
    // iter.style.transform = 
    // "translate("+(gridSize + dialSize)+"px, "+(gridSize + dialSize) * iter.value+"px)"
    // }

    elem.style.display = "flex";
    elem.style.left    = (inpot.xCell * gridSize) + camX + (offsetX - (inpot.gridW * gridSize)/2) + "px";
    elem.style.top     = (inpot.yCell * -gridSize) + camY + (offsetY - (inpot.gridH * gridSize)/2) + "px";


    elem.style.transform = "scale("+(inpot.gridW * gridSize)/(offsetX/inpot.gridW)/inpot.gridW+")";
}

let curKey = 0;

document.onkeydown = () => {
    curKey = window.event.keyCode;
}
document.onkeyup   = () => {
    curKey = 0;
}

function hideNode(inpot){
    const elem = document.getElementById(inpot.id);
    elem.style.display = "none";
}

function gridZoom(e){
        camX = clamp(camX,((xCellCount/-2) * gridSize), ((xCellCount/2) * gridSize));

        let tempX = Math.round(getCellX(windowMouseX)/.25)*.25;
        let tempY = Math.round(getCellY(windowMouseY)/.25)*.25;

        gridSize += clamp(e.wheelDelta, -1, 1);
        temp = Math.max(window_W/xCellCount, window_H/yCellCount/2);
        gridSize = clamp(gridSize, minZoom, maxZoom);

        camX  = (-gridSize * tempX + (windowMouseX - offsetX));
        camY  = (gridSize * tempY + (windowMouseY - offsetY));

        checkUpdate();
        updateStrandAnimation();
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

function clearFocus(){
    for(let iter of document.getElementsByClassName('nodeBlock'))iter.classList.remove('highlighted');
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

function scaleCtxWindow(){
    window_W = ctxWindow.getBoundingClientRect().width;
    window_H = ctxWindow.getBoundingClientRect().height;
    offsetX = window_W/2;
    offsetY = window_H/2;
    canvas.width = window_W;
    canvas.height = window_H;
    addAllNodeElements();
    checkUpdate();
}

addAllNodeElements();
scaleCtxWindow();
checkUpdate();
// console.log(selectedNodes);