var welcomeScreen = document.getElementByID("welcomeScreen")
var installScreen = document.getElementByID("installScreen")
var mainScreen = document.getElementByID("mainScreen")
var installButton = document.getElementByID("installButton")
var createButton = document.getElementByID("createButton")
var destroyButton = document.getElementByID("destroyButton")
var createField = document.getElementByID("createField")
var destroyField = document.getElementByID("destroyField")

installButton.addEventListener("click", INSTALLFUNCTION);
createButton.addEventListener("click", CREATEBUCKET);
destroyButton.addEventListener("click", DESTROYBUCKET);

//  Display filename test
  const holder = document.getElementById('holder')
  holder.ondragover = () => {
    return false;
  }
  holder.ondragleave = holder.ondragend = () => {
    return false;
  }
  holder.ondrop = (e) => {
    e.preventDefault()
    for (let f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
    return false;
  }
