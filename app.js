//var ipc = require('electron').ipcRenderer;

var welcomeScreen = document.getElementById("welcomeScreen")
var installScreen = document.getElementById("installScreen")
var mainScreen = document.getElementById("mainScreen")
var installButton = document.getElementById("installButton")
var createBucket = document.getElementById("createBucket")
var destroyBucket = document.getElementById("destroyBucket")
var createField = document.getElementById("createField")
var destroyField = document.getElementById("destroyField")
var addButton = document.getElementById("addButton")
var removeButton = document.getElementById("removeButton")

// installButton.addEventListener("click", INSTALLFUNCTION);
//
// destroyBucket.addEventListener("click", DESTROYBUCKET);
// addButton.addEventListener("click", ADDFILE);
// removeButton.addEventListener("click", REMOVEFILE);


createBucket.addEventListener('click', function(){
    ipc.once('actionReply', function(response){
      console.log("what is this")
      console.log(response)
    })

    var name = createField.value;

    console.log(name);

    ipc.send('invokeAction', name);
});





////
// Mouseenter and Mouseleave activate and remove the information dialog
////

createBucket.addEventListener("mouseenter", function() {   
	this.style.color = "purple";
});
createBucket.addEventListener("mouseleave", function() {
	this.style.color = "black";
});

destroyBucket.addEventListener("mouseenter", function() {
        this.style.color = "purple";
});
destroyBucket.addEventListener("mouseleave", function() {
        this.style.color = "black";
});

//addButton.addEventListener("mouseenter", function() {
//        this.style.color = "purple";
//});
//addButton.addEventListener("mouseleave", function() {
//        this.style.color = "black";
//});
//
//removeBucket.addEventListener("mouseenter", function() {
//        this.style.color = "purple";
//});
//removeBucket.addEventListener("mouseleave", function() {
//        this.style.color = "black";
//});
