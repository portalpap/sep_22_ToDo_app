let liText = "";
let liBtn = document.getElementById("addLiBtn");
let liInput = document.getElementById("liTextInput");
let tempObj = {};
let listObjs = {
    1: {
        name: "ExampleList",
        todos: 
        [
            { inner: "complete this task to win!", completed: false},
            { inner: "this is anouther task", completed: false}
        ]
    }
};

function openLiBtn(){
    liBtn.innerHTML = "Add " + liText + " +";
    liBtn.style.height = "2.5em";
    liBtn.style.transform = "translateY(0)";
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
    tempObj = {name: liName, todos: {inner: "This is a example task!", completed: false}};
    listObjs.push()
}

console.log(listObjs);

function load(){
    console.log(listObjs.length);
}

