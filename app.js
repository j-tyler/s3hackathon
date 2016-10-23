var ipc = require('electron').ipcRenderer;

var welcomeScreen = document.getElementById("welcomeScreen")
var installScreen = document.getElementById("installScreen")
var mainScreen = document.getElementById("mainScreen")
var installButton = document.getElementById("installButton")
var createButton = document.getElementById("createButton")
var destroyButton = document.getElementById("destroyButton")
var createField = document.getElementById("createField")
var destroyField = document.getElementById("destroyField")
var addButton = document.getElementById("addButton")
var removeButton = document.getElementById("removeButton")

var createBucket = document.getElementById("createBucket");

installButton.addEventListener("click", INSTALLFUNCTION);
createButton.addEventListener("click", CREATEBUCKET);
destroyButton.addEventListener("click", DESTROYBUCKET);
addButton.addEventListener("click", ADDFILE);
removeButton.addEventListener("click", REMOVEFILE);


createBucket.addEventListener('click', function(){
    ipc.once('actionReply', function(response){
      console.log("what is this")
      console.log(response)
    })

    var name = createField.value;

    console.log(name);

    ipc.send('invokeAction', name);
});
