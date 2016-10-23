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

installButton.addEventListener("click", INSTALLFUNCTION);
createButton.addEventListener("click", CREATEBUCKET);
destroyButton.addEventListener("click", DESTROYBUCKET);
addButton.addEventListener("click", ADDFILE);
removeButton.addEventListener("click", REMOVEFILE);

